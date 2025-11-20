# Creami Recipes - Setup Guide

## 🚀 Quick Start

This guide will help you set up the complete stack: Neon PostgreSQL database, PostgREST API, and the React frontend.

---

## Step 1: Create Neon Database

1. **Sign Up/Log In** to [Neon](https://neon.tech)
2. **Create New Project**:
   - Click "+ New Project"
   - Project name: `creami-recipes`
   - Choose your region (closest to you)
   - Postgres version: 16 (recommended)
3. **Get Connection String**:
   - After creation, go to "Connection Details"
   - Copy the connection string (looks like):
     ```
     postgresql://user:password@ep-xxxxx.region.aws.neon.tech/dbname?sslmode=require
     ```
   - **Save this** - you'll need it in the next steps

---

## Step 2: Run Database Migration

### Option A: Use Neon SQL Editor (Easiest)

1. In your Neon dashboard, click "SQL Editor"
2. Open `migrations/001_initial_schema.sql` from this project
3. Copy and paste the entire SQL content
4. Click "Run" to execute

### Option B: Use psql Command Line

```bash
psql "YOUR_NEON_CONNECTION_STRING" < migrations/001_initial_schema.sql
```

---

## Step 3: Install PostgREST

### Windows (Recommended Method)

1. Download from [PostgREST Releases](https://github.com/PostgREST/postgrest/releases/latest)
2. Look for `postgrest-vX.X.X-windows-x64.zip`
3. Extract to `C:\postgrest\` (or your preferred location)
4. Add to PATH:
   - Search "Environment Variables" in Windows
   - Edit "Path" variable
   - Add: `C:\postgrest`
   - Click OK

### Alternative: Using Chocolatey

```bash
choco install postgrest
```

### Verify Installation

```bash
postgrest --help
```

---

## Step 4: Configure PostgREST

1. Open `postgrest.conf` in the project root
2. Replace the `db-uri` with your Neon connection string:

```conf
db-uri = "YOUR_NEON_CONNECTION_STRING_HERE"
db-schemas = "public"
db-anon-role = "web_anon"
server-host = "127.0.0.1"
server-port = 3001
```

---

## Step 5: Seed the Database

This will import your existing recipes from `public/recipes.json` into PostgreSQL.

1. **Set Environment Variable**:

**Windows (PowerShell):**
```powershell
$env:DATABASE_URL="YOUR_NEON_CONNECTION_STRING"
```

**Windows (Command Prompt):**
```cmd
set DATABASE_URL=YOUR_NEON_CONNECTION_STRING
```

2. **Run Migration**:
```bash
npm run migrate
```

You should see output like:
```
✅ Connected to database
📦 Found X recipes to migrate
  ✓ Recipe Name (ID: 1)
  ✓ Another Recipe (ID: 2)
...
🎉 Migration completed successfully!
```

---

## Step 6: Run the Application

### Development Mode (Run Both Servers)

```bash
npm run dev:all
```

This will start:
- Vite dev server on `http://localhost:5173`
- PostgREST API on `http://localhost:3001`

### Individual Commands

If you prefer to run them separately:

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
npm run postgrest
```

---

## 🧪 Testing the Setup

1. **Open the app**: Go to `http://localhost:5173`
2. **Verify recipes load**: You should see all your existing recipes
3. **Test search**: Type "chocolate" in the search bar
4. **Add a recipe**:
   - Click "Add Recipe" button
   - Fill in the form
   - Submit
5. **Verify persistence**: Refresh the page, the new recipe should still be there

---

## 📝 Available Scripts

- `npm run dev` - Start Vite dev server only
- `npm run postgrest` - Start PostgREST server only
- `npm run dev:all` - Start both servers (recommended)
- `npm run migrate` - Seed database with existing recipes
- `npm run build` - Build for production

---

## 🔧 Troubleshooting

### "postgrest: command not found"
- PostgREST is not in your PATH
- Try running with full path: `C:\postgrest\postgrest.exe postgrest.conf`

### "Connection refused" errors
- Make sure PostgREST is running
- Check that `postgrest.conf` has the correct connection string

### No recipes loading
- Check browser console for errors
- Verify PostgREST is running on port 3001
- Test API directly: `http://localhost:3001/recipes_full`

### Migration fails
- Make sure `DATABASE_URL` environment variable is set
- Verify the connection string is correct
- Check that the schema migration (Step 2) was run successfully

---

## 🚀 Production Deployment

For production, you'll need to:
1. Build the React app: `npm run build`
2. Deploy `dist/` folder to a static host (Vercel, Netlify, etc.)
3. Deploy PostgREST to a server or use a hosted instance
4. Update Vite proxy configuration for production API URL

---

## 📖 Architecture Overview

```
┌─────────────────┐
│   React App     │  (Vite dev server: localhost:5173)
│   (Frontend)    │
└────────┬────────┘
         │
         │ /api/* requests
         ▼
┌─────────────────┐
│   PostgREST     │  (API server: localhost:3001)
│   (REST API)    │
└────────┬────────┘
         │
         │ SQL queries
         ▼
┌─────────────────┐
│      Neon       │  (PostgreSQL database)
│   (Database)    │
└─────────────────┘
```

---

## ✅ You're All Set!

Your Creami Recipes app is now running with a full PostgreSQL backend. You can:
- ✅ Add new recipes
- ✅ Search by ingredients
- ✅ Share recipes across devices
- ✅ Everything persists in the cloud
