import React from 'react';
import { IceCream, Heart, Github, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { label: 'Scoop Mode', id: 'scoop' },
        { label: 'Soft Serve', id: 'soft-serve' },
        { label: 'Shopping List', id: 'shopping' },
    ];

    const programs = [
        'Ice Cream', 'Gelato', 'Sorbet', 'Frozen Yogurt',
        'Lite Ice Cream', 'CreamiFit'
    ];

    return (
        <footer className="bg-gradient-to-b from-creami-gray to-white mt-auto">
            {/* Gradient top border */}
            <div className="h-1 bg-gradient-to-r from-creami-pink via-creami-blue to-creami-mint" />

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Column */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-3xl">🍦</span>
                            <span className="font-heading text-2xl font-bold text-creami-dark">
                                Roland<span className="bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">Cooks</span>
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-4">
                            Your personal collection of delicious Ninja Creami recipes.
                            From creamy gelatos to refreshing sorbets — discover endless frozen treat possibilities.
                        </p>
                        <p className="text-sm text-gray-400 flex items-center gap-1">
                            Made with <Heart className="w-4 h-4 text-pink-400 fill-pink-400" /> for the Ninja Creami & Swirl
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-bold text-creami-dark mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.id}>
                                    <a
                                        href={`#${link.id}`}
                                        className="text-gray-500 hover:text-pink-500 text-sm transition-colors flex items-center gap-1 group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Programs */}
                    <div>
                        <h4 className="font-heading font-bold text-creami-dark mb-4">Programs</h4>
                        <ul className="space-y-2">
                            {programs.map((program) => (
                                <li key={program}>
                                    <span className="text-gray-500 text-sm">{program}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        © {currentYear} Roland's Creami Recipes. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="mailto:contact@example.com"
                            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                        >
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

