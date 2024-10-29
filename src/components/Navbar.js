'use client'
import Image from 'next/image';
import Link from 'next/link';
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
               <Link href='/' className='hidden md:block'><Image src='/logo1.png' width={500} height={500} className=' w-32 h-auto object-cover' /></Link>
               <Link href='/' className='md:hidden'><Image src='/logo2.png' width={1000} height={1000} className=' w-32 h-auto object-cover' /></Link>
                <Link href='/contact' className="px-4 py-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300">
                    Contact Us
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
