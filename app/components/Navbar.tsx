'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="w-full bg-[#FAF9F6]/80 backdrop-blur-md border-b border-[#1A1A1A]/5 fixed top-0 left-0 z-50 px-6 sm:px-16 py-5 flex justify-between items-center text-[#1A1A1A]">
      <Link href="/" className="group flex flex-col">
        <span className="font-serif text-xl sm:text-2xl tracking-[0.4em] uppercase font-light transition-colors duration-300 group-hover:text-[#D4AF37]">
          Maison Awhiska
        </span>
        <span className="text-[7px] uppercase tracking-[0.6em] text-gray-400 mt-1 self-center sm:self-start">
          Haute Création
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.3em] font-medium">
        <Link href="/" className="hover:text-[#D4AF37] transition-colors">Accueil</Link>
        <Link href="/#collection" className="hover:text-[#D4AF37] transition-colors">Collections</Link>
        <Link href="/admin" className="text-gray-400 hover:text-black transition-colors">Espace Privé</Link>
      </div>

      <div className="flex items-center gap-6">
        {/* Redirection vers la page panier dédiée */}
        <Link href="/panier" className="relative p-1 group" aria-label="Voir le panier">
          <svg className="w-5 h-5 text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#1A1A1A] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#FAF9F6]">
              {cartCount}
            </span>
          )}
        </Link>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex flex-col gap-1.5 w-6">
          <span className={`h-[1px] w-5 bg-black transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`h-[1px] w-5 bg-black transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-[1px] w-5 bg-black transition-transform ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-[73px] left-0 w-full bg-[#FAF9F6] border-b border-gray-100 py-6 px-8 flex flex-col gap-5 text-xs uppercase tracking-[0.2em] md:hidden shadow-sm">
          <Link href="/" onClick={() => setIsOpen(false)}>Accueil</Link>
          <Link href="/#collection" onClick={() => setIsOpen(false)}>Collections</Link>
          <Link href="/panier" onClick={() => setIsOpen(false)}>Mon Panier ({cartCount})</Link>
          <Link href="/admin" onClick={() => setIsOpen(false)} className="text-gray-400">Espace Privé</Link>
        </div>
      )}
    </nav>
  );
}