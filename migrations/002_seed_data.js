import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get connection string from environment or use placeholder
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('ERROR: DATABASE_URL environment variable is not set!');
    console.error('Please set it to your Neon connection string:');
    console.error('Example: set DATABASE_URL=postgresql://user:password@host/dbname');
    process.exit(1);
}

const client = new pg.Client({ connectionString });

async function migrate() {
    try {
        await client.connect();
        console.log('✅ Connected to database');

        // Check if data already exists
        const countResult = await client.query('SELECT COUNT(*) FROM recipes');
        const count = parseInt(countResult.rows[0].count);

        if (count > 0) {
            console.log(`⚠️ Database already has ${count} recipes. Skipping seed.`);
            return;
        }

        // Read recipes.json
        const recipesPath = path.join(__dirname, '../public/recipes.json');
        const data = JSON.parse(fs.readFileSync(recipesPath, 'utf-8'));

        console.log(`📦 Found ${data.recipes.length} recipes to migrate`);

        for (const recipe of data.recipes) {
            // Map old fields to new schema
            const scoop_mode = recipe.mode || 'both';
            const program = recipe.program;

            // Insert recipe
            const recipeResult = await client.query(
                `INSERT INTO recipes (title, base_flavor, scoop_mode, program, calories, protein, image, ingredients_text)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                 RETURNING id`,
                [
                    recipe.title,
                    recipe.base_flavor || null,
                    scoop_mode,
                    program,
                    recipe.calories || null,
                    recipe.protein || null,
                    recipe.image || null,
                    recipe.ingredients.join(' ')
                ]
            );

            const recipeId = recipeResult.rows[0].id;
            console.log(`  ✓ ${recipe.title} (ID: ${recipeId})`);

            // Insert ingredients
            for (let i = 0; i < recipe.ingredients.length; i++) {
                await client.query(
                    `INSERT INTO ingredients (recipe_id, ingredient_text, order_index)
                     VALUES ($1, $2, $3)`,
                    [recipeId, recipe.ingredients[i], i]
                );
            }

            // Insert instructions
            for (let i = 0; i < recipe.instructions.length; i++) {
                await client.query(
                    `INSERT INTO instructions (recipe_id, instruction_text, step_number)
                     VALUES ($1, $2, $3)`,
                    [recipeId, recipe.instructions[i], i + 1]
                );
            }
        }

        console.log('\n🎉 Migration completed successfully!');
        console.log(`Total recipes migrated: ${data.recipes.length}`);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await client.end();
    }
}

migrate();
