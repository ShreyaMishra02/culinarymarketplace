import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-secondary mt-16">
    <div className="container-main py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-3">Company</h4>
          <ul className="space-y-2">
            <li><Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
            <li><Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-3">Legal</h4>
          <ul className="space-y-2">
            <li><Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
            <li><Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-3">Categories</h4>
          <ul className="space-y-2">
            <li><Link to="/category/beverages" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Beverages</Link></li>
            <li><Link to="/category/restaurants" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Restaurants</Link></li>
            <li><Link to="/category/meal-kits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Meal Kits</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-3">Contact</h4>
          <p className="text-sm text-muted-foreground">support@culinarymarket.com</p>
          <p className="text-sm text-muted-foreground mt-1">1-800-CULINARY</p>
        </div>
      </div>
      <div className="border-t mt-8 pt-6 text-center">
        <p className="text-xs text-muted-foreground">© 2026 Culinary Marketplace. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
