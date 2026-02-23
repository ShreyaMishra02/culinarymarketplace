import { Link } from "react-router-dom";
import { ArrowRight, Utensils, Truck, ChefHat, Gift, Wine } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { categories, products, deliveryApps } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import heroBanner from "@/assets/hero-banner-new.jpg";

const visibleCategories = categories.filter(c => !c.hidden);
const restaurantProducts = products.filter(p => p.categoryId === "restaurants").slice(0, 6);

const shortcuts = [
  { label: "Beverages", icon: Wine, slug: "beverages" },
  { label: "Restaurants", icon: Utensils, slug: "restaurants" },
  { label: "Order In", icon: Truck, slug: "order-in" },
  { label: "Meal Kits", icon: ChefHat, slug: "meal-kits" },
  { label: "Goodies", icon: Gift, slug: "goodies" },
];

const Index = () => {
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[420px] sm:h-[480px] lg:h-[540px] overflow-hidden">
        <img src={heroBanner} alt="Culinary hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="bg-secondary/95 backdrop-blur-sm rounded-[20px] shadow-xl max-w-[900px] w-full py-8 sm:py-10 px-6 sm:px-10 text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground leading-tight">
              Reward yourself with the joy of food and dining
            </h1>
            {/* Quick Category Shortcuts */}
            <div className="flex items-center justify-center gap-3 sm:gap-5 mt-6 overflow-x-auto scrollbar-hide pb-1">
              {shortcuts.map(s => (
                <Link
                  key={s.slug}
                  to={`/category/${s.slug}`}
                  className="group flex flex-col items-center gap-2 min-w-[80px] sm:min-w-[100px] p-3 sm:p-4 rounded-2xl border border-border bg-secondary hover:border-primary hover:shadow-md transition-all duration-200"
                >
                  <s.icon className="h-6 w-6 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-foreground text-center leading-tight">{s.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Order In with delivery apps */}
      <section className="container-main py-10 sm:py-14">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Order in with your favorite delivery app</h2>
          <div className="h-px bg-border mt-3" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {deliveryApps.map(app => (
            <div key={app.id} className="group bg-card rounded-xl border overflow-hidden card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="aspect-video overflow-hidden">
                <img src={app.image} alt={app.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-3 sm:p-4 text-center">
                <p className="font-semibold text-sm sm:text-base text-foreground">{app.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Restaurants */}
      <section className="container-main pb-10 sm:pb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Popular Restaurants</h2>
          <Link to="/category/restaurants" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {restaurantProducts.map(p => (
            <div key={p.id} className="min-w-[200px] sm:min-w-[220px] max-w-[240px] shrink-0">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Browse Categories */}
      <section className="container-main pb-12 sm:pb-16">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {visibleCategories.map(c => (
            <Link
              key={c.id}
              to={`/category/${c.slug}`}
              className="group block relative overflow-hidden rounded-xl aspect-[4/3] card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
            >
              <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold text-secondary">{c.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sticky bottom View Cart on mobile */}
      {totalItems > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-secondary border-t p-3">
          <Link
            to="/cart"
            className="flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-primary text-primary-foreground font-medium text-sm"
          >
            View Cart ({totalItems} items)
          </Link>
        </div>
      )}
    </div>
  );
};

export default Index;
