import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Sunglasses"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      <div className="relative flex items-center justify-center h-full text-center">
        <div className="max-w-3xl px-4">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Elevate Your Vision
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8">
            Discover our collection of luxury eyewear, crafted for those who appreciate exceptional quality and timeless style.
          </p>
          <button className="bg-white text-black px-8 py-3 text-lg font-medium hover:bg-black hover:text-white transition-colors">
            Shop Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;