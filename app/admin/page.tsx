'use client';
import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // On utilise useCart ici comme sur tout le reste du site !

// Données de trafic simulées pour Abidjan
const INITIAL_VISITORS = [
  { id: 1, time: "16:15", commune: "Cocody Angré", device: "iPhone", action: "A ajouté au panier" },
  { id: 2, time: "16:10", commune: "Marcory Zone 4", device: "Samsung S24", action: "Consulte le catalogue" },
  { id: 3, time: "15:55", commune: "Yopougon", device: "iPhone", action: "A validé sa commande WhatsApp" },
  { id: 4, time: "15:42", commune: "Riviera 3", device: "MacBook Pro", action: "Consulte Notre Histoire" },
];

export default function AdminDashboard() {
  // États pour l'authentification sécurisée
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Récupération du catalogue et des actions globales via useCart
  const { products, updateProductPrice, addNewProduct } = useCart();
  const [visitors] = useState(INITIAL_VISITORS);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Femme',
    image: 'ima20.jpg',
    stock: ''
  });

  // Vérification du mot de passe de la Maison
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Awhiska2026') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // Modifie le prix globalement via le Context
  const handlePriceChange = (id: string, newPrice: number) => {
    updateProductPrice(id, newPrice);
  };

  // Ajoute un produit globalement via le Context
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    // On s'assure d'avoir le bon format d'image avec le "/" initial
    const formattedImage = newProduct.image.startsWith('/') ? newProduct.image : `/${newProduct.image}`;

    addNewProduct({
      id: (products.length + 1).toString(),
      name: newProduct.name,
      price: Number(newProduct.price),
      category: newProduct.category,
      image: formattedImage,
      stock: Number(newProduct.stock) || 1
    });

    // Réinitialisation du formulaire
    setNewProduct({ name: '', price: '', category: 'Femme', image: 'ima20.jpg', stock: '' });
  };

  // 1. ÉCRAN DE SÉCURITÉ (S'affiche si l'utilisateur n'est pas connecté)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center px-6 font-sans">
        <div className="max-w-sm w-full bg-white border border-black/5 p-8 text-center space-y-6 shadow-xl">
          <div className="space-y-1">
            <p className="font-serif italic text-lg text-[#D4AF37]">Maison Awhiska</p>
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gray-500">Accès Haute Sécurité</h2>
            <div className="w-8 h-[1px] bg-[#D4AF37] mx-auto mt-2"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-[9px] uppercase tracking-widest text-gray-400 font-medium">Mot de passe administrateur</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full border border-gray-200 px-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37] tracking-widest bg-[#FAF9F6]/30 text-center"
              />
            </div>

            {authError && (
              <p className="text-[10px] text-red-500 font-light text-center tracking-wide">
                Code d'accès incorrect. Veuillez réessayer.
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#1A1A1A] hover:bg-[#D4AF37] text-white text-[10px] font-medium uppercase tracking-[0.25em] py-3.5 transition-all duration-300 shadow-sm"
            >
              Déverrouiller l'Espace ➔
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. ÉCRAN PRINCIPAL (S'affiche uniquement après validation du mot de passe)
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] p-6 sm:p-12 font-sans antialiased">
      
      {/* HEADER DE L'ESPACE PRIVÉ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-black/10 pb-6 mb-12 gap-4">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-semibold">Maison Awhiska — Espace Privé</p>
          <h1 className="font-serif text-3xl uppercase tracking-wider font-light">Tableau de Bord de Gestion</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white border border-black/5 px-4 py-2 text-[10px] uppercase tracking-widest font-medium text-gray-600 shadow-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>Session Sécurisée</span>
          </div>
          <button 
            onClick={() => { setIsAuthenticated(false); setPassword(''); }}
            className="text-[9px] uppercase tracking-widest text-red-500 font-medium hover:underline"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* 1. SECTION COMPTEURS & PERFORMANCE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white border border-black/5 p-6 shadow-sm">
          <p className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Visiteurs Uniques (Aujourd'hui)</p>
          <p className="font-serif text-3xl font-light text-gray-900">342 <span className="text-xs font-sans text-emerald-500 font-medium ml-1">▲ +14%</span></p>
        </div>
        <div className="bg-white border border-black/5 p-6 shadow-sm">
          <p className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Commandes WhatsApp</p>
          <p className="font-serif text-3xl font-light text-gray-900">18 <span className="text-xs font-sans text-[#D4AF37] font-medium ml-1">En attente</span></p>
        </div>
        <div className="bg-white border border-black/5 p-6 shadow-sm">
          <p className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Chiffre d'Affaires du Jour</p>
          <p className="font-serif text-2xl font-semibold text-gray-900">1 450 000 <span className="text-[10px] font-sans font-normal text-[#D4AF37]">FCFA</span></p>
        </div>
        <div className="bg-white border border-black/5 p-6 shadow-sm">
          <p className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold mb-1">Taux de Conversion</p>
          <p className="font-serif text-3xl font-light text-gray-900">5.2 % <span className="text-xs font-sans text-gray-400 font-normal ml-1">Moy. Abidjan</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* 2. SECTION CATALOGUE & PRIX */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white border border-black/5 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="font-serif text-lg tracking-wide font-light border-b border-gray-100 pb-3 uppercase text-gray-900">
              💎 Liste des Pièces & Ajustement des Prix
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                    <th className="pb-3 font-medium">Création</th>
                    <th className="pb-3 font-medium">Image Assignée</th>
                    <th className="pb-3 font-medium">Catégorie</th>
                    <th className="pb-3 font-medium">Stock</th>
                    <th className="pb-3 font-medium text-right">Prix (FCFA)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id} className="group hover:bg-[#FAF9F6]/50 transition-colors">
                      <td className="py-4 font-medium text-gray-900 uppercase tracking-wide">{product.name}</td>
                      <td className="py-4">
                        <span className="bg-gray-100 px-2 py-1 text-[9px] text-gray-600 font-mono rounded">
                          {product.image}
                        </span>
                      </td>
                      <td className="py-4 text-gray-500 font-light">{product.category || 'Général'}</td>
                      <td className="py-4 text-gray-500 font-light">{product.stock || 0} pces</td>
                      <td className="py-4 text-right">
                        <input
                          type="number"
                          value={product.price}
                          onChange={(e) => handlePriceChange(product.id, Number(e.target.value))}
                          className="w-28 text-right bg-transparent border-b border-transparent group-hover:border-gray-300 focus:border-[#D4AF37] focus:outline-none font-serif font-semibold text-gray-900 p-1 transition-colors"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FORMULAIRE AJOUT DE BIJOU */}
          <div className="bg-white border border-black/5 p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="font-serif text-base tracking-wide font-light border-b border-gray-100 pb-2 uppercase text-gray-900">
              ✨ Ajouter une nouvelle création au Catalogue
            </h3>
            
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-widest text-gray-400 font-medium">Nom de la pièce *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Collier Reine Amina"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full border border-gray-200 px-3 py-2.5 focus:outline-none focus:border-[#D4AF37] font-light bg-[#FAF9F6]/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-widest text-gray-400 font-medium">Prix de vente (FCFA) *</label>
                <input
                  type="number"
                  required
                  placeholder="Ex: 250000"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full border border-gray-200 px-3 py-2.5 focus:outline-none focus:border-[#D4AF37] font-serif font-semibold bg-[#FAF9F6]/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-widest text-gray-400 font-medium">Ligne / Catégorie</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full border border-gray-200 px-3 py-2.5 focus:outline-none focus:border-[#D4AF37] font-light bg-white"
                >
                  <option value="Femme">Femme</option>
                  <option value="Homme">Homme</option>
                  <option value="Unisexe">Unisexe</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase tracking-widest text-gray-400 font-medium">Image du dossier Public</label>
                <select
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  className="w-full border border-gray-200 px-3 py-2.5 focus:outline-none focus:border-[#D4AF37] font-mono bg-white text-[11px]"
                >
                  <option value="ima20.jpg">ima20.jpg</option>
                  <option value="ima21.jpg">ima21.jpg</option>
                  <option value="ima22.jpg">ima22.jpg</option>
                  <option value="ima23.jpg">ima23.jpg</option>
                </select>
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#1A1A1A] hover:bg-[#D4AF37] text-white text-[10px] uppercase tracking-[0.25em] font-medium py-3.5 transition-colors duration-300 shadow-sm"
                >
                  Publier la création sur la boutique
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 3. FLUX VISITEURS */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white border border-black/5 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="font-serif text-sm uppercase tracking-wider font-light text-gray-900">
                👤 Activité en direct
              </h2>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>

            <div className="space-y-4">
              {visitors.map((visitor) => (
                <div key={visitor.id} className="text-xs space-y-1 bg-[#FAF9F6]/40 p-3 border border-black/[0.02]">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{visitor.commune}</span>
                    <span className="text-[10px] text-gray-400 font-light">{visitor.time}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-gray-500">
                    <span className="font-light">Via {visitor.device}</span>
                    <span className={`text-[10px] font-medium uppercase tracking-wider ${visitor.action.includes('WhatsApp') ? 'text-emerald-600' : visitor.action.includes('panier') ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                      {visitor.action}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}