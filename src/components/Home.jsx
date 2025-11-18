import React from 'react';
import RecipeCard from './RecipeCard';

export default function Home({ recipes, navigate, onRecipeClick }) {
    const latestRecipes = recipes.slice(0, 3);

    return (
        <div className="text-center py-12 fade-in">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-creami-dark mb-4">
                Welcome to the <span className="text-pink-400">Swirl Station</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Your personal collection of delicious Ninja Creami recipes.
                Choose a mode to get started!
            </p>

            <div className="flex justify-center gap-4 mb-12">
                <button
                    onClick={() => navigate('scoop')}
                    className="bg-white border-2 border-blue-200 hover:border-blue-400 text-blue-500 font-heading font-bold py-3 px-8 rounded-full shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
                >
                    🥄 Scoop Mode
                </button>
                <button
                    onClick={() => navigate('soft-serve')}
                    className="bg-white border-2 border-purple-200 hover:border-purple-400 text-purple-500 font-heading font-bold py-3 px-8 rounded-full shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
                >
                    🍦 Soft Serve
                </button>
            </div>

            <div className="mt-16 text-left">
                <h2 className="font-heading text-2xl font-bold text-gray-700 mb-6 border-b pb-2">Latest Creations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestRecipes.map(recipe => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onClick={() => onRecipeClick(recipe)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
