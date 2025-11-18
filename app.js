const app = {
    data: {
        recipes: [],
        currentView: 'home',
        currentSubView: 'all', // For sub-tabs
        shoppingList: JSON.parse(localStorage.getItem('creami_shopping_list')) || []
    },

    init: async () => {
        await app.fetchRecipes();
        app.setupEventListeners();
        app.navigate('home');
    },

    fetchRecipes: async () => {
        try {
            const response = await fetch('recipes.json');
            const data = await response.json();
            app.data.recipes = data.recipes;
        } catch (error) {
            console.error('Error loading recipes:', error);
            document.getElementById('main-content').innerHTML = '<p class="text-center text-red-500">Error loading recipes. Please try again.</p>';
        }
    },

    setupEventListeners: () => {
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') app.closeModal();
        });

        // Global click delegation for navigation and actions
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-action]');
            if (!target) return;

            const action = target.dataset.action;

            if (action === 'nav-home') app.navigate('home');
            if (action === 'nav-scoop') app.navigate('scoop');
            if (action === 'nav-soft-serve') app.navigate('soft-serve');
            if (action === 'nav-shopping') app.navigate('shopping');
        });
    },

    navigate: (view) => {
        app.data.currentView = view;
        // Reset subview default based on main view
        if (view === 'scoop') app.data.currentSubView = 'ice-cream';
        else if (view === 'soft-serve') app.data.currentSubView = 'frozen-yogurt'; // Default for soft serve
        else app.data.currentSubView = 'all';

        app.render();
        window.scrollTo(0, 0);
    },

    setSubView: (subView) => {
        app.data.currentSubView = subView;
        app.render();
    },

    render: () => {
        const main = document.getElementById('main-content');
        main.innerHTML = ''; // Clear content

        switch (app.data.currentView) {
            case 'home':
                app.renderHome(main);
                break;
            case 'scoop':
                app.renderScoopMode(main);
                break;
            case 'soft-serve':
                app.renderSoftServeMode(main);
                break;
            case 'shopping':
                app.renderShoppingList(main);
                break;
            default:
                app.renderHome(main);
        }
    },

    renderHome: (container) => {
        const template = document.getElementById('template-home');
        const clone = template.content.cloneNode(true);

        const grid = clone.getElementById('home-recipe-grid');
        // Show latest 3 recipes
        app.data.recipes.slice(0, 3).forEach(recipe => {
            grid.appendChild(app.createRecipeCard(recipe));
        });

        container.appendChild(clone);
    },

    renderScoopMode: (container) => {
        const subNavItems = [
            { id: 'ice-cream', label: 'Ice Cream', color: 'blue' },
            { id: 'lite-ice-cream', label: 'Lite Ice Cream', color: 'green' },
            { id: 'gelato', label: 'Gelato', color: 'yellow' },
            { id: 'sorbet', label: 'Sorbet', color: 'pink' }
        ];

        app.renderModeLayout(container, 'Scoop Mode', 'Dense, scoopable perfection.', subNavItems);
    },

    renderSoftServeMode: (container) => {
        const subNavItems = [
            { id: 'frozen-yogurt', label: 'Frozen Yogurt', color: 'pink' },
            { id: 'creamifit', label: 'CreamiFit', color: 'green' },
            { id: 'frozen-custard', label: 'Frozen Custard', color: 'yellow' },
        ];

        app.renderModeLayout(container, 'Soft Serve', 'Silky smooth and ready to swirl.', subNavItems);
    },

    renderModeLayout: (container, title, subtitle, subNavItems) => {
        const template = document.getElementById('template-mode-layout');
        const clone = template.content.cloneNode(true);

        clone.getElementById('mode-title').textContent = title;
        clone.getElementById('mode-subtitle').textContent = subtitle;

        // Render Sub Nav
        const subNavContainer = clone.getElementById('sub-nav-container');
        subNavItems.forEach(item => {
            const btn = document.createElement('button');
            btn.textContent = item.label;
            btn.className = `px-4 py-2 rounded-full text-sm font-bold transition-all ${app.data.currentSubView === item.id
                    ? `bg-${item.color}-100 text-${item.color}-600 ring-2 ring-${item.color}-400`
                    : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                }`;
            btn.onclick = () => app.setSubView(item.id);
            subNavContainer.appendChild(btn);
        });

        // Render Recipes
        const filteredRecipes = app.data.recipes.filter(r => r.program === app.data.currentSubView);
        const grid = clone.getElementById('mode-recipe-grid');
        const emptyState = clone.getElementById('mode-empty-state');

        if (filteredRecipes.length > 0) {
            filteredRecipes.forEach(recipe => {
                grid.appendChild(app.createRecipeCard(recipe));
            });
        } else {
            grid.classList.add('hidden');
            emptyState.classList.remove('hidden');
        }

        container.appendChild(clone);
    },

    createRecipeCard: (recipe) => {
        const template = document.getElementById('template-recipe-card');
        const clone = template.content.cloneNode(true);
        const card = clone.querySelector('.recipe-card');

        // Populate data
        card.onclick = () => app.openModal(recipe.id);

        const img = card.querySelector('.card-image');
        img.src = recipe.image;
        img.alt = recipe.title;

        card.querySelector('.card-calories').textContent = recipe.calories;
        card.querySelector('.card-title').textContent = recipe.title;
        card.querySelector('.card-protein').textContent = recipe.protein;

        // Tags
        const tagsContainer = card.querySelector('.card-tags');
        recipe.tags.slice(0, 2).forEach(tag => {
            const span = document.createElement('span');
            span.className = 'bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium';
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });

        return card; // Return the element, not the fragment, for appending
    },

    openModal: (recipeId) => {
        const recipe = app.data.recipes.find(r => r.id === recipeId);
        if (!recipe) return;

        const modalContent = document.getElementById('modal-content');
        modalContent.innerHTML = ''; // Clear previous content

        const template = document.getElementById('template-modal-content');
        const clone = template.content.cloneNode(true);

        // Bind Close Button
        clone.getElementById('modal-close-btn').onclick = app.closeModal;

        // Hero Section
        clone.getElementById('modal-image').src = recipe.image;
        clone.getElementById('modal-image').alt = recipe.title;
        clone.getElementById('modal-title').textContent = recipe.title;
        clone.getElementById('modal-calories').textContent = `${recipe.calories} Calories`;
        clone.getElementById('modal-protein').textContent = `${recipe.protein} Protein`;

        // Ingredients
        const ingList = clone.getElementById('modal-ingredients');
        recipe.ingredients.forEach(ing => {
            const li = document.createElement('li');
            li.className = 'flex items-start text-gray-600';
            li.innerHTML = `<span class="text-pink-400 mr-2 mt-1">•</span><span>${ing}</span>`;
            ingList.appendChild(li);
        });

        // Add to Shopping List Button
        clone.getElementById('modal-add-shopping').onclick = () => app.addToShoppingList(recipe.id);

        // Instructions
        const instList = clone.getElementById('modal-instructions');
        recipe.instructions.forEach((step, index) => {
            const li = document.createElement('li');
            li.className = 'flex gap-3';
            li.innerHTML = `
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-500 font-bold text-sm flex items-center justify-center mt-0.5">${index + 1}</span>
                <span class="text-gray-600 leading-relaxed">${step}</span>
            `;
            instList.appendChild(li);
        });

        // Badges
        clone.getElementById('modal-mode-badge').textContent = `${recipe.mode} Mode`;
        clone.getElementById('modal-program-badge').textContent = recipe.program.replace(/-/g, ' ');

        modalContent.appendChild(clone);

        document.getElementById('recipe-modal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    },

    closeModal: () => {
        document.getElementById('recipe-modal').classList.add('hidden');
        document.body.style.overflow = '';
    },

    addToShoppingList: (recipeId) => {
        const recipe = app.data.recipes.find(r => r.id === recipeId);
        if (!recipe) return;

        const newItems = recipe.ingredients.map(ing => ({
            text: ing,
            checked: false,
            recipe: recipe.title
        }));

        app.data.shoppingList = [...app.data.shoppingList, ...newItems];
        localStorage.setItem('creami_shopping_list', JSON.stringify(app.data.shoppingList));

        alert(`Added ingredients for ${recipe.title} to your list!`);
    },

    toggleShoppingItem: (index) => {
        app.data.shoppingList[index].checked = !app.data.shoppingList[index].checked;
        localStorage.setItem('creami_shopping_list', JSON.stringify(app.data.shoppingList));
        app.render();
    },

    clearShoppingList: () => {
        if (confirm('Are you sure you want to clear your shopping list?')) {
            app.data.shoppingList = [];
            localStorage.setItem('creami_shopping_list', JSON.stringify([]));
            app.render();
        }
    },

    renderShoppingList: (container) => {
        const template = document.getElementById('template-shopping-list');
        const clone = template.content.cloneNode(true);

        const emptyState = clone.getElementById('shopping-list-empty');
        const contentState = clone.getElementById('shopping-list-content');
        const list = clone.getElementById('shopping-list-items');
        const clearBtn = clone.getElementById('clear-list-btn');

        if (app.data.shoppingList.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            contentState.classList.remove('hidden');

            app.data.shoppingList.forEach((item, index) => {
                const li = document.createElement('li');
                li.className = 'flex items-start group';
                li.innerHTML = `
                    <input type="checkbox" 
                        class="mt-1.5 w-5 h-5 text-pink-500 rounded border-gray-300 focus:ring-pink-400 cursor-pointer"
                        ${item.checked ? 'checked' : ''}
                    >
                    <div class="ml-3 flex-grow">
                        <span class="text-lg ${item.checked ? 'line-through text-gray-300' : 'text-gray-700'} transition-colors">${item.text}</span>
                        <p class="text-xs text-gray-400 mt-0.5">From: ${item.recipe}</p>
                    </div>
                `;

                // Add event listener to checkbox
                const checkbox = li.querySelector('input');
                checkbox.onchange = () => app.toggleShoppingItem(index);

                list.appendChild(li);
            });

            clearBtn.onclick = app.clearShoppingList;
        }

        container.appendChild(clone);
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', app.init);
