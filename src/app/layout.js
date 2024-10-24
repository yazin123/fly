
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Montserrat } from 'next/font/google';
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
  title: "Fly",
  description: "Build for dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} montserrat-font  `}>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
