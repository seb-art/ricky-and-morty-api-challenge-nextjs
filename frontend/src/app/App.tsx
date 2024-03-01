// App.tsx
import React from 'react';
import Link from 'next/link';
import Home from './page';
import ResidentDetails from '../components/ResidentDetails';

const App: React.FC = () => {
  return (
    <div>
      <Link href="/">Home</Link>
      <Link href="/location/123">Resident Details</Link>
      <Home />
      <ResidentDetails />
    </div>
  );
};

export default App;
