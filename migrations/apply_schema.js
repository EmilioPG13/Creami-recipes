import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get connection string from environment
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('ERROR: DATABASE_URL environment variable is not set!');
    process.exit(1);
}

const client = new pg.Client({ connectionString });

async function applySchema() {
    try {
        await client.connect();
        console.log('✅ Connected to database');

        const schemaPath = path.join(__dirname, '001_initial_schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

        console.log('📜 Applying schema...');
        await client.query(schemaSql);

        console.log('🎉 Schema applied successfully!');
    } catch (error) {
        console.error('❌ Failed to apply schema:');
        console.error(JSON.stringify(error, null, 2));
        // Also print message if available
        if (error.message) console.error(error.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

applySchema();
