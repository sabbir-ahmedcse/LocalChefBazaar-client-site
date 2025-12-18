import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <div>
      <aside>
        <Navbar />
      </aside>

      <main className="max-w-[1100px] mx-auto">
        <Outlet /> {/* Renders child routes like /meals/:id */}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout; // ✅ default export
