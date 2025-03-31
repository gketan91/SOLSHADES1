import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '../types';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white max-w-4xl w-full mx-4 rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-[400px] object-cover"
            />
          </div>
          
          <div className="md:w-1/2 p-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                <p className="text-xl mb-4">${product.price}</p>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-black">
                ✕
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="space-y-4">
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-black text-white py-3 flex items-center justify-center space-x-2 hover:bg-gray-800"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              
              <button className="w-full border border-black py-3 flex items-center justify-center space-x-2 hover:bg-gray-50">
                <Heart className="h-5 w-5" />
                <span>Add to Wishlist</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;