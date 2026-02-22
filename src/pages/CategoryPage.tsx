import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Search, X, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { categories, products, BadgeType } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const flagFilters: { key: BadgeType; label: string }[] = [
  { key: "bestseller", label: "Best Seller" },
  { key: "featured", label: "Featured" },
  { key: "new", label: "New Product" },
  { key: "discount", label: "Discount Available" },
  { key: "great-deals", label: "Great Deals" },
];

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find(c => c.slug === slug);
  const [selectedSubs, setSelectedSubs] = useState<string[]>([]);
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const toggleSub = (sub: string) =>
    setSelectedSubs(prev => prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]);
  const toggleFlag = (flag: string) =>
    setSelectedFlags(prev => prev.includes(flag) ? prev.filter(f => f !== flag) : [...prev, flag]);

  // Visible subcategories (filter out hidden ones like Fast Food)
  const visibleSubcategories = category?.subcategories.filter(s => !s.hidden) || [];

  const filtered = useMemo(() => {
    if (!category) return [];
    return products.filter(p => {
      if (p.categoryId !== category.id) return false;
      if (selectedSubs.length && !selectedSubs.includes(p.subcategory)) return false;
      if (selectedFlags.length && !selectedFlags.some(f => p.badges.includes(f as BadgeType))) return false;
      if (search.length >= 2 && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [category, selectedSubs, selectedFlags, search]);

  if (!category) {
    return (
      <div className="container-main py-20 text-center">
        <h1 className="text-2xl font-semibold">Category not found</h1>
        <Link to="/" className="text-primary mt-4 inline-block">Go home</Link>
      </div>
    );
  }

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Subcategories</h3>
        <div className="space-y-2">
          {visibleSubcategories.map(sub => (
            <label key={sub.name} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Checkbox checked={selectedSubs.includes(sub.name)} onCheckedChange={() => toggleSub(sub.name)} />
              {sub.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Filters</h3>
        <div className="space-y-2">
          {flagFilters.map(f => (
            <label key={f.key} className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Checkbox checked={selectedFlags.includes(f.key)} onCheckedChange={() => toggleFlag(f.key)} />
              {f.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-main py-6 sm:py-8">
      {/* Banner */}
      <div className="relative h-40 sm:h-48 rounded-xl overflow-hidden mb-6">
        <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent flex items-center">
          <div className="px-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary">{category.name}</h1>
            <p className="text-secondary/80 text-sm mt-1">{filtered.length} products available</p>
          </div>
        </div>
      </div>

      {/* Selected chips */}
      {(selectedSubs.length > 0 || selectedFlags.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedSubs.map(s => (
            <Badge key={s} variant="secondary" className="cursor-pointer gap-1" onClick={() => toggleSub(s)}>
              {s} <X className="h-3 w-3" />
            </Badge>
          ))}
          {selectedFlags.map(f => (
            <Badge key={f} variant="secondary" className="cursor-pointer gap-1" onClick={() => toggleFlag(f)}>
              {flagFilters.find(ff => ff.key === f)?.label} <X className="h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}

      <div className="flex gap-8">
        {/* Desktop filters */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <FilterPanel />
          </div>
        </aside>

        {/* Mobile filter button */}
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 bg-card shadow-lg"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" className="shrink-0 shadow-lg">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
              <div className="mt-6"><FilterPanel /></div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">No products match your filters.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
