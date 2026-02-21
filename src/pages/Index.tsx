import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/data/mockData";
import heroBanner from "@/assets/hero-banner.jpg";

const visibleCategories = categories.filter(c => !c.hidden);
const popularProducts = products.filter(p => p.badges.includes("top")).slice(0, 6);

const Index = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="relative h-[420px] sm:h-[480px] lg:h-[540px] overflow-hidden">
      <img src={heroBanner} alt="Culinary hero" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      <div className="absolute inset-0 flex items-center">
        <div className="container-main">
          <div className="max-w-lg animate-fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary leading-tight">
              Discover amazing culinary experiences
            </h1>
            <p className="mt-4 text-secondary/80 text-base sm:text-lg leading-relaxed">
              Redeem your points for meals, treats, and unforgettable food moments.
            </p>
            <Button asChild className="mt-6 h-11 px-6 rounded-lg text-sm font-medium">
              <Link to="/category/beverages">
                Explore Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Categories */}
    <section className="container-main py-12 sm:py-16">
      <h2 className="text-2xl font-semibold text-foreground mb-6">Browse Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {visibleCategories.map(c => (
          <CategoryCard key={c.id} category={c} />
        ))}
      </div>
    </section>

    {/* Popular Products */}
    <section className="container-main pb-12 sm:pb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Popular Products</h2>
        <Link to="/category/beverages" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {popularProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  </div>
);

export default Index;