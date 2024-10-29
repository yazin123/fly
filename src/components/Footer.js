'use client'
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaTwitter, 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin,
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope 
} from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' }
  ];

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      content: 'XXI/152, Cochin University Post, Kalamassery, Ernakulam, 682022',
      type: 'address'
    },
    {
      icon: FaPhone,
      content: ['+91 884 808 5572', '+91 812 983 9102'],
      type: 'phone'
    },
    {
      icon: FaEnvelope,
      content: 'info@flynetwork.in',
      type: 'email'
    }
  ];

  return (
    <footer className="bg-[#1A0C2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Company Info Section */}
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <Image 
                src="/logo2.png" 
                width={1000} 
                height={100} 
                alt="Fly Network Logo"
                className="w-auto h-32 object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </Link>
            
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Connecting businesses with innovative networking solutions. 
              Your trusted partner in digital transformation and technological excellence.
            </p>

            {/* Social Links */}
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-gray-300 hover:text-white transform hover:scale-110 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={22} />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-8">
            <h3 className="text-white text-xl font-semibold">Contact Us</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <info.icon className="text-purple-300 mt-1 flex-shrink-0 w-5 h-5 group-hover:text-white transition-colors duration-300" />
                  <div className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">
                    {Array.isArray(info.content) ? (
                      info.content.map((item, idx) => (
                        <p key={idx} className="hover:text-purple-300 transition-colors duration-300">
                          {item}
                        </p>
                      ))
                    ) : (
                      <p className="hover:text-purple-300 transition-colors duration-300">
                        {info.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-purple-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Fly Network. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link 
                href="/privacy" 
                className="text-gray-300 hover:text-white text-sm transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-300 hover:text-white text-sm transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;