import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { products } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  if (favoriteProducts.length === 0) {
    return (
      <div className="container-main py-20 text-center">
        <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold mb-2">No favorites yet</h1>
        <p className="text-muted-foreground mb-6">Start adding products to your favorites!</p>
        <Button asChild><Link to="/">Browse Products</Link></Button>
      </div>
    );
  }

  return (
    <div className="container-main py-6 sm:py-10">
      <h1 className="text-2xl font-bold text-foreground mb-6">My Favorites</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {favoriteProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;