import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ShopProvider } from './context/CartContext'; 
import Navbar from './components/Navbar'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Maison Awhiska',
  description: 'Haute Bijouterie & Créations d’Exception',
};

// --- COMPOSANT FOOTER INTÉGRÉ DIRECTEMENT POUR PLUS DE SÉCURITÉ ---
function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white/80 py-12 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="space-y-3">
          <p className="font-serif text-lg tracking-[0.2em] text-[#D4AF37]">MAISON AWHISKA</p>
          <p className="text-[10px] uppercase tracking-widest text-white/50 leading-relaxed">
            Haute bijouterie née à Abidjan, inspirée par le monde. Des pièces d'exceptions façonnées pour sublimer votre éclat quotidien.
          </p>
        </div>
        <div className="space-y-2 text-xs">
          <p className="font-serif text-[#D4AF37] uppercase tracking-widest text-[11px] mb-2">Service Client</p>
          <p className="font-light">WhatsApp : +225 07 79 59 88 09</p>
          <p className="font-light">Livraison sécurisée & certifiée</p>
        </div>
        <div className="space-y-2 text-xs">
          <p className="font-serif text-[#D4AF37] uppercase tracking-widest text-[11px] mb-2">Horaires & Ateliers</p>
          <p className="font-light text-white/60">Lundi — Samedi : 09h00 - 19h00</p>
          <p className="font-light text-white/40">© {new Date().getFullYear()} Maison Awhiska. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} bg-[#FAF9F6] text-[#1A1A1A] min-h-screen flex flex-col justify-between`}>
        
        <ShopProvider>
          
          <Navbar />
          
          <main className="flex-grow">
            {children}
          </main>
          
          {/* Ajout du pied de page élégant */}
          <Footer />
          
        </ShopProvider>

      </body>
    </html>
  );
}