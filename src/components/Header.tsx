import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, HelpCircle, ClipboardList, Star, Menu, X, Heart, MapPin, LogOut, Globe, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useAddress } from "@/context/AddressContext";
import { categories } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import logo from "@/assets/logo.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, userPoints } = useCart();
  const { favorites } = useFavorites();
  const { address, isAddressSaved } = useAddress();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const visibleCategories = categories.filter(c => !c.hidden);

  const addressDisplay = isAddressSaved && address
    ? `${address.address1}, ${address.city}, ${address.state} ${address.zip}`
    : null;

  return (
    <>
      {/* Main header */}
      <header
        className={`sticky top-0 z-50 border-b bg-secondary transition-all duration-200 ${
          scrolled ? "py-1.5" : "py-3"
        }`}
      >
        <div className="container-main flex items-center justify-between">
          {/* Left: Logo + Address */}
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" className="flex items-center shrink-0 pl-0">
              <img
                src={logo}
                alt="BI Worldwide Culinary Marketplace"
                className={`transition-all duration-200 ${scrolled ? "h-10" : "h-12"} md:h-14 w-auto`}
              />
            </Link>
            {addressDisplay && (
              <div className="hidden md:flex items-center gap-1.5 text-sm text-foreground max-w-[220px]">
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="truncate font-medium">{addressDisplay}</span>
              </div>
            )}
          </div>

          {/* Center: Nav (desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {visibleCategories.map(c => (
              <Link
                key={c.slug}
                to={`/category/${c.slug}`}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === `/category/${c.slug}`
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language selector */}
            <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
              <Globe className="h-3.5 w-3.5" />
              <span>EN</span>
              <ChevronDown className="h-3 w-3" />
            </div>

            <span className="hidden sm:inline text-sm font-medium text-foreground">John</span>

            <Link to="#" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <Star className="h-4 w-4 text-primary" />
              <span>{userPoints.toLocaleString()} pts</span>
            </Link>

            <Link to="/favorites" className="relative p-2 rounded-md hover:bg-accent transition-colors hidden sm:flex">
              <Heart className="h-4 w-4 text-muted-foreground" />
              {favorites.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[9px] bg-destructive text-destructive-foreground border-2 border-secondary">
                  {favorites.length}
                </Badge>
              )}
            </Link>

            <Link to="/order-history" className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ClipboardList className="h-4 w-4" />
              <span className="hidden md:inline">Orders</span>
            </Link>

            <Link to="/help" className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden md:inline">Help</span>
            </Link>

            {/* Cart - only visible when items > 0 */}
            {totalItems > 0 && (
              <Link to="/cart" className="relative p-2 rounded-md hover:bg-accent transition-colors animate-fade-in">
                <ShoppingCart className="h-5 w-5 text-foreground" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground border-2 border-secondary">
                  {totalItems}
                </Badge>
              </Link>
            )}

            <button className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Logout</span>
            </button>

            <button
              className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t bg-secondary animate-fade-in">
            <div className="container-main py-3 space-y-1">
              {addressDisplay && (
                <div className="flex items-center gap-2 px-3 py-2.5 text-sm text-foreground md:hidden">
                  <MapPin className="h-4 w-4 text-primary" /> {addressDisplay}
                </div>
              )}
              {visibleCategories.map(c => (
                <Link
                  key={c.slug}
                  to={`/category/${c.slug}`}
                  className="block px-3 py-2.5 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  {c.name}
                </Link>
              ))}
              <div className="border-t pt-2 mt-2 space-y-1">
                <Link to="/favorites" className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground">
                  <Heart className="h-4 w-4" /> Favorites {favorites.length > 0 && `(${favorites.length})`}
                </Link>
                <Link to="/order-history" className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground">
                  <ClipboardList className="h-4 w-4" /> Order History
                </Link>
                <Link to="/help" className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground">
                  <HelpCircle className="h-4 w-4" /> Help Center
                </Link>
                {totalItems > 0 && (
                  <Link to="/cart" className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground">
                    <ShoppingCart className="h-4 w-4" /> Cart ({totalItems})
                  </Link>
                )}
                <div className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-primary" /> {userPoints.toLocaleString()} points
                </div>
                <button className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground w-full">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Address indicator strip - only show when address is saved */}
      {isAddressSaved && address && (
        <div className="bg-[hsl(217,100%,95%)] border-b border-[hsl(217,100%,85%)]">
          <div className="container-main flex items-center justify-between h-10">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="text-primary font-medium">Selected Address:</span>
              <span className="text-primary">{address.address1}</span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-sm text-muted-foreground/60 cursor-not-allowed">
                  Change
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-[240px] text-xs">Address cannot be changed once selected because it determines pricing and availability.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}

      {/* Sticky category navigation bar */}
      {(location.pathname === "/" || location.pathname.startsWith("/category")) && (
        <div className={`sticky z-40 border-b bg-secondary/95 backdrop-blur-sm transition-all duration-200 ${scrolled ? "top-[52px]" : "top-[64px]"}`}>
          <div className="container-main">
            <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
              {visibleCategories.map(c => (
                <Link
                  key={c.slug}
                  to={`/category/${c.slug}`}
                  className={`shrink-0 px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    location.pathname === `/category/${c.slug}`
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
