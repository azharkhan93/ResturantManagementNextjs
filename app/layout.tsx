'use client';

import { Exo, Italiana, Josefin_Sans, Noto_Serif } from 'next/font/google';
import { Layout } from '../components';
import './globals.css';


const exo = Exo({
  subsets: ['latin'],
  variable: '--font-exo',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const italiana = Italiana({
  subsets: ['latin'],
  variable: '--font-italiana',
  weight: '400',
});

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-noto-serif',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" className={`${exo.variable} ${italiana.variable} ${josefinSans.variable} ${notoSerif.variable}`}>
      <body className="font-exo">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;