import React from 'react';
import { Trash2 } from 'lucide-react';

export default function ShoppingList({ items, onToggle, onClear, navigate }) {
    return (
        <div className="max-w-2xl mx-auto fade-in">
            <div className="text-center mb-8">
                <h2 className="font-heading text-3xl font-bold text-creami-dark mb-2">Shopping List</h2>
                <p className="text-gray-500">Get everything you need for your next spin.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 sm:p-8">
                    {items.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                            <p>Your list is empty!</p>
                            <button
                                onClick={() => navigate('home')}
                                className="mt-2 text-pink-500 font-bold hover:underline"
                            >
                                Browse recipes
                            </button>
                        </div>
                    ) : (
                        <>
                            <ul className="space-y-3">
                                {items.map((item, index) => (
                                    <li key={index} className="flex items-start group">
                                        <input
                                            type="checkbox"
                                            className="mt-1.5 w-5 h-5 text-pink-500 rounded border-gray-300 focus:ring-pink-400 cursor-pointer"
                                            checked={item.checked}
                                            onChange={() => onToggle(index)}
                                        />
                                        <div className="ml-3 flex-grow">
                                            <span className={`text-lg transition-colors ${item.checked ? 'line-through text-gray-300' : 'text-gray-700'}`}>
                                                {item.text}
                                            </span>
                                            <p className="text-xs text-gray-400 mt-0.5">From: {item.recipe}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={onClear}
                                    className="text-red-400 hover:text-red-600 text-sm font-bold px-4 py-2 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Clear List
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
