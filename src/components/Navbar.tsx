import React from 'react';
import { ShoppingCart, Heart, User, Search, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button className="sm:hidden p-2">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold ml-2 sm:ml-0">SOLSHADES</h1>
          </div>
          
          <div className="hidden sm:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-black">Sunglasses</a>
            <a href="#" className="text-gray-700 hover:text-black">Optical</a>
            <a href="#" className="text-gray-700 hover:text-black">Collections</a>
            <a href="#" className="text-gray-700 hover:text-black">About</a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2">
              <User className="h-5 w-5" />
            </button>
            <button className="p-2">
              <Heart className="h-5 w-5" />
            </button>
            <button className="p-2 relative" onClick={onCartClick}>
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;