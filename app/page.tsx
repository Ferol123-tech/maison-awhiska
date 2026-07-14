'use client';
import React from 'react';
import Link from 'next/link';
// Importation du hook et du type Product nécessaires pour éviter les erreurs TypeScript
import { useCart, Product } from './context/CartContext'; 

// Catalogue officiel calé sur tes images et tes prix réels
const PRODUITS_AWHISKA: Product[] = [
  { id: '1', name: "Chaine fine", price: 10000, image: "/ima20.jpg" },
  { id: '2', name: "Bracelet ellegant + Bague homme ", price: 5000, image: "/ima21.jpg" },
  { id: '3', name: "Bracelet", price: 3500, image: "/ima22.jpg" },
  { id: '4', name: "Duo 1", price: 15000, image: "/ima23.jpg" },
];

export default function HomePage() {
  const { addToCart } = useCart();

  return (
    <div className="bg-[#FAF9F6] text-[#1A1A1A] font-sans antialiased min-h-screen">
      
      {/* 1. HERO SECTION IMMERSIF */}
      <section 
        className="relative h-[92vh] flex items-center bg-cover bg-center px-6 sm:px-16 md:px-24 overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(20,20,20,0.9) 35%, rgba(20,20,20,0.4) 60%, rgba(20,20,20,0.15)), url('/hero-bg.jpg')` 
        }}
      >
        <div className="absolute left-0 top-1/4 h-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#D4AF37]/60 to-transparent hidden md:block" />

        <div className="max-w-3xl space-y-8 text-white relative z-10 animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-semibold">Collection Haute Joaillerie</p>
          </div>
          
          <h1 className="font-serif text-5xl sm:text-7xl tracking-wide font-light leading-[1.15] text-[#FAF9F6]">
            Chaque détail <br /> 
            <span className="font-extralight text-white/90">raconte</span>
          </h1>
          
          <p className="italic font-serif text-3xl sm:text-5xl text-[#D4AF37] font-light tracking-wide pl-4 border-l border-[#D4AF37]/30">
            une part de votre lumière.
          </p>
          
          <div className="pt-8 flex flex-wrap gap-6 items-center">
            <Link href="#collection" className="bg-white text-black text-[10px] uppercase tracking-[0.3em] px-10 py-4 hover:bg-[#D4AF37] hover:text-white transition-all duration-500 font-medium shadow-lg hover:shadow-[#D4AF37]/20">
              Découvrir la Boutique
            </Link>
            <Link href="#story" className="text-white text-[10px] uppercase tracking-[0.3em] font-medium group flex items-center gap-2 hover:text-[#D4AF37] transition-colors duration-300">
              Notre Histoire <span className="group-hover:translate-x-2 transition-transform duration-300">➔</span>
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 right-6 sm:right-16 text-right text-[9px] uppercase tracking-[0.3em] text-white/40 hidden sm:block">
          <p className="font-medium tracking-[0.4em]">Maison Awhiska</p>
          <p className="text-[#D4AF37] font-serif italic mt-0.5 font-light text-[11px] normal-case tracking-wider">Créations Abidjan</p>
        </div>
      </section>

      {/* 2. SECTION STORYTELLING / MANNEQUIN */}
      <section id="story" className="max-w-7xl mx-auto px-6 sm:px-16 py-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 order-2 md:order-1">
          <div className="space-y-2">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37] font-semibold">L'Ancrage</p>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-wide font-light leading-tight text-gray-900">
              Née à Abidjan, <br />
              <span className="italic text-gray-400 font-light font-serif">inspirée par le monde.</span>
            </h2>
          </div>
          
          <p className="text-xs text-gray-600 font-light leading-relaxed tracking-wide max-w-md border-l-2 border-gray-100 pl-4">
            Chaque bijou façonne une histoire unique. Nos créateurs subliment les matières les plus nobles pour concevoir des pièces d’exception qui vous accompagnent au quotidien.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-4 text-[10px] uppercase tracking-widest font-medium text-gray-700">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45"></span>
              <span>Livraison Sécurisée</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45"></span>
              <span>Pièces Certifiées</span>
            </div>
          </div>
        </div>

        <div className="relative order-1 md:order-2 p-3 border border-black/5 bg-white shadow-sm max-w-md mx-auto w-full">
          <div className="relative aspect-[4/5] overflow-hidden group">
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              style={{ backgroundImage: `url('/story-portrait.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 text-white z-10">
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium mb-1">Collection Exclusive</p>
              <p className="font-serif text-xl tracking-[0.15em] uppercase font-light">Reine d'Awa</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION CATÉGORIES (HOMME / FEMME) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-16 py-8 space-y-10">
        <div className="text-center space-y-1">
          <p className="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37] font-semibold">Lignes Créatives</p>
          <h2 className="font-serif text-2xl uppercase tracking-[0.2em] font-light text-gray-900">Élégance Signée</h2>
          <div className="w-12 h-[1px] bg-gray-200 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[320px] overflow-hidden group shadow-md border border-black/5">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] group-hover:scale-105"
              style={{ backgroundImage: `url('/category-homme.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 space-y-2 text-white">
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">Pour Lui</p>
              <h3 className="font-serif text-2xl tracking-wider font-light uppercase">Homme</h3>
            </div>
          </div>

          <div className="relative h-[320px] overflow-hidden group shadow-md border border-black/5">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] group-hover:scale-105"
              style={{ backgroundImage: `url('/category-femme.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 space-y-2 text-white">
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">Pour Elle</p>
              <h3 className="font-serif text-2xl tracking-wider font-light uppercase">Femme</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION CATALOGUE : PIÈCES D'EXCEPTION */}
      <section id="collection" className="max-w-7xl mx-auto px-6 sm:px-16 py-28 space-y-16 scroll-mt-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-gray-200 pb-6 gap-4">
          <div className="space-y-1">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37] font-semibold">Sélection Privée</p>
            <h2 className="font-serif text-3xl uppercase tracking-[0.1em] font-light text-gray-900">
              Pièces d'exception
            </h2>
          </div>
          <Link href="/panier" className="text-[10px] uppercase tracking-[0.2em] font-medium border-b border-black pb-1 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300">
            Accéder au panier ➔
          </Link>
        </div>

        {/* Grille des Produits Joaillerie avec VRAIES IMAGES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {PRODUITS_AWHISKA.map((product, index) => (
            <div key={product.id} className="group flex flex-col justify-between space-y-5 bg-white p-5 border border-black/[0.03] shadow-sm hover:shadow-xl hover:border-[#D4AF37]/20 transition-all duration-500 relative">
              
              {/* Conteneur Image avec tes fichiers de 'public' */}
              <div className="relative aspect-square w-full overflow-hidden border border-black/[0.02]">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${product.image}')` }}
                />
                
                <span className="absolute top-3 left-3 bg-[#1A1A1A] text-[#D4AF37] text-[8px] font-semibold uppercase tracking-[0.2em] px-2.5 py-1 shadow-sm">
                  {index % 2 === 0 ? 'Édition Rare' : 'Exclusivité'}
                </span>
              </div>
              
              {/* Informations Produits */}
              <div className="space-y-2 text-center pt-2">
                <h3 className="font-sans text-[11px] uppercase tracking-widest font-medium text-gray-800 group-hover:text-[#D4AF37] transition-colors duration-300 min-h-[32px] flex items-center justify-center">
                  {product.name}
                </h3>
                <div className="w-6 h-[1px] bg-gray-100 mx-auto"></div>
                <p className="font-serif text-sm text-[#1A1A1A] font-semibold tracking-wide">
                  {product.price.toLocaleString('fr-FR')} <span className="text-[11px] text-[#D4AF37] font-sans font-normal ml-0.5">FCFA</span>
                </p>
              </div>

              {/* Bouton Panier (Correction de "river" appliquée ici) */}
              <button
                onClick={() => addToCart(product)}
                className="w-full py-3 bg-white border border-[#1A1A1A] text-black text-[9px] uppercase tracking-[0.25em] font-medium transition-all duration-300 hover:bg-black hover:text-white"
              >
                Ajouter au Panier
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}