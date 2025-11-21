import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmDeleteModal({ recipeName, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Warning Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center animate-bounce-once">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                    Delete Recipe?
                </h2>

                {/* Message */}
                <p className="text-center text-gray-600 mb-6">
                    Are you sure you want to delete{' '}
                    <span className="font-semibold text-gray-900">"{recipeName}"</span>?
                    <br />
                    <span className="text-sm text-red-600 mt-2 inline-block">
                        This action cannot be undone.
                    </span>
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all duration-200 hover:scale-105"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        Delete
                    </button>
                </div>
            </div>


        </div>
    );
}
