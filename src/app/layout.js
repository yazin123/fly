
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Montserrat } from 'next/font/google';
import Footer from "@/components/Footer";
import ClientComponent from "./ClientComponent";

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
  title: 'FLY - Forward Looking Youth',
  description: "Join FLY NextGen Awards 2024, celebrating young entrepreneurial talent with competitions, expert mentorship, and networking. 200+ emerging business leaders unite for this premier youth recognition platform",
  keywords: 'FLY NextGen Awards 2024, Young entrepreneurs awards, Youth entrepreneurship, Business leadership awards, NextGen business competition, Entrepreneurship mentorship, Business talent recognition,Youth entrepreneurship competition 2024',
  openGraph: {
    title: 'FLY - Forward Looking Youth',
    description: 'Join FLY NextGen Awards 2024, celebrating young entrepreneurial talent with competitions, expert mentorship, and networking. 200+ emerging business leaders unite for this premier youth recognition platform',
    url: 'https://register.flynetwork.in/',
    images: [
      {
        url: 'https://register.flynetwork.in/flymeta.jpg',
        alt: 'FLY - Forward Looking Youth',
      },
    ],
    siteName: 'FLY - Forward Looking Youth',
  },
  icons: {
    icon: '/flymeta.jpg',
    shortcut: '/flymeta.jpg',
    apple: '/img/yazin.jpg',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/flymeta.jpg',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClientComponent />
      <body className={`${montserrat.variable} montserrat-font  `}>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
