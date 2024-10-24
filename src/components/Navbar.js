'use client'
import React, { useEffect, useState } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
       const handleScroll = () => {
            if (window.scrollY >50) { // Adjust the scroll threshold as needed
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed w-full top-0 left-0 z-50 p-6 transition-all duration-300 ${isScrolled ? 'bg-[#191E24]' : 'bg-transparent'}`}>
            <div className="flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">FLY</h1>
                <button className="px-4 py-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300">
                    Contact Us
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
