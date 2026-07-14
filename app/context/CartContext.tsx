'use client';
import React, { createContext, useContext, useState } from 'react';

// Structure d'un produit de la Maison
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  stock?: number;
}

// Structure d'un article dans le panier
export interface CartItem {
  product: Product;
  quantity: number;
}

// Définition de tout ce qui est partagé dans l'application
interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateProductPrice: (id: string, newPrice: number) => void;
  addNewProduct: (product: Product) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Catalogue initial par défaut calé sur tes images réelles
const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: "Bracelet Perle & Or", price: 85000, image: "/ima20.jpg", category: "Femme", stock: 12 },
  { id: '2', name: "Collier Mille Éclats", price: 350000, image: "/ima21.jpg", category: "Femme", stock: 5 },
  { id: '3', name: "Anau Saphir Antique", price: 180000, image: "/ima22.jpg", category: "Homme", stock: 8 },
  { id: '4', name: "Bague Diamant Prestige", price: 420000, image: "/ima23.jpg", category: "Femme", stock: 3 },
];

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);

  // --- LOGIQUE DU PANIER ---
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  // --- LOGIQUE DE L'ADMINISTRATION (Nouveau !) ---
  const updateProductPrice = (id: string, newPrice: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === id ? { ...p, price: newPrice } : p))
    );
  };

  const addNewProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <ShopContext.Provider value={{ products, cart, addToCart, removeFromCart, clearCart, updateProductPrice, addNewProduct }}>
      {children}
    </ShopContext.Provider>
  );
}

// Change juste le nom ici, passe de useShop à useCart
export function useCart() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useCart doit être utilisé au sein d'un ShopProvider");
  return context;
}
