import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingCart, AlertTriangle, ArrowLeft, Check } from "lucide-react";
import { products, categories } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const badgeStyles: Record<string, string> = {
  top: "bg-primary text-primary-foreground",
  new: "bg-success text-success-foreground",
  discount: "bg-destructive text-destructive-foreground",
  bestselling: "bg-foreground text-background",
};
const badgeLabels: Record<string, string> = { top: "Top Product", new: "New", discount: "Discount", bestselling: "Best Selling" };

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [showModal, setShowModal] = useState(false);

  if (!product) {
    return (
      <div className="container-main py-20 text-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <Link to="/" className="text-primary mt-4 inline-block">Go home</Link>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.categoryId);

  const handleAdd = () => {
    addToCart(product, qty);
    setShowModal(true);
  };

  return (
    <div className="container-main py-6 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        {category && (
          <>
            <Link to={`/category/${category.slug}`} className="hover:text-foreground transition-colors">{category.name}</Link>
            <span>/</span>
          </>
        )}
        <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
      </nav>

      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          {product.badges.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              {product.badges.map(b => (
                <Badge key={b} className={`${badgeStyles[b]}`}>{badgeLabels[b]}</Badge>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{product.brand}</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mt-1">{product.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">Product Code: {product.productCode}</p>
          {product.modelNumber && <p className="text-sm text-muted-foreground">Model: {product.modelNumber}</p>}

          <p className="text-3xl font-bold text-primary mt-4">{product.points.toLocaleString()} pts</p>

          {product.alert && (
            <div className="flex items-start gap-2 bg-destructive/10 text-destructive p-3 rounded-lg mt-4 text-sm">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              {product.alert}
            </div>
          )}

          <div className="border-t mt-6 pt-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Delivery</h3>
              <p className="text-sm text-muted-foreground">{product.deliveryInfo}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Cancellation Policy</h3>
              <p className="text-sm text-muted-foreground">{product.cancellationPolicy}</p>
            </div>
          </div>

          <div className="border-t mt-6 pt-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-medium text-foreground">Quantity</span>
              <div className="flex items-center border rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-accent transition-colors rounded-l-lg">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 text-sm font-medium min-w-[40px] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-accent transition-colors rounded-r-lg">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button onClick={handleAdd} className="w-full h-12 rounded-lg text-sm font-medium gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart – {(product.points * qty).toLocaleString()} pts
            </Button>
          </div>
        </div>
      </div>

      {/* Added to cart modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
                <Check className="h-4 w-4 text-success" />
              </div>
              Product added to cart
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-3 py-3">
            <img src={product.image} alt={product.name} className="h-16 w-16 rounded-md object-cover" />
            <div>
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-sm text-muted-foreground">Qty: {qty} · {(product.points * qty).toLocaleString()} pts</p>
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>
              Keep Shopping
            </Button>
            <Button className="flex-1" onClick={() => { setShowModal(false); navigate("/cart"); }}>
              Go to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetail;
