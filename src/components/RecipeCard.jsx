import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function RecipeCard({ recipe, onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100"
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    src={recipe.image}
                    alt={recipe.title}
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-600 shadow-sm">
                    {recipe.calories} cal
                </div>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-heading text-xl font-bold text-gray-800 leading-tight group-hover:text-pink-500 transition-colors">
                        {recipe.title}
                    </h3>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-3">
                    <span className="flex items-center">
                        <span className="font-bold text-gray-700 mr-1">{recipe.protein}</span> Protein
                    </span>
                    <span className="text-pink-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        View Recipe <ArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </div>
    );
}
