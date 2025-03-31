import React, { useState } from 'react';
import ProductDetails from './ProductDetails';
import type { Product } from '../types';

const products: Product[] = [
  {
    id: '1',
    name: 'Aviator Classic',
    price: 299,
    description: 'Classic aviator sunglasses with gold-tone metal frames and gradient lenses. Perfect for any occasion, these timeless shades offer both style and protection.',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'],
    category: 'Aviator',
    inStock: true
  },
  {
    id: '2',
    name: 'Wayfarer Elite',
    price: 349,
    description: 'Modern interpretation of the iconic Wayfarer design. Features premium acetate frames and polarized lenses for superior clarity and style.',
    images: ['https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'],
    category: 'Wayfarer',
    inStock: true
  },
  {
    id: '3',
    name: 'Round Essence',
    price: 279,
    description: 'Sophisticated round-frame sunglasses with titanium construction and anti-reflective coating. The perfect blend of vintage charm and modern technology.',
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'],
    category: 'Round',
    inStock: true
  }
];

const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Featured Collection</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="relative overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => setSelectedProduct(product)}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 text-black px-6 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                Quick View
              </button>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default FeaturedProducts;