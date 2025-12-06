// API utility functions for communicating with PostgREST

const API_BASE = '/api';

/**
 * Fetch all recipes or search by query
 * @param {string} searchQuery - Optional search term for full-text search
 * @returns {Promise<Array>} Array of recipes
 */
export async function fetchRecipes(searchQuery = null) {
    try {
        let url = `${API_BASE}/recipes_full`;

        if (searchQuery && searchQuery.trim()) {
            // Case-insensitive search using PostgREST ilike operator
            url += `?or=(title.ilike.*${encodeURIComponent(searchQuery)}*,ingredients_text.ilike.*${encodeURIComponent(searchQuery)}*)`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch recipes: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
}

/**
 * Add a new recipe to the database
 * @param {Object} recipeData - Recipe data object
 * @returns {Promise<Object>} Created recipe
 */
export async function addRecipe(recipeData) {
    try {
        const {
            title,
            base_flavor,
            scoop_mode,
            program,
            calories,
            protein,
            image,
            ingredients,
            instructions
        } = recipeData;

        // 1. Insert recipe
        const recipeResponse = await fetch(`${API_BASE}/recipes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                title,
                base_flavor,
                scoop_mode,
                program,
                calories,
                protein,
                image,
                ingredients_text: ingredients.join(' ')
            })
        });

        if (!recipeResponse.ok) {
            throw new Error(`Failed to create recipe: ${recipeResponse.statusText}`);
        }

        const recipe = await recipeResponse.json();
        const recipeId = recipe[0].id;

        // 2. Insert ingredients
        if (ingredients && ingredients.length > 0) {
            const ingredientsData = ingredients.map((text, index) => ({
                recipe_id: recipeId,
                ingredient_text: text,
                order_index: index
            }));

            await fetch(`${API_BASE}/ingredients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ingredientsData)
            });
        }

        // 3. Insert instructions
        if (instructions && instructions.length > 0) {
            const instructionsData = instructions.map((text, index) => ({
                recipe_id: recipeId,
                instruction_text: text,
                step_number: index + 1
            }));

            await fetch(`${API_BASE}/instructions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(instructionsData)
            });
        }


        // Return the created recipe with full details
        return {
            ...recipe[0],
            ingredients,
            instructions
        };
    } catch (error) {
        console.error('Failed to add recipe:', error);
        throw error;
    }
}

/**
 * Search recipes using full-text search
 * @param {string} query - Search term
 * @returns {Promise<Array>} Matching recipes
 */
export async function searchRecipes(query) {
    return fetchRecipes(query);
}

/**
 * Delete a recipe by ID
 * @param {number} id - Recipe ID to delete
 * @returns {Promise<void>}
 */
export async function deleteRecipe(id) {
    try {
        const response = await fetch(`/api/recipes?id=eq.${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete recipe');
        }

        return;
    } catch (error) {
        console.error('Failed to delete recipe:', error);
        throw error;
    }
}

/**
 * Update an existing recipe
 * @param {number} id - Recipe ID to update
 * @param {Object} recipeData - Updated recipe data
 * @returns {Promise<Object>} Updated recipe
 */
export async function updateRecipe(id, recipeData) {
    try {
        const {
            title,
            base_flavor,
            scoop_mode,
            program,
            calories,
            protein,
            image,
            ingredients,
            instructions
        } = recipeData;

        // 1. Update the main recipe
        const recipeResponse = await fetch(`${API_BASE}/recipes?id=eq.${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                title,
                base_flavor,
                scoop_mode,
                program,
                calories,
                protein,
                image,
                ingredients_text: ingredients ? ingredients.join(' ') : undefined
            })
        });

        if (!recipeResponse.ok) {
            throw new Error(`Failed to update recipe: ${recipeResponse.statusText}`);
        }

        // 2. If ingredients provided, delete old and insert new
        if (ingredients && ingredients.length > 0) {
            // Delete existing ingredients
            await fetch(`${API_BASE}/ingredients?recipe_id=eq.${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            // Insert new ingredients
            const ingredientsData = ingredients.map((text, index) => ({
                recipe_id: id,
                ingredient_text: text,
                order_index: index
            }));

            await fetch(`${API_BASE}/ingredients`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ingredientsData)
            });
        }

        // 3. If instructions provided, delete old and insert new
        if (instructions && instructions.length > 0) {
            // Delete existing instructions
            await fetch(`${API_BASE}/instructions?recipe_id=eq.${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            // Insert new instructions
            const instructionsData = instructions.map((text, index) => ({
                recipe_id: id,
                instruction_text: text,
                step_number: index + 1
            }));

            await fetch(`${API_BASE}/instructions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(instructionsData)
            });
        }

        // Return the updated recipe
        const recipe = await recipeResponse.json();
        return {
            ...recipe[0],
            ingredients: ingredients || [],
            instructions: instructions || []
        };
    } catch (error) {
        console.error('Failed to update recipe:', error);
        throw error;
    }
}
