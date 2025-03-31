export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  wishlist: string[];
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}