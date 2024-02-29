import { ReactNode } from 'react';
import Head from 'next/head';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Rick & Morty Locations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default Layout;

