import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import CategoryView from './components/CategoryView';
import ShoppingList from './components/ShoppingList';
import RecipeModal from './components/RecipeModal';

function App() {
    const [recipes, setRecipes] = useState([]);
    const [currentView, setCurrentView] = useState('home');
    const [currentSubView, setCurrentSubView] = useState('all');
    const [shoppingList, setShoppingList] = useState(() => {
        const saved = localStorage.getItem('creami_shopping_list');
        return saved ? JSON.parse(saved) : [];
    });
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        fetch('/recipes.json')
            .then(res => res.json())
            .then(data => setRecipes(data.recipes))
            .catch(err => console.error('Error loading recipes:', err));
    }, []);

    useEffect(() => {
        localStorage.setItem('creami_shopping_list', JSON.stringify(shoppingList));
    }, [shoppingList]);

    const navigate = (view) => {
        setCurrentView(view);
        if (view === 'scoop') setCurrentSubView('ice-cream');
        else if (view === 'soft-serve') setCurrentSubView('frozen-yogurt');
        else setCurrentSubView('all');
        window.scrollTo(0, 0);
    };

    const addToShoppingList = (recipe) => {
        const newItems = recipe.ingredients.map(ing => ({
            text: ing,
            checked: false,
            recipe: recipe.title
        }));
        setShoppingList(prev => [...prev, ...newItems]);
        toast.success(`Added ingredients for ${recipe.title} to your list!`, {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    };

    const toggleShoppingItem = (index) => {
        const newList = [...shoppingList];
        newList[index].checked = !newList[index].checked;
        setShoppingList(newList);
    };

    const clearShoppingList = () => {
        toast((t) => (
            <div className="flex flex-col gap-2">
                <span className="font-medium">Clear your shopping list?</span>
                <div className="flex gap-2 mt-1">
                    <button
                        onClick={() => {
                            setShoppingList([]);
                            toast.dismiss(t.id);
                            toast.success('List cleared!');
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-bold hover:bg-red-600 transition-colors"
                    >
                        Yes, Clear
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm font-bold hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: 5000,
            style: {
                borderRadius: '12px',
                background: '#fff',
                color: '#333',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
        });
    };

    const updateRecipeImage = (id, dataUrl) => {
        setRecipes(prev =>
            prev.map(r => (r.id === id ? { ...r, image: dataUrl } : r))
        );
    };

    const renderView = () => {
        switch (currentView) {
            case 'home':
                return <Home recipes={recipes} navigate={navigate} onRecipeClick={setSelectedRecipe} />;
            case 'scoop':
                return (
                    <CategoryView
                        recipes={recipes}
                        title="Scoop Mode"
                        subtitle="Dense, scoopable perfection."
                        subNavItems={[
                            { id: 'ice-cream', label: 'Ice Cream', color: 'blue' },
                            { id: 'lite-ice-cream', label: 'Lite Ice Cream', color: 'green' },
                            { id: 'gelato', label: 'Gelato', color: 'yellow' },
                            { id: 'sorbet', label: 'Sorbet', color: 'pink' }
                        ]}
                        currentSubView={currentSubView}
                        setSubView={setCurrentSubView}
                        onRecipeClick={setSelectedRecipe}
                    />
                );
            case 'soft-serve':
                return (
                    <CategoryView
                        recipes={recipes}
                        title="Soft Serve"
                        subtitle="Silky smooth and ready to swirl."
                        subNavItems={[
                            { id: 'frozen-yogurt', label: 'Frozen Yogurt', color: 'pink' },
                            { id: 'creamifit', label: 'CreamiFit', color: 'green' },
                            { id: 'frozen-custard', label: 'Frozen Custard', color: 'yellow' },
                            { id: 'fruit-whip', label: 'Fruit Whip', color: 'purple' },
                        ]}
                        currentSubView={currentSubView}
                        setSubView={setCurrentSubView}
                        onRecipeClick={setSelectedRecipe}
                    />
                );
            case 'shopping':
                return (
                    <ShoppingList
                        items={shoppingList}
                        onToggle={toggleShoppingItem}
                        onClear={clearShoppingList}
                        navigate={navigate}
                    />
                );
            default:
                return <Home recipes={recipes} navigate={navigate} onRecipeClick={setSelectedRecipe} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-creami-gray text-creami-dark font-sans antialiased">
            <Toaster position="bottom-center" reverseOrder={false} />
            <Header currentView={currentView} navigate={navigate} />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {renderView()}
            </main>

            <Footer />

            {selectedRecipe && (
                <RecipeModal
                    recipe={selectedRecipe}
                    onClose={() => setSelectedRecipe(null)}
                    onAddToShoppingList={addToShoppingList}
                    onUpdateImage={updateRecipeImage}
                />
            )}
        </div>
    );
}

export default App;
