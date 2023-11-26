import React from 'react';
import type { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section className="grid grid-rows-[auto_1fr_auto] bg-slate-100 h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </section>
  );
};

export default Layout;
