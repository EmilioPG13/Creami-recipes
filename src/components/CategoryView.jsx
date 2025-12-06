import React from 'react';
import { IceCream, Plus } from 'lucide-react';
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

    // Map colors to Tailwind classes
    const colorClasses = {
        blue: {
            active: 'bg-creami-blue-200 text-creami-blue-500 ring-2 ring-creami-blue-400 shadow-sm',
            inactive: 'bg-white text-gray-500 hover:bg-creami-blue-50 border border-gray-200 hover:border-creami-blue-200',
        },
        green: {
            active: 'bg-creami-mint-200 text-emerald-600 ring-2 ring-creami-mint-400 shadow-sm',
            inactive: 'bg-white text-gray-500 hover:bg-creami-mint-50 border border-gray-200 hover:border-creami-mint-200',
        },
        yellow: {
            active: 'bg-creami-yellow-200 text-yellow-600 ring-2 ring-creami-yellow-400 shadow-sm',
            inactive: 'bg-white text-gray-500 hover:bg-creami-yellow-50 border border-gray-200 hover:border-creami-yellow-200',
        },
        pink: {
            active: 'bg-creami-pink-200 text-creami-pink-500 ring-2 ring-creami-pink-400 shadow-sm',
            inactive: 'bg-white text-gray-500 hover:bg-creami-pink-50 border border-gray-200 hover:border-creami-pink-200',
        },
        purple: {
            active: 'bg-purple-200 text-purple-600 ring-2 ring-purple-400 shadow-sm',
            inactive: 'bg-white text-gray-500 hover:bg-purple-50 border border-gray-200 hover:border-purple-200',
        },
    };

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="text-center mb-10">
                <h2 className="font-heading text-4xl font-bold text-creami-dark mb-3">
                    {title}
                </h2>
                <p className="text-gray-500 text-lg">{subtitle}</p>
            </div>

            {/* Sub Navigation Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {subNavItems.map(item => {
                    const isActive = currentSubView === item.id;
                    const colors = colorClasses[item.color] || colorClasses.blue;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setSubView(item.id)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105
                                       ${isActive ? colors.active : colors.inactive}`}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </div>

            {/* Recipe Grid */}
            {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredRecipes.map((recipe, index) => (
                        <div
                            key={recipe.id}
                            className="animate-slide-up"
                            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                        >
                            <RecipeCard
                                recipe={recipe}
                                onClick={() => onRecipeClick(recipe)}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-gradient-to-br from-creami-gray to-white rounded-3xl border-2 border-dashed border-gray-200">
                    <IceCream className="w-16 h-16 text-creami-pink-300 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg mb-2">No recipes found for this program yet!</p>
                    <button className="mt-4 inline-flex items-center gap-2 text-pink-500 font-bold hover:text-pink-600 transition-colors group">
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                        Add your first one
                    </button>
                </div>
            )}
        </div>
    );
}

