-- Recipes table
CREATE TABLE recipes (
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
CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_text TEXT NOT NULL,
    order_index INTEGER NOT NULL
);

-- Instructions table
CREATE TABLE instructions (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    instruction_text TEXT NOT NULL,
    step_number INTEGER NOT NULL
);

-- Full-text search setup
ALTER TABLE recipes ADD COLUMN ingredients_text TEXT;
ALTER TABLE recipes ADD COLUMN search_vector tsvector
    GENERATED ALWAYS AS (
        to_tsvector('english', 
            COALESCE(title, '') || ' ' || 
            COALESCE(base_flavor, '') || ' ' || 
            COALESCE(ingredients_text, '')
        )
    ) STORED;

-- Index for full-text search
CREATE INDEX recipes_search_idx ON recipes USING GIN (search_vector);

-- Create a view for easy querying (includes ingredients and instructions as JSON arrays)
CREATE VIEW recipes_full AS
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
    COALESCE(
        json_agg(DISTINCT i.ingredient_text ORDER BY i.order_index) FILTER (WHERE i.ingredient_text IS NOT NULL),
        '[]'::json
    ) AS ingredients,
    COALESCE(
        json_agg(DISTINCT inst.instruction_text ORDER BY inst.step_number) FILTER (WHERE inst.instruction_text IS NOT NULL),
        '[]'::json
    ) AS instructions
FROM recipes r
LEFT JOIN ingredients i ON r.id = i.recipe_id
LEFT JOIN instructions inst ON r.id = inst.recipe_id
GROUP BY r.id;

-- Create web_anon role for PostgREST
CREATE ROLE web_anon NOLOGIN;
GRANT USAGE ON SCHEMA public TO web_anon;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO web_anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO web_anon;
