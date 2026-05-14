import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { FeaturedProducts } from "@/components/shop/FeaturedProducts";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*, images:product_images(*)")
    .eq("active", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <main className="bg-background pb-16">

      {/* ── Hero card ── */}
      <div className="px-4 sm:px-8 lg:px-[50px] pt-[98px]">
        <div className="mx-auto max-w-[2000px] rounded-[28px] overflow-hidden bg-[#0b2238] h-[calc(100dvh-98px)] min-h-0 lg:h-auto lg:min-h-[640px] grid grid-cols-1 lg:grid-cols-2">

          {/* Gauche — texte */}
          <div className="flex flex-col justify-center pl-10 pr-6 py-14 sm:pl-16 lg:pl-28 xl:pl-40 lg:py-24 relative z-10">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-start bg-[#F2B705]/15 border border-[#F2B705]/30 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F2B705]" />
              <span className="text-[#F2B705] text-xs font-semibold tracking-[2px] uppercase">
                Boutique officielle
              </span>
            </div>

            {/* Titre */}
            <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-bold text-white leading-[1.05] tracking-tight mb-6">
              Fly<br />
              <span className="text-[#F2B705]">Horizons</span>
            </h1>

            {/* Sous-titre */}
            <p className="text-white/55 text-base sm:text-lg leading-relaxed max-w-sm mb-10">
              Accessoires aviation premium pour les passionnés du ciel.
            </p>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F2B705] text-[#113356] rounded-[10px] font-semibold text-sm hover:bg-[#e6a800] transition-all shadow-[0_6px_24px_rgba(242,183,5,.3)] hover:-translate-y-px"
              >
                <ShoppingBag size={16} />
                Explorer la boutique
              </Link>

              <a
                href="#produits"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-white border border-white/25 rounded-[10px] font-semibold text-sm hover:bg-white/10 hover:border-white/50 transition-all"
              >
                Notre sélection
              </a>
            </div>
          </div>

          {/* Droite — image */}
          <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-0">
            <Image
              src="/piste.jpg"
              alt="Piste aviation Fly Horizons"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 700px"
            />

            {/* Overlay desktop : gauche → droite (blend avec zone texte) */}
            <div
              className="absolute inset-0 hidden lg:block"
              style={{
                background:
                  "linear-gradient(to right, #0b2238 0%, rgba(11,34,56,.5) 28%, transparent 62%)",
              }}
            />

            {/* Overlay mobile : haut → bas (transition texte au-dessus → image dessous) */}
            <div
              className="absolute inset-0 lg:hidden"
              style={{
                background:
                  "linear-gradient(to bottom, #0b2238 0%, rgba(11,34,56,.35) 40%, transparent 78%)",
              }}
            />
          </div>

        </div>
      </div>

      {/* ── Produits populaires ── */}
      <div id="produits">
        <FeaturedProducts products={products ?? []} />
      </div>

    </main>
  );
}
