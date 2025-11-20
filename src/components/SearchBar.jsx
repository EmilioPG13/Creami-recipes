import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { searchRecipes } from '../utils/api';

export default function SearchBar({ onResultClick }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounced search
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setShowResults(false);
            return;
        }

        setIsSearching(true);
        const timer = setTimeout(async () => {
            try {
                const data = await searchRecipes(query);
                setResults(data);
                setShowResults(true);
            } catch (error) {
                console.error('Search failed:', error);
                setResults([]);
            } finally {
                setIsSearching(false);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [query]);

    const handleResultClick = (recipe) => {
        setQuery('');
        setShowResults(false);
        if (onResultClick) {
            onResultClick(recipe);
        }
    };

    const clearSearch = () => {
        setQuery('');
        setResults([]);
        setShowResults(false);
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-md">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search recipes or ingredients..."
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                />
                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Results Dropdown */}
            {showResults && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
                    {isSearching ? (
                        <div className="p-4 text-center text-gray-500">Searching...</div>
                    ) : results.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">No recipes found</div>
                    ) : (
                        <ul className="divide-y divide-gray-100">
                            {results.map((recipe) => (
                                <li key={recipe.id}>
                                    <button
                                        onClick={() => handleResultClick(recipe)}
                                        className="w-full p-3 hover:bg-gray-50 transition-colors text-left flex items-center gap-3"
                                    >
                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            className="w-12 h-12 object-cover rounded-lg"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate">
                                                {recipe.title}
                                            </p>
                                            <p className="text-sm text-gray-500 capitalize">
                                                {recipe.program.replace(/-/g, ' ')}
                                            </p>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
