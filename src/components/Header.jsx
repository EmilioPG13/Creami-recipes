import React, { useState, useEffect } from 'react';
import { Menu, X, Plus, Sparkles } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Header({ currentView, navigate, onAddRecipeClick, onSearchResult }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Track scroll for header shadow effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'home', label: 'Home', color: 'hover:text-pink-500', activeColor: 'text-pink-500' },
        { id: 'scoop', label: 'Scoop Mode', color: 'hover:text-blue-400', activeColor: 'text-blue-500' },
        { id: 'soft-serve', label: 'Soft Serve', color: 'hover:text-purple-400', activeColor: 'text-purple-500' },
        { id: 'shopping', label: 'Shopping List', color: 'hover:text-yellow-500', activeColor: 'text-yellow-600' },
    ];

    const handleNav = (view) => {
        navigate(view);
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300
                       ${isScrolled
                    ? 'bg-white/95 backdrop-blur-lg shadow-lg gradient-border'
                    : 'bg-transparent'}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 gap-4">
                    {/* Logo */}
                    <div
                        className="flex-shrink-0 flex items-center cursor-pointer group"
                        onClick={() => handleNav('home')}
                    >
                        <span className="font-heading text-2xl font-bold text-creami-dark flex items-center gap-2">
                            <span className="text-3xl group-hover:animate-bounce-once">🍦</span>
                            Roland<span className="bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">Cooks</span>
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNav(item.id)}
                                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 font-heading
                                           ${currentView === item.id
                                        ? `${item.activeColor} bg-gray-100 font-bold`
                                        : `text-gray-600 ${item.color} hover:bg-gray-50`}`}
                            >
                                {item.label}
                                {currentView === item.id && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-current rounded-full" />
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Search Bar (Desktop) */}
                    <div className="hidden lg:block flex-1 max-w-xs">
                        <SearchBar onResultClick={onSearchResult} />
                    </div>

                    {/* Add Recipe Button (Desktop) */}
                    <button
                        onClick={onAddRecipeClick}
                        className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-pink-400 to-pink-500 
                                   hover:from-pink-500 hover:to-pink-600 text-white font-medium text-sm px-3.5 py-1.5 
                                   rounded-full transition-all duration-300 shadow-sm hover:shadow-md
                                   transform hover:-translate-y-0.5 group"
                    >
                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                        <span>Add Recipe</span>
                    </button>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none p-2 rounded-full hover:bg-gray-100 transition-colors"
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
            <div
                className={`md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 overflow-hidden transition-all duration-300
                           ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-4 pt-2 pb-4 space-y-1">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNav(item.id)}
                            className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all
                                       ${currentView === item.id
                                    ? `${item.activeColor} bg-gray-100 font-bold`
                                    : `text-gray-700 hover:bg-gray-50 ${item.color}`} font-heading`}
                        >
                            {item.label}
                        </button>
                    ))}
                    <button
                        onClick={() => {
                            onAddRecipeClick();
                            setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-400 to-pink-500 
                                   hover:from-pink-500 hover:to-pink-600 text-white font-bold px-4 py-3 
                                   rounded-xl transition-all mt-3 shadow-md"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Recipe</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

