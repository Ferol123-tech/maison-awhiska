'use client';
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function CheckoutPage() {
  // On récupère uniquement "cart" et "clearCart" depuis le useCart
  const { cart } = useCart();
  
  // États pour le formulaire de livraison
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: 'Abidjan',
    zone: '',
    addressDetails: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- CALCULS DES PRIX DIRECTEMENT SUR LA PAGE (Évite les bugs du Context) ---
  const subtotal = cart ? cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) : 0;
  
  // Si tu prévois un code promo plus tard, tu pourras modifier ces variables. Pour l'instant on les fixe à 0.
  const discountAmount = 0; 
  const discountCode = "";
  const totalPrice = subtotal - discountAmount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Numéro de téléphone WhatsApp officiel
    const whatsappNumber = "2250779598809"; 

    // 2. Construction du texte de la commande pour WhatsApp
    let message = `*✨ NOUVELLE COMMANDE - MAISON AWHISKA ✨*\n\n`;
    message += `*👤 CLIENT :*\n`;
    message += `• Nom : ${formData.fullName}\n`;
    message += `• Tél : ${formData.phone}\n`;
    message += `• Livraison : ${formData.city} — ${formData.zone}\n`;
    if (formData.addressDetails) message += `• Précisions : ${formData.addressDetails}\n`;
    
    message += `\n*💎 SÉLECTION :*\n`;
    cart.forEach((item) => {
      message += `• ${item.product.name} (x${item.quantity}) — ${(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA\n`;
    });

    message += `\n*💰 TOTAL FINAL :*\n`;
    if (discountAmount > 0) {
      message += `• Remise Privilège (${discountCode}) : -${discountAmount.toLocaleString('fr-FR')} FCFA\n`;
    }
    message += `• *Montant à régler : ${totalPrice.toLocaleString('fr-FR')} FCFA*\n\n`;
    message += `_Veuillez confirmer la disponibilité et le créneau de livraison._`;

    // 3. Encodage URL pour WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // 4. Redirection instantanée vers WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
    }, 800);
  };

  // Si le panier devient vide accidentellement
  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center space-y-4">
        <p className="font-serif text-lg text-gray-500 font-light">Votre panier ne contient aucune création.</p>
        <Link href="/" className="bg-black text-white text-[10px] uppercase tracking-widest px-8 py-3.5 hover:bg-[#D4AF37] transition-colors">
          Retourner au catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-16 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      {/* SECTION FORMULAIRE (À GAUCHE) */}
      <div className="lg:col-span-7 bg-white border border-black/5 p-8 sm:p-12 space-y-8 shadow-sm">
        <div className="space-y-1">
          <p className="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37] font-semibold">Finalisation</p>
          <h1 className="font-serif text-2xl uppercase tracking-[0.1em] font-light text-gray-900">Détails de livraison</h1>
          <div className="w-12 h-[1px] bg-[#D4AF37] mt-2"></div>
        </div>

        <form onSubmit={handlePlaceOrder} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Nom & Prénom *</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Ex: Marie-Esther Kouadio"
              className="w-full border border-gray-200 px-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37] font-light tracking-wide bg-[#FAF9F6]/30"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Numéro de Téléphone (WhatsApp de préférence) *</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ex: 07 79 59 88 09"
              className="w-full border border-gray-200 px-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37] font-light tracking-wide bg-[#FAF9F6]/30"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Ville *</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-200 px-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37] font-light bg-white"
              >
                <option value="Abidjan">Abidjan</option>
                <option value="Assinie">Assinie</option>
                <option value="Yamoussoukro">Yamoussoukro</option>
                <option value="Bouaké">Bouaké</option>
                <option value="San-Pédro">San-Pédro</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Commune / Quartier *</label>
              <input
                type="text"
                name="zone"
                required
                value={formData.zone}
                onChange={handleChange}
                placeholder="Ex: Cocody Angré, Marcory Zone 4"
                className="w-full border border-gray-200 px-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37] font-light tracking-wide bg-[#FAF9F6]/30"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">Indications complémentaires (Optionnel)</label>
            <input
              type="text"
              name="addressDetails"
              value={formData.addressDetails}
              onChange={handleChange}
              placeholder="Ex: Non loin de la pharmacie, Carrefour..."
              className="w-full border border-gray-200 px-4 py-3 text-xs focus:outline-none focus:border-[#D4AF37] font-light tracking-wide bg-[#FAF9F6]/30"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1A1A1A] hover:bg-[#D4AF37] text-white text-[11px] font-medium uppercase tracking-[0.3em] py-4 transition-all duration-300 shadow-md disabled:opacity-50"
            >
              {isSubmitting ? "Préparation de l'envoi..." : 'Confirmer via WhatsApp ➔'}
            </button>
            <p className="text-center text-[9px] text-gray-400 uppercase tracking-wider mt-3">
              Un récapitulatif complet sera généré sur votre application WhatsApp pour finaliser avec la Maison.
            </p>
          </div>
        </form>
      </div>

      {/* SECTION RÉCAPITULATIF (À DROITE) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white border border-black/5 p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="font-serif text-sm uppercase tracking-[0.2em] font-medium text-gray-800 border-b border-gray-100 pb-3">
            Résumé de la commande
          </h2>

          <div className="divide-y divide-gray-50 space-y-2 max-h-[280px] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.product.id} className="pt-3 flex justify-between items-start text-xs">
                <div className="space-y-0.5 max-w-[70%]">
                  <p className="font-medium text-gray-800 uppercase tracking-wide truncate">{item.product.name}</p>
                  <p className="text-gray-400 text-[10px]">Quantité : {item.quantity}</p>
                </div>
                <span className="font-serif text-gray-900">
                  {(item.product.price * item.quantity).toLocaleString('fr-FR')} F
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-2.5 text-xs">
            {discountAmount > 0 && (
              <div className="flex justify-between text-gray-500 font-light">
                <span>Remise Privilège :</span>
                <span>- {discountAmount.toLocaleString('fr-FR')} FCFA</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm font-medium pt-2 border-t border-dashed border-gray-100">
              <span className="uppercase tracking-widest text-gray-800">Total à payer :</span>
              <span className="font-serif text-base font-semibold text-[#1A1A1A]">
                {totalPrice.toLocaleString('fr-FR')} FCFA
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#1A1A1A] text-[#FAF9F6] p-6 text-center space-y-2">
          <p className="font-serif italic text-sm text-[#D4AF37]">Maison Awhiska</p>
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/70 leading-relaxed">
            Chaque commande est traitée avec le plus grand soin. Notre service logistique vous contactera dès réception de votre message WhatsApp.
          </p>
        </div>
      </div>

    </div>
  );
}