import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2 } from 'lucide-react';

const PROGRAMS = [
    { value: 'ice-cream', label: 'Ice Cream', modes: ['scoop', 'soft-serve', 'both'] },
    { value: 'lite-ice-cream', label: 'Lite Ice Cream', modes: ['scoop', 'soft-serve', 'both'] },
    { value: 'gelato', label: 'Gelato', modes: ['scoop'] },
    { value: 'sorbet', label: 'Sorbet', modes: ['scoop'] },
    { value: 'frozen-yogurt', label: 'Frozen Yogurt', modes: ['scoop', 'soft-serve', 'both'] },
    { value: 'frozen-custard', label: 'Frozen Custard', modes: ['scoop', 'soft-serve', 'both'] },
    { value: 'fruit-whip', label: 'Fruit Whip', modes: ['scoop', 'soft-serve', 'both'] },
    { value: 'creamifit', label: 'CreamiFit', modes: ['scoop', 'soft-serve', 'both'] },
    { value: 'milkshake', label: 'Milkshake', modes: ['soft-serve'] },
];

export default function AddRecipeModal({ onClose, onSave }) {
    const [formData, setFormData] = useState({
        title: '',
        base_flavor: '',
        scoop_mode: 'both',
        program: 'ice-cream',
        calories: '',
        protein: '',
        image: '',
        ingredients: [''],
        instructions: ['']
    });
    const [imagePreview, setImagePreview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Prevent background scrolling
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const dataUrl = reader.result;
            setImagePreview(dataUrl);
            setFormData(prev => ({ ...prev, image: dataUrl }));
        };
        reader.readAsDataURL(file);
    };

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...formData.ingredients];
        newIngredients[index] = value;
        setFormData(prev => ({ ...prev, ingredients: newIngredients }));
    };

    const addIngredient = () => {
        setFormData(prev => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
    };

    const removeIngredient = (index) => {
        if (formData.ingredients.length === 1) return;
        const newIngredients = formData.ingredients.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, ingredients: newIngredients }));
    };

    const handleInstructionChange = (index, value) => {
        const newInstructions = [...formData.instructions];
        newInstructions[index] = value;
        setFormData(prev => ({ ...prev, instructions: newInstructions }));
    };

    const addInstruction = () => {
        setFormData(prev => ({ ...prev, instructions: [...prev.instructions, ''] }));
    };

    const removeInstruction = (index) => {
        if (formData.instructions.length === 1) return;
        const newInstructions = formData.instructions.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, instructions: newInstructions }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.title.trim()) {
            alert('Please enter a recipe title');
            return;
        }

        const validIngredients = formData.ingredients.filter(i => i.trim());
        const validInstructions = formData.instructions.filter(i => i.trim());

        if (validIngredients.length === 0) {
            alert('Please add at least one ingredient');
            return;
        }

        if (validInstructions.length === 0) {
            alert('Please add at least one instruction');
            return;
        }

        setIsSubmitting(true);

        try {
            const recipeData = {
                ...formData,
                ingredients: validIngredients,
                instructions: validInstructions,
                calories: formData.calories ? parseInt(formData.calories) : null,
            };

            await onSave(recipeData);
            onClose();
        } catch (error) {
            console.error('Failed to save recipe:', error);
            alert('Failed to save recipe. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Get available modes for selected program
    const selectedProgram = PROGRAMS.find(p => p.value === formData.program);
    const availableModes = selectedProgram?.modes || ['both'];

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Backdrop */}
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose} />

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                {/* Modal */}
                <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    <div className="relative">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white p-2 rounded-full text-gray-500 hover:text-gray-800 transition-colors backdrop-blur-sm"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="p-6 sm:p-8">
                            <h2 className="font-heading text-3xl font-bold text-gray-800 mb-6">Add New Recipe</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Image</label>
                                    <div className="flex items-center gap-4">
                                        {imagePreview && (
                                            <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                                        )}
                                        <label className="flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-pink-600 font-medium text-sm py-2 px-4 rounded-full cursor-pointer transition-colors border border-pink-200">
                                            <Upload className="w-4 h-4" />
                                            <span>Upload Image</span>
                                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                        </label>
                                    </div>
                                </div>

                                {/* Basic Info Grid */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Base Flavor</label>
                                        <input
                                            type="text"
                                            name="base_flavor"
                                            value={formData.base_flavor}
                                            onChange={handleChange}
                                            placeholder="e.g., Chocolate, Vanilla"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Program *</label>
                                        <select
                                            name="program"
                                            value={formData.program}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        >
                                            {PROGRAMS.map(prog => (
                                                <option key={prog.value} value={prog.value}>{prog.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Mode *</label>
                                        <select
                                            name="scoop_mode"
                                            value={formData.scoop_mode}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        >
                                            {availableModes.includes('scoop') && <option value="scoop">Scoop</option>}
                                            {availableModes.includes('soft-serve') && <option value="soft-serve">Soft Serve</option>}
                                            {availableModes.includes('both') && <option value="both">Both</option>}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Calories</label>
                                        <input
                                            type="number"
                                            name="calories"
                                            value={formData.calories}
                                            onChange={handleChange}
                                            placeholder="e.g., 200"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Protein</label>
                                        <input
                                            type="text"
                                            name="protein"
                                            value={formData.protein}
                                            onChange={handleChange}
                                            placeholder="e.g., 5g"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        />
                                    </div>
                                </div>

                                {/* Ingredients */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients *</label>
                                    <div className="space-y-2">
                                        {formData.ingredients.map((ingredient, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={ingredient}
                                                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                                                    placeholder={`Ingredient ${index + 1}`}
                                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeIngredient(index)}
                                                    disabled={formData.ingredients.length === 1}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addIngredient}
                                        className="mt-2 flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium text-sm"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Ingredient
                                    </button>
                                </div>

                                {/* Instructions */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Instructions *</label>
                                    <div className="space-y-2">
                                        {formData.instructions.map((instruction, index) => (
                                            <div key={index} className="flex gap-2">
                                                <span className="flex-shrink-0 w-8 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg font-bold">
                                                    {index + 1}
                                                </span>
                                                <textarea
                                                    value={instruction}
                                                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                                                    placeholder={`Step ${index + 1}`}
                                                    rows="2"
                                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeInstruction(index)}
                                                    disabled={formData.instructions.length === 1}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addInstruction}
                                        className="mt-2 flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium text-sm"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Step
                                    </button>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 justify-end pt-4 border-t">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Saving...' : 'Save Recipe'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
