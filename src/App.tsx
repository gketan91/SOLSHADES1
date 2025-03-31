import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <main>
          <Hero />
          <FeaturedProducts />
        </main>
        
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        
        <footer className="bg-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">About Solshades</h3>
              <p className="text-gray-400">Luxury eyewear for the discerning individual. Crafted with precision and style.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Contact Us</li>
                <li>Shipping & Returns</li>
                <li>Size Guide</li>
                <li>FAQ</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Store Locator</li>
                <li>Warranty</li>
                <li>Our Story</li>
                <li>Careers</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/10 border border-white/20 px-4 py-2 rounded-md focus:outline-none focus:border-white"
              />
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;