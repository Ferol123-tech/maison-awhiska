export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white/70 pt-20 pb-12 px-6 sm:px-16 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Grille principale */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-16 border-b border-white/10">
          
          {/* Colonne 1 : Identité */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl tracking-[0.3em] uppercase text-white font-light">
              Maison Awhiska
            </h3>
            <p className="text-xs text-white/50 font-light max-w-sm leading-relaxed tracking-wide">
              L'art de sculpter l'éclat et de révéler votre propre lumière à travers des pièces d'exception uniques et intemporelles.
            </p>
          </div>

          {/* Colonne 2 : Contact & Réseaux réels */}
          <div className="space-y-5">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Contact & Éclat
            </h4>
            <div className="space-y-3 text-xs font-light tracking-wide">
              {/* Téléphone officiel */}
              <a href="tel:+2250779598809" className="flex items-center gap-3 hover:text-white transition-colors group">
                <svg className="w-3.5 h-3.5 text-white/40 group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 0 1-7.108-7.108c-.145-.44.02-.927.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.75Z"/>
                </svg>
                <span className="tracking-widest">+225 07 79 59 88 09</span>
              </a>

              {/* Réseaux Sociaux officiels */}
              <div className="flex items-center gap-6 pt-3">
                {/* Instagram Maison Awhiska */}
                <a href="https://www.instagram.com/maisonawhiska/" target="_blank" rel="noopener noreferrer" className="group" aria-label="Instagram">
                  <svg className="w-5 h-5 text-white/50 group-hover:text-[#D4AF37] transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>

                {/* TikTok Maison Awhiska */}
                <a href="https://www.tiktok.com/@maisonawhiska?_r=1&_t=ZS-97wyLxlDm7u" target="_blank" rel="noopener noreferrer" className="group" aria-label="TikTok">
                  <svg className="w-5 h-5 text-white/50 group-hover:text-[#D4AF37] transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Colonne 3 : Newsletter */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Le Carnet Privé
            </h4>
            <p className="text-xs text-white/50 font-light">Soyez informé de nos lancements confidentiels.</p>
            <form className="flex border-b border-white/20 pb-1">
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="bg-transparent text-xs w-full focus:outline-none placeholder-white/30 text-white font-light"
              />
              <button type="submit" className="text-white/60 hover:text-[#D4AF37] transition-colors text-xs uppercase tracking-widest pl-2">
                S'inscrire
              </button>
            </form>
          </div>

        </div>

        {/* Pied / Mentions */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.2em] text-white/40 font-light">
          <p>© {new Date().getFullYear()} Maison Awhiska. Éclat, Authenticité & Excellence.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
          </div>
        </div>

      </div>
    </footer>
  );
}