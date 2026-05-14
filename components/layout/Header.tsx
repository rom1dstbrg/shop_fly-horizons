"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { CartCount } from "@/components/shop/CartCount";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => setUser(session?.user ?? null)
    );

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navLinkClass =
    "px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground rounded-lg hover:bg-secondary transition-colors";

  const iconLinkClass =
    "p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-secondary transition-colors";

  return (
    <header
      className={`fixed top-3.5 inset-x-4 mx-auto max-w-[1300px] z-50 rounded-2xl bg-card border border-border transition-shadow duration-300 ${
        scrolled ? "shadow-premium-lg" : "shadow-premium"
      }`}
    >
      <div className="px-5 sm:px-6">
        <div className="flex items-center h-[60px]">

          {/* Logo — gauche */}
          <Link href="/" className="shrink-0 flex items-center leading-none">
            <Image
              src="/logo-header-mobile.png"
              alt="Fly Horizons Shop"
              width={40}
              height={40}
              className="block md:hidden h-8 w-auto object-contain"
              priority
              unoptimized
            />
            <Image
              src="/header-shop.png"
              alt="Fly Horizons Shop"
              width={160}
              height={36}
              className="hidden md:block h-8 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Tout à droite */}
          <div className="flex items-center gap-1">

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-1 mr-3">
              <Link href="/" className={navLinkClass}>
                Accueil
              </Link>
              <Link href="/shop" className={navLinkClass}>
                Produits
              </Link>
            </nav>

            {/* CTA Réserver — desktop */}
            <a
              href="https://fly-horizons.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-[10px] text-sm font-semibold transition-all hover:bg-[#e6a800] hover:-translate-y-px shadow-gold-sm"
            >
              Réserver un vol
            </a>

            {/* Séparateur vertical — desktop */}
            <div className="hidden md:block w-px h-5 bg-border mx-3" />

            {/* Compte */}
            <Link
              href={user ? "/account" : "/login"}
              className={iconLinkClass}
              aria-label="Mon compte"
            >
              <User size={19} />
            </Link>

            {/* Panier */}
            <Link
              href="/cart"
              className={`relative ${iconLinkClass}`}
              aria-label="Panier"
            >
              <ShoppingBag size={19} />
              <CartCount />
            </Link>

            {/* Burger — mobile */}
            <button
              className={`md:hidden ${iconLinkClass}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-border rounded-b-2xl overflow-hidden bg-card">
          <nav className="px-5 py-4 flex flex-col gap-1">
            <Link
              href="/"
              className="text-sm font-medium text-foreground/80 hover:text-foreground px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/shop"
              className="text-sm font-medium text-foreground/80 hover:text-foreground px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Produits
            </Link>
            <Link
              href={user ? "/account" : "/login"}
              className="text-sm font-medium text-foreground/80 hover:text-foreground px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {user ? "Mon compte" : "Connexion"}
            </Link>

            <div className="pt-2 mt-1 border-t border-border">
              <a
                href="https://fly-horizons.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-[10px] text-sm font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                Réserver un vol
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
