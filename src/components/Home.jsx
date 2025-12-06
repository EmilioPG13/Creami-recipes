import React from 'react';
import { Sparkles, IceCream, Cherry } from 'lucide-react';
import RecipeCard from './RecipeCard';

export default function Home({ recipes, navigate, onRecipeClick }) {
    const latestRecipes = recipes.slice(0, 6);

    return (
        <div className="animate-fade-in">
            {/* Hero Section - Full Viewport Width */}
            <section
                className="relative text-center py-20 md:py-32 overflow-hidden min-h-[80vh] flex items-center justify-center -mt-8"
                style={{
                    width: '100vw',
                    marginLeft: 'calc(-50vw + 50%)',
                    paddingTop: '4rem',
                }}
            >
                {/* Full-width animated background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-br from-creami-pink/20 via-creami-blue/10 to-creami-mint/20">
                    {/* Larger gradient orbs for full-width effect */}
                    <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-creami-pink/40 rounded-full blur-3xl animate-pulse-soft" />
                    <div className="absolute -bottom-32 -right-20 w-[600px] h-[600px] bg-creami-blue/40 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-creami-mint/25 rounded-full blur-3xl" />
                    <div className="absolute top-20 right-[20%] w-[300px] h-[300px] bg-creami-yellow/30 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />

                    {/* Floating icons - spread across full width */}
                    <div className="float-container hidden md:block">
                        <IceCream className="absolute top-[15%] right-[10%] w-16 h-16 text-creami-pink-400 opacity-30" />
                        <Cherry className="absolute bottom-[20%] left-[8%] w-14 h-14 text-pink-300 opacity-30" />
                        <Sparkles className="absolute top-[25%] left-[15%] w-10 h-10 text-creami-yellow-400 opacity-40" />
                        <IceCream className="absolute bottom-[30%] right-[20%] w-12 h-12 text-creami-blue-400 opacity-25" />
                        <Sparkles className="absolute top-[40%] right-[5%] w-8 h-8 text-creami-mint-400 opacity-35" />
                    </div>
                </div>


                {/* Hero content */}
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-creami-pink-200 rounded-full px-4 py-2 mb-6 shadow-sm">
                        <Sparkles className="w-4 h-4 text-creami-pink-500" />
                        <span className="text-sm font-medium text-creami-dark">Ninja Creami NC701 Recipes</span>
                    </div>

                    <h1 className="font-heading text-5xl md:text-7xl font-bold text-creami-dark mb-6 text-shadow-soft">
                        Welcome to the{' '}
                        <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Swirl Station
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Your personal collection of delicious frozen treats.
                        From creamy gelatos to refreshing sorbets — find your next favorite recipe.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                        <button
                            onClick={() => navigate('scoop')}
                            className="group relative bg-gradient-to-r from-creami-blue-300 to-creami-blue-400 hover:from-creami-blue-400 hover:to-creami-blue-500 text-white font-heading font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                🥄 Scoop Mode
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                        <button
                            onClick={() => navigate('soft-serve')}
                            className="group relative bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-heading font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                🍦 Soft Serve
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                    </div>

                    <p className="text-sm text-gray-400">
                        {recipes.length} recipes and counting...
                    </p>
                </div>
            </section>

            {/* Latest Creations Section */}
            <section className="mt-8 md:mt-16">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="font-heading text-2xl md:text-3xl font-bold text-creami-dark">
                            Latest Creations
                        </h2>
                        <p className="text-gray-500 mt-1">Fresh recipes from our kitchen</p>
                    </div>
                    <button
                        onClick={() => navigate('scoop')}
                        className="hidden sm:flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium transition-colors group"
                    >
                        View all
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {latestRecipes.map((recipe, index) => (
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

                {latestRecipes.length === 0 && (
                    <div className="text-center py-16 bg-gradient-to-br from-creami-gray to-white rounded-3xl border-2 border-dashed border-gray-200">
                        <IceCream className="w-16 h-16 text-creami-pink-300 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No recipes yet!</p>
                        <p className="text-gray-400">Add your first creation to get started.</p>
                    </div>
                )}
            </section>
        </div>
    );
}

