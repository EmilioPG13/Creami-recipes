import React, { useState } from 'react';
import { Menu, X, Plus } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Header({ currentView, navigate, onAddRecipeClick, onSearchResult }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'home', label: 'Home', color: 'hover:text-pink-500' },
        { id: 'scoop', label: 'Scoop Mode', color: 'hover:text-blue-400' },
        { id: 'soft-serve', label: 'Soft Serve', color: 'hover:text-purple-400' },
        { id: 'shopping', label: 'Shopping List', color: 'hover:text-yellow-500' },
    ];

    const handleNav = (view) => {
        navigate(view);
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 gap-4">
                    {/* Logo */}
                    <div
                        className="flex-shrink-0 flex items-center cursor-pointer"
                        onClick={() => handleNav('home')}
                    >
                        <span className="font-heading text-2xl font-bold text-creami-dark">
                            🍦 Roland<span className="text-pink-400">Cooks</span>
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNav(item.id)}
                                className={`text-gray-600 ${item.color} px-3 py-2 rounded-md text-sm font-medium transition-colors font-heading ${currentView === item.id ? 'text-gray-900 font-bold' : ''}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Search Bar (Desktop) */}
                    <div className="hidden lg:block flex-1 max-w-md">
                        <SearchBar onResultClick={onSearchResult} />
                    </div>

                    {/* Add Recipe Button (Desktop) */}
                    <button
                        onClick={onAddRecipeClick}
                        className="hidden md:flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-full transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Recipe</span>
                    </button>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none p-2"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search (below header on mobile) */}
                <div className="lg:hidden pb-3">
                    <SearchBar onResultClick={onSearchResult} />
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNav(item.id)}
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 ${item.color} font-heading`}
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={() => {
                                onAddRecipeClick();
                                setIsMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-full transition-colors mt-2"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Add Recipe</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
