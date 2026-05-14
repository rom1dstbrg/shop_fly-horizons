import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-dk border-t border-border mt-auto">
      <div className="container-shop py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-border">

          <div className="space-y-3">
            <Link href="/">
              <Image
                src="/header-shop-white.png"
                alt="Fly Horizons Shop"
                width={160}
                height={36}
                className="block h-8 w-auto object-contain"
                unoptimized
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Accessoires aviation premium pour les passionnes du ciel.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-foreground/50 uppercase tracking-widest">
              Boutique
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Mon panier
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Mes commandes
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-foreground/50 uppercase tracking-widest">
              Informations
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/account" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Mon compte
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Conditions générales de vente
                </Link>
              </li>
              <li>
                <Link href="https://fly-horizons.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  fly-horizons.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            {year} Fly Horizons Shop. Tous droits reserves.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">Paiement securise</span>
            <span className="text-xs text-primary font-medium ml-1">Stripe</span>
          </div>
        </div>

      </div>
    </footer>
  );
}