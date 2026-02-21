import { Link } from "react-router-dom";
import { Product } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const badgeLabels: Record<string, { label: string; className: string }> = {
  top: { label: "Top Product", className: "bg-primary text-primary-foreground" },
  new: { label: "New", className: "bg-success text-success-foreground" },
  discount: { label: "Discount", className: "bg-destructive text-destructive-foreground" },
  bestselling: { label: "Best Selling", className: "bg-foreground text-background" },
};

const ProductCard = ({ product }: { product: Product }) => (
  <Link
    to={`/product/${product.id}`}
    className="group block bg-card rounded-lg border overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
  >
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
      <p className="text-primary font-semibold mt-2">{product.points.toLocaleString()} pts</p>
    </div>
  </Link>
);

export default ProductCard;
