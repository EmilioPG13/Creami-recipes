import React from 'react';
import RecipeCard from './RecipeCard';

export default function CategoryView({
    recipes,
    title,
    subtitle,
    subNavItems,
    currentSubView,
    setSubView,
    onRecipeClick
}) {
    const filteredRecipes = recipes.filter(r => r.program === currentSubView);

    return (
        <div className="fade-in">
            <div className="text-center mb-10">
                <h2 className="font-heading text-3xl font-bold text-creami-dark mb-2">{title}</h2>
                <p className="text-gray-500">{subtitle}</p>
            </div>

            {/* Sub Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {subNavItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setSubView(item.id)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${currentSubView === item.id
                                ? `bg-${item.color}-100 text-${item.color}-600 ring-2 ring-${item.color}-400`
                                : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Recipe Grid */}
            {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRecipes.map(recipe => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onClick={() => onRecipeClick(recipe)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 text-lg">No recipes found for this program yet!</p>
                    <button className="mt-4 text-pink-500 font-bold hover:underline">Add your first one?</button>
                </div>
            )}
        </div>
    );
}
