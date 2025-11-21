-- Recipes table
CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    base_flavor TEXT,
    scoop_mode TEXT NOT NULL CHECK (scoop_mode IN ('scoop', 'soft-serve', 'both')),
    program TEXT NOT NULL CHECK (program IN (
        'frozen-custard',
        'fruit-whip', 
        'frozen-yogurt',
        'ice-cream',
        'creamifit',
        'lite-ice-cream',
        'milkshake',
        'sorbet',
        'gelato'
    )),
    calories INTEGER,
    protein TEXT,
    image TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Ingredients table (separate for better search and normalization)
CREATE TABLE IF NOT EXISTS ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_text TEXT NOT NULL,
    order_index INTEGER NOT NULL
);

-- Instructions table
CREATE TABLE IF NOT EXISTS instructions (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    instruction_text TEXT NOT NULL,
    step_number INTEGER NOT NULL
);

-- Full-text search setup
-- Check if column exists before adding (idempotent approach for columns is harder in pure SQL without PL/pgSQL, 
-- but for this setup script we'll assume if table exists, columns exist or we ignore errors. 
-- A better way for columns is DO block)

DO $$ 
BEGIN 
    BEGIN
        ALTER TABLE recipes ADD COLUMN ingredients_text TEXT;
    EXCEPTION
        WHEN duplicate_column THEN NULL;
    END;
    
    BEGIN
        ALTER TABLE recipes ADD COLUMN search_vector tsvector
            GENERATED ALWAYS AS (
                to_tsvector('english', 
                    COALESCE(title, '') || ' ' || 
                    COALESCE(base_flavor, '') || ' ' || 
                    COALESCE(ingredients_text, '')
                )
            ) STORED;
    EXCEPTION
        WHEN duplicate_column THEN NULL;
    END;
END $$;

-- Index for full-text search
CREATE INDEX IF NOT EXISTS recipes_search_idx ON recipes USING GIN (search_vector);

-- Create a view for easy querying (includes ingredients and instructions as JSON arrays)
CREATE OR REPLACE VIEW recipes_full AS
SELECT 
    r.id,
    r.title,
    r.base_flavor,
    r.scoop_mode AS mode,
    r.program,
    r.calories,
    r.protein,
    r.image,
    r.created_at,
    (
        SELECT COALESCE(json_agg(i.ingredient_text ORDER BY i.order_index), '[]'::json)
        FROM ingredients i
        WHERE i.recipe_id = r.id
    ) AS ingredients,
    (
        SELECT COALESCE(json_agg(inst.instruction_text ORDER BY inst.step_number), '[]'::json)
        FROM instructions inst
        WHERE inst.recipe_id = r.id
    ) AS instructions
FROM recipes r;

-- Create web_anon role for PostgREST
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'web_anon') THEN
    CREATE ROLE web_anon NOLOGIN;
  END IF;
END
$$;

GRANT USAGE ON SCHEMA public TO web_anon;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO web_anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO web_anon;

-- Allow the authenticator role (current user) to switch to web_anon
GRANT web_anon TO CURRENT_USER;
