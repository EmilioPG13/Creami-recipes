import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-creami-gray">
                    <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
                        <div className="text-6xl mb-4">🍦</div>
                        <h1 className="font-heading text-2xl font-bold text-gray-800 mb-2">
                            Oops! Something melted...
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Something went wrong while loading the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-2 rounded-full transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
