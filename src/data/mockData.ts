import catBeverages from "@/assets/cat-beverages.jpg";
import catRestaurants from "@/assets/cat-restaurants.jpg";
import catMealkits from "@/assets/cat-mealkits.jpg";
import catOrderin from "@/assets/cat-orderin.jpg";
import catGoodies from "@/assets/cat-goodies.jpg";
import catGrocery from "@/assets/cat-grocery.jpg";

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  subcategories: string[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  categoryId: string;
  subcategory: string;
  points: number;
  image: string;
  description: string;
  productCode: string;
  modelNumber?: string;
  deliveryInfo: string;
  cancellationPolicy: string;
  badges: ("top" | "new" | "discount" | "bestselling")[];
  alert?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  products: { name: string; quantity: number }[];
  totalPoints: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

export const categories: Category[] = [
  { id: "beverages", name: "Beverages", slug: "beverages", image: catBeverages, subcategories: ["Coffee", "Tea", "Juices", "Smoothies", "Cocktail Kits"] },
  { id: "restaurants", name: "Restaurants", slug: "restaurants", image: catRestaurants, subcategories: ["Fine Dining", "Casual Dining", "Fast Casual", "Steakhouses", "Seafood"] },
  { id: "meal-kits", name: "Meal Kits", slug: "meal-kits", image: catMealkits, subcategories: ["Family Meals", "Single Servings", "Vegetarian", "International", "Quick & Easy"] },
  { id: "order-in", name: "Order In", slug: "order-in", image: catOrderin, subcategories: ["Pizza", "Asian", "Mexican", "Italian", "Healthy"] },
  { id: "goodies", name: "Goodies", slug: "goodies", image: catGoodies, subcategories: ["Chocolates", "Cookies", "Gift Boxes", "Candy", "Pastries"] },
  { id: "grocery", name: "Grocery", slug: "grocery", image: catGrocery, subcategories: ["Fresh Produce", "Dairy", "Bakery", "Pantry", "Organic"] },
];

export const products: Product[] = [
  // Beverages
  { id: "bev-1", name: "Premium Cold Brew Collection", brand: "Artisan Coffee Co.", categoryId: "beverages", subcategory: "Coffee", points: 2500, image: catBeverages, description: "A curated set of 6 premium cold brew bottles with unique flavor profiles.", productCode: "BIW-1001", deliveryInfo: "Ships within 3-5 business days", cancellationPolicy: "Free cancellation within 24 hours", badges: ["top", "bestselling"] },
  { id: "bev-2", name: "Organic Matcha Tea Set", brand: "ZenLeaf", categoryId: "beverages", subcategory: "Tea", points: 1800, image: catBeverages, description: "Ceremonial-grade matcha with bamboo whisk and bowl.", productCode: "BIW-1002", deliveryInfo: "Ships within 2-4 business days", cancellationPolicy: "Free cancellation within 24 hours", badges: ["new"] },
  { id: "bev-3", name: "Fresh Juice Cleanse Pack", brand: "VitaPress", categoryId: "beverages", subcategory: "Juices", points: 3200, image: catBeverages, description: "5-day juice cleanse with 15 cold-pressed bottles.", productCode: "BIW-1003", deliveryInfo: "Ships within 1-2 business days", cancellationPolicy: "Non-refundable", badges: ["discount"], alert: "Perishable item – delivery days may be limited." },
  // Restaurants
  { id: "rest-1", name: "$100 Fine Dining Experience", brand: "Le Gourmet", categoryId: "restaurants", subcategory: "Fine Dining", points: 5000, image: catRestaurants, description: "An unforgettable multi-course dining experience.", productCode: "BIW-2001", deliveryInfo: "E-voucher delivered via email", cancellationPolicy: "72 hours cancellation policy", badges: ["top"] },
  { id: "rest-2", name: "Steakhouse Gift Card $50", brand: "Prime Cuts", categoryId: "restaurants", subcategory: "Steakhouses", points: 2800, image: catRestaurants, description: "Gift card redeemable at all Prime Cuts locations.", productCode: "BIW-2002", deliveryInfo: "E-voucher delivered via email", cancellationPolicy: "No cancellation after purchase", badges: ["bestselling"] },
  // Meal Kits
  { id: "mk-1", name: "Italian Date Night Kit", brand: "Chef's Table", categoryId: "meal-kits", subcategory: "International", points: 3500, image: catMealkits, description: "Everything you need for a romantic Italian dinner for two.", productCode: "BIW-3001", deliveryInfo: "Ships within 2-3 business days", cancellationPolicy: "Free cancellation within 24 hours", badges: ["top", "new"] },
  { id: "mk-2", name: "Veggie Power Box", brand: "GreenChef", categoryId: "meal-kits", subcategory: "Vegetarian", points: 2200, image: catMealkits, description: "3 complete vegetarian meals with fresh ingredients.", productCode: "BIW-3002", deliveryInfo: "Ships within 2-3 business days", cancellationPolicy: "Free cancellation within 24 hours", badges: ["new"] },
  // Order In
  { id: "oi-1", name: "Family Pizza Night Bundle", brand: "Napoli Express", categoryId: "order-in", subcategory: "Pizza", points: 2000, image: catOrderin, description: "2 large pizzas, garlic bread, and a dessert.", productCode: "BIW-4001", deliveryInfo: "Same-day delivery", cancellationPolicy: "Free cancellation up to 1 hour before delivery", badges: ["bestselling"] },
  { id: "oi-2", name: "Sushi Platter for 4", brand: "Sakura Kitchen", categoryId: "order-in", subcategory: "Asian", points: 4500, image: catOrderin, description: "48-piece premium sushi platter with miso soup.", productCode: "BIW-4002", deliveryInfo: "Same-day delivery", cancellationPolicy: "Free cancellation up to 2 hours before delivery", badges: ["top", "discount"] },
  // Goodies
  { id: "good-1", name: "Luxury Chocolate Gift Box", brand: "CocoaCraft", categoryId: "goodies", subcategory: "Chocolates", points: 3000, image: catGoodies, description: "24 handcrafted artisan chocolates in a premium box.", productCode: "BIW-5001", deliveryInfo: "Ships within 3-5 business days", cancellationPolicy: "Free cancellation within 24 hours", badges: ["top", "bestselling"] },
  { id: "good-2", name: "Artisan Cookie Collection", brand: "BakeHouse", categoryId: "goodies", subcategory: "Cookies", points: 1500, image: catGoodies, description: "12 gourmet cookies in assorted flavors.", productCode: "BIW-5002", deliveryInfo: "Ships within 2-4 business days", cancellationPolicy: "Free cancellation within 24 hours", badges: ["new"] },
  // Grocery
  { id: "groc-1", name: "Organic Produce Box", brand: "FarmFresh", categoryId: "grocery", subcategory: "Fresh Produce", points: 2800, image: catGrocery, description: "Weekly box of seasonal organic fruits and vegetables.", productCode: "BIW-6001", deliveryInfo: "Ships within 1-2 business days", cancellationPolicy: "Free cancellation within 12 hours", badges: ["top"] },
  { id: "groc-2", name: "Artisan Bakery Bundle", brand: "Golden Crust", categoryId: "grocery", subcategory: "Bakery", points: 1200, image: catGrocery, description: "Sourdough loaf, croissants, and baguette.", productCode: "BIW-6002", deliveryInfo: "Ships within 1-2 business days", cancellationPolicy: "Non-refundable", badges: ["new", "discount"] },
];

export const sampleOrders: Order[] = [
  { id: "ORD-10234", date: "2026-02-15", products: [{ name: "Premium Cold Brew Collection", quantity: 1 }, { name: "Luxury Chocolate Gift Box", quantity: 2 }], totalPoints: 8500, status: "Delivered" },
  { id: "ORD-10189", date: "2026-02-08", products: [{ name: "Italian Date Night Kit", quantity: 1 }], totalPoints: 3500, status: "Shipped" },
  { id: "ORD-10145", date: "2026-01-28", products: [{ name: "Sushi Platter for 4", quantity: 1 }, { name: "Organic Matcha Tea Set", quantity: 1 }], totalPoints: 6300, status: "Processing" },
  { id: "ORD-10098", date: "2026-01-15", products: [{ name: "Family Pizza Night Bundle", quantity: 2 }], totalPoints: 4000, status: "Delivered" },
];

export const faqs = [
  { question: "How do I redeem my points?", answer: "Browse our marketplace, add items to your cart, and complete checkout. Points will be deducted from your balance automatically." },
  { question: "What is the delivery timeframe?", answer: "Delivery times vary by product. Most physical items ship within 2-5 business days. E-vouchers are delivered instantly via email." },
  { question: "Can I cancel my order?", answer: "Cancellation policies vary by product. Check the product detail page for specific cancellation terms. Most orders can be cancelled within 24 hours." },
  { question: "How do I check my points balance?", answer: "Your current points balance is displayed in the header next to your name. Click on it for a detailed breakdown." },
  { question: "What if my order arrives damaged?", answer: "Contact our support team within 48 hours of delivery with photos. We'll arrange a replacement or refund your points." },
  { question: "Are there any restrictions on combining products?", answer: "No restrictions! You can mix products from any category in a single order." },
  { question: "How do I contact customer support?", answer: "Visit our Help Center and click 'Contact Us' or email support@culinarymarketplace.com." },
];
