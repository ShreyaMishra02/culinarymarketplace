import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, HelpCircle, ClipboardList, LogOut, Star, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, userPoints } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const navItems = categories.slice(0, 5).map(c => ({
    label: c.name,
    href: `/category/${c.slug}`,
  }));

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-secondary transition-all duration-200 ${
        scrolled ? "py-2" : "py-3"
      }`}
    >
      <div className="container-main flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg text-foreground shrink-0">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">CM</span>
          </div>
          <span className="hidden sm:inline">Culinary Market</span>
        </Link>

        {/* Center: Nav (desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              to={item.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === item.href
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="#" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Star className="h-4 w-4 text-primary" />
            <span>{userPoints.toLocaleString()} pts</span>
          </Link>

          <Link to="/order-history" className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ClipboardList className="h-4 w-4" />
            <span className="hidden md:inline">Orders</span>
          </Link>

          <Link to="/help" className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden md:inline">Help</span>
          </Link>

          <Link to="/cart" className="relative p-2 rounded-md hover:bg-accent transition-colors">
            <ShoppingCart className="h-5 w-5 text-foreground" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground border-2 border-secondary">
                {totalItems}
              </Badge>
            )}
          </Link>

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
            {navItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-3 py-2.5 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t pt-2 mt-2 space-y-1">
              <Link to="/order-history" className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground">
                <ClipboardList className="h-4 w-4" /> Order History
              </Link>
              <Link to="/help" className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground">
                <HelpCircle className="h-4 w-4" /> Help Center
              </Link>
              <div className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-primary" /> {userPoints.toLocaleString()} points
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
