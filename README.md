# Roland's Creami Recipes 🍦

A beautiful React app for managing and browsing Ninja Creami frozen treat recipes.

## Features

- 📖 Browse recipes by category (Scoop Mode, Soft Serve)
- 🔍 Search recipes by title or ingredients
- ➕ Add new recipes with images
- ✏️ Edit existing recipes
- 🛒 Shopping list with local storage persistence
- 📱 Responsive design for mobile and desktop

## Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Neon)
- **API**: PostgREST

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database (recommend [Neon](https://neon.tech))
- PostgREST executable

### Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your database connection string
   ```

3. **Setup database:**
   ```bash
   npm run db:setup
   ```

4. **Download PostgREST:**
   Download from [github.com/PostgREST/postgrest](https://github.com/PostgREST/postgrest/releases) and place `postgrest.exe` in the project root.

5. **Start development:**
   ```bash
   npm run dev:all
   ```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run dev:all` | Start Vite + PostgREST together |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run db:setup` | Apply schema and seed data |

## Project Structure

```
src/
├── components/       # React components
│   ├── Header.jsx
│   ├── RecipeModal.jsx
│   ├── EditRecipeModal.jsx
│   └── ...
├── utils/
│   └── api.js       # PostgREST API functions
├── App.jsx          # Main app component
└── main.jsx         # Entry point
```

## License

MIT
