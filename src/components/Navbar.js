'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Navbar = ({ className }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { href: '/', text: 'Home' },
        { href: '/about', text: 'About' },
        // { href: '/about#activity', text: 'Activity' },
        { href: '/events', text: 'Events' },
        // { href: '/membership', text: 'Membership' },    
        { href: '/contact', text: 'Contact Us' },
    ];

    return (
        <header
            className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-[#1A0C2A]' : 'bg-transparent'
                } ${className}`}
          
        >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6">
                <div className="flex justify-between items-center w-full md:w-auto">
                    <img
                        src="/logo1.png"
                        alt="Header Logo"
                        className="h-10 w-40 object-contain"
                    />
                    <button
                        className="md:hidden rounded-lg p-2 hover:bg-white/10 text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-2/3 gap-4 `}>
                    <ul className="flex flex-col md:flex-row md:justify-end items-center md:gap-16 md:mr-16 gap-4 w-full ">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.href}
                                    className="text-sm font-semibold text-white hover:text-gray-200 block text-center"
                                >
                                    {link.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <Link href='/register' className="px-4 py-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300 flex justify-center md:w-1/3">
                        Register
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;