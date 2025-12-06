-- ==============================================
-- STEP 1: Create Tables
-- ==============================================

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
    ingredients_text TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Ingredients table
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

-- ==============================================
-- STEP 2: Create View
-- ==============================================

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
    r.ingredients_text,
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

-- ==============================================
-- STEP 3: Enable RLS with Public Access Policies
-- ==============================================

ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructions ENABLE ROW LEVEL SECURITY;

-- Recipes policies
CREATE POLICY "Public read recipes" ON recipes FOR SELECT USING (true);
CREATE POLICY "Public insert recipes" ON recipes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update recipes" ON recipes FOR UPDATE USING (true);
CREATE POLICY "Public delete recipes" ON recipes FOR DELETE USING (true);

-- Ingredients policies
CREATE POLICY "Public read ingredients" ON ingredients FOR SELECT USING (true);
CREATE POLICY "Public insert ingredients" ON ingredients FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update ingredients" ON ingredients FOR UPDATE USING (true);
CREATE POLICY "Public delete ingredients" ON ingredients FOR DELETE USING (true);

-- Instructions policies
CREATE POLICY "Public read instructions" ON instructions FOR SELECT USING (true);
CREATE POLICY "Public insert instructions" ON instructions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update instructions" ON instructions FOR UPDATE USING (true);
CREATE POLICY "Public delete instructions" ON instructions FOR DELETE USING (true);
