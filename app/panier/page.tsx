'use client';
import React from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function PanierPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  // Calcul du sous-total sécurisé contre les valeurs indéfinies
  const subtotal = cart 
    ? cart.reduce((acc, item) => {
        const price = item?.product?.price ?? 0;
        const qty = item?.quantity ?? 0;
        return acc + (price * qty);
      }, 0) 
    : 0;

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center space-y-4">
        <p className="font-serif text-lg text-gray-500 font-light">Votre panier est vide.</p>
        <Link href="/" className="bg-black text-white text-[10px] uppercase tracking-widest px-8 py-3.5 hover:bg-[#D4AF37] transition-colors">
          Découvrir les créations
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-10">
      <div className="text-center space-y-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]">Votre Sélection</p>
        <h1 className="font-serif text-3xl uppercase tracking-widest font-light">Mon Panier</h1>
        <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mt-2"></div>
      </div>

      <div className="bg-white border border-black/5 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="divide-y divide-gray-100">
          {cart.map((item) => {
            const product = item?.product;
            const price = product?.price ?? 0;
            const qty = item?.quantity ?? 0;

            if (!product) return null;

            return (
              <div key={product.id} className="py-6 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-20 h-20 bg-gray-50 border border-gray-100 flex-shrink-0">
                    <Image
                      src={product.image || '/placeholder.jpg'}
                      alt={product.name || 'Création'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm uppercase tracking-wider text-gray-900">{product.name}</h3>
                    <p className="text-gray-400 text-xs mt-1">Quantité : {qty}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto">
                  <span className="font-serif text-sm font-medium">
                    {(price * qty).toLocaleString('fr-FR')} FCFA
                  </span>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-400 hover:text-red-600 text-[10px] uppercase tracking-widest transition-colors"
                  >
                    Retirer
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={clearCart}
            className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
          >
            Vider le panier
          </button>
          
          <div className="text-center sm:text-right space-y-4">
            <p className="text-sm">
              <span className="text-gray-500 uppercase tracking-widest text-xs">Sous-total :</span>{' '}
              <strong className="font-serif text-lg text-gray-900 ml-2">
                {subtotal.toLocaleString('fr-FR')} FCFA
              </strong>
            </p>
            <div className="flex gap-4">
              <Link
                href="/"
                className="border border-black px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
              >
                Continuer les achats
              </Link>
              <Link
                href="/checkout"
                className="bg-black text-white px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-[#D4AF37] transition-all duration-300"
              >
                Passer la commande
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}