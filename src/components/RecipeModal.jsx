import React, { useEffect, useState } from 'react';
import { X, ShoppingCart, ClipboardList, Settings, Camera, Trash2 } from 'lucide-react';
import ConfirmDeleteModal from './ConfirmDeleteModal';

export default function RecipeModal({
    recipe,
    onClose,
    onAddToShoppingList,
    onUpdateImage,
    onDelete,
}) {
    const [preview, setPreview] = useState(recipe?.image || '');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const dataUrl = reader.result;
            setPreview(dataUrl);
            if (onUpdateImage) onUpdateImage(recipe.id, dataUrl);
        };
        reader.readAsDataURL(file);
    };

    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleDelete = () => {
        setShowDeleteConfirm(false);
        if (onDelete) {
            onDelete(recipe.id);
        }
        onClose();
    };

    if (!recipe) return null;

    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}
                />
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>
                {/* Modal */}
                <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                    <div className="relative">
                        {/* Close Button */}
                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="bg-red-500/80 hover:bg-red-600 p-2 rounded-full text-white transition-all hover:scale-110 backdrop-blur-sm shadow-lg"
                                title="Delete Recipe"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-white/80 hover:bg-white p-2 rounded-full text-gray-500 hover:text-gray-800 transition-colors backdrop-blur-sm"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 sm:p-8">
                            {/* Hero Image */}
                            <div className="h-64 sm:h-80 w-full relative">
                                <img
                                    src={preview || recipe.image}
                                    alt={recipe.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 sm:p-8">
                                    <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-2">
                                        {recipe.title}
                                    </h2>
                                    <div className="flex gap-3 text-white/90 text-sm font-medium">
                                        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                                            {recipe.calories} Calories
                                        </span>
                                        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                                            {recipe.protein} Protein
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Image Upload */}
                            <div className="mt-4 text-center">
                                <label className="inline-flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-pink-600 font-medium text-sm py-1.5 px-4 rounded-full cursor-pointer transition-colors border border-pink-200 hover:border-pink-300">
                                    <Camera className="w-4 h-4" />
                                    <span>Upload Photo</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                </label>
                            </div>
                            {/* Content Grid */}
                            <div className="grid md:grid-cols-2 gap-8 mt-6">
                                {/* Ingredients */}
                                <div>
                                    <h3 className="font-heading text-xl font-bold text-gray-800 mb-4 flex items-center">
                                        <span className="bg-pink-100 text-pink-500 p-1 rounded-lg mr-2">
                                            <ClipboardList className="w-5 h-5" />
                                        </span>
                                        Ingredients
                                    </h3>
                                    <ul className="space-y-3">
                                        {recipe.ingredients.map((ing, idx) => (
                                            <li key={idx} className="flex items-start text-gray-600">
                                                <span className="text-pink-400 mr-2 mt-1">•</span>
                                                <span>{ing}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => onAddToShoppingList(recipe)}
                                        className="mt-6 w-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-bold py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        Add to Shopping List
                                    </button>
                                </div>
                                {/* Instructions */}
                                <div>
                                    <h3 className="font-heading text-xl font-bold text-gray-800 mb-4 flex items-center">
                                        <span className="bg-blue-100 text-blue-500 p-1 rounded-lg mr-2">
                                            <Settings className="w-5 h-5" />
                                        </span>
                                        Instructions
                                    </h3>
                                    <ol className="space-y-4">
                                        {recipe.instructions.map((step, idx) => (
                                            <li key={idx} className="flex gap-3">
                                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-500 font-bold text-sm flex items-center justify-center mt-0.5">
                                                    {idx + 1}
                                                </span>
                                                <span className="text-gray-600 leading-relaxed">{step}</span>
                                            </li>
                                        ))}
                                    </ol>
                                    {/* Machine Settings */}
                                    <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-sm text-gray-500 font-medium mb-1">Machine Settings:</p>
                                        <div className="flex gap-2">
                                            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm font-bold capitalize">
                                                {recipe.mode} Mode
                                            </span>
                                            <span className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm font-bold capitalize">
                                                {recipe.program.replace(/-/g, ' ')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <ConfirmDeleteModal
                    recipeName={recipe.title}
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteConfirm(false)}
                />
            )}
        </div>
    );
}
