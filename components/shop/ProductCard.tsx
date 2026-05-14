import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/database";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images?.[0]?.url ?? null;
  const isOutOfStock = product.stock === 0;

  return (
    <Link href={`/product/${product.slug}`} className="group flex h-full">
      <div className="card-premium overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-premium-lg hover:-translate-y-1 flex flex-col w-full">

        {/* Image — hauteur fixe via aspect-ratio */}
        <div className="relative aspect-square bg-muted overflow-hidden shrink-0">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Aucune image</span>
            </div>
          )}

          {/* Badge stock */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
              <span className="bg-card text-muted-foreground text-xs font-medium px-3 py-1 rounded-full border border-border">
                Rupture de stock
              </span>
            </div>
          )}

          {/* Badge featured */}
          {product.featured && !isOutOfStock && (
            <div className="absolute top-2 left-2">
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
                Populaire
              </span>
            </div>
          )}
        </div>

        {/* Infos — flex column qui occupe le reste */}
        <div className="p-4 flex flex-col flex-1">

          {/* Titre — max 2 lignes */}
          <h3 className="font-semibold text-foreground text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {product.title}
          </h3>

          {/* Description — toujours présente, max 2 lignes, hauteur fixe */}
          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {product.short_description ?? ""}
          </p>

          {/* Prix + tag — collé en bas */}
          <div className="flex items-center justify-between mt-auto pt-3">
            <span className="text-primary font-bold text-base">
              {formatPrice(product.price)}
            </span>

            {product.tags.length > 0 && (
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                {product.tags[0]}
              </span>
            )}
          </div>
        </div>

      </div>
    </Link>
  );
}
