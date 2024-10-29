'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaPlay, FaTwitter, FaFacebook, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
const Footer = () => {
    const [email, setEmail] = useState('');
    return (
        <div className='bg-purple-800'>

            {/* Newsletter Section */}
            {/* <section className=" py-16 text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="text-center mb-8">
                    <h3 className="text-xl font-bold mb-2">Join our newsletter to get latest updates about conference.</h3>
                </div>

                <div className="max-w-md mx-auto flex gap-4">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 bg-gray-800 px-4 py-2 rounded-md"
                    />
                    <button className="px-6 py-2 bg-red-500 rounded-md">Subscribe</button>
                </div>
            </section> */}
            <footer className=" py-16 border-t border-gray-800 ">
                <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div>
                    <Link href='/'><Image src='/logo2.png' width={500} height={500} className=' h-32 w-auto' /></Link>
                    </div>
                    <div className="flex gap-4">
                        <FaTwitter className="text-gray-400" />
                        <FaFacebook className="text-gray-400" />
                    </div>
                </div>
            </footer>
        </div>

    )
}

export default Footer
