import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Product } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/context/FavoritesContext";

const badgeLabels: Record<string, { label: string; className: string }> = {
  top: { label: "Top Product", className: "bg-primary text-primary-foreground" },
  new: { label: "New", className: "bg-success text-success-foreground" },
  discount: { label: "Discount", className: "bg-destructive text-destructive-foreground" },
  bestselling: { label: "Best Selling", className: "bg-foreground text-background" },
};

const ProductCard = ({ product }: { product: Product }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const displayPoints = product.options && product.options.length > 0
    ? Math.min(...product.options.map(o => o.points))
    : product.points;
  const hasOptions = product.options && product.options.length > 0;

  return (
    <div className="group relative block bg-card rounded-lg border overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1">
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(product.id); }}
        className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
      >
        <Heart className={`h-4 w-4 ${isFavorite(product.id) ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
      </button>
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {product.badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              {product.badges.map(b => (
                <Badge key={b} className={`text-[10px] px-1.5 py-0.5 ${badgeLabels[b].className}`}>
                  {badgeLabels[b].label}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div className="p-3 sm:p-4">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{product.brand}</p>
          <h3 className="text-sm font-medium text-card-foreground mt-1 line-clamp-2 leading-snug">{product.name}</h3>
          <p className="text-primary font-semibold mt-2">
            {hasOptions ? `From ${displayPoints.toLocaleString()} pts` : `${displayPoints.toLocaleString()} pts`}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;