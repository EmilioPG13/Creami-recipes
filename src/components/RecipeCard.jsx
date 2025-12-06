import React from 'react';
import { ArrowRight, Flame, Dumbbell } from 'lucide-react';

export default function RecipeCard({ recipe, onClick }) {
    // Map program types to colors
    const programColors = {
        'ice-cream': 'bg-creami-blue-100 text-creami-blue-500 border-creami-blue-200',
        'gelato': 'bg-creami-yellow-100 text-yellow-600 border-creami-yellow-200',
        'sorbet': 'bg-creami-pink-100 text-creami-pink-500 border-creami-pink-200',
        'frozen-yogurt': 'bg-creami-mint-100 text-creami-mint-500 border-creami-mint-200',
        'lite-ice-cream': 'bg-green-100 text-green-600 border-green-200',
        'creamifit': 'bg-emerald-100 text-emerald-600 border-emerald-200',
        'frozen-custard': 'bg-amber-100 text-amber-600 border-amber-200',
        'fruit-whip': 'bg-purple-100 text-purple-600 border-purple-200',
    };

    const tagColor = programColors[recipe.program] || 'bg-gray-100 text-gray-600 border-gray-200';

    return (
        <div
            onClick={onClick}
            className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-xl 
                       transition-all duration-500 cursor-pointer border border-gray-100/80
                       transform hover:-translate-y-2"
        >
            {/* Image Container */}
            <div className="relative h-52 overflow-hidden">
                <img
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    src={recipe.image}
                    alt={recipe.title}
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Calories badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 
                                rounded-full text-xs font-bold text-gray-700 shadow-sm
                                flex items-center gap-1.5 border border-white/50">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    {recipe.calories} cal
                </div>

                {/* Quick action hint on hover */}
                <div className="absolute inset-0 flex items-center justify-center 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 font-bold 
                                   px-5 py-2.5 rounded-full text-sm shadow-lg
                                   transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Recipe
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-heading text-xl font-bold text-gray-800 leading-tight 
                              group-hover:text-pink-500 transition-colors duration-300 mb-3">
                    {recipe.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize border ${tagColor}`}>
                        {recipe.program?.replace(/-/g, ' ')}
                    </span>
                    {recipe.mode && (
                        <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full font-medium capitalize border border-gray-200">
                            {recipe.mode}
                        </span>
                    )}
                </div>

                {/* Footer with nutrition and arrow */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Dumbbell className="w-4 h-4 text-creami-mint-500" />
                        <span className="font-bold text-gray-700">{recipe.protein}</span>
                        <span>protein</span>
                    </div>
                    <span className="text-pink-400 font-bold group-hover:text-pink-500 
                                   group-hover:translate-x-1 transition-all duration-300 
                                   flex items-center gap-1">
                        <ArrowRight className="w-5 h-5" />
                    </span>
                </div>
            </div>
        </div>
    );
}

