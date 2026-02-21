import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, totalPoints, userPoints } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container-main py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Start exploring our culinary marketplace!</p>
        <Button asChild><Link to="/">Browse Products</Link></Button>
      </div>
    );
  }

  return (
    <div className="container-main py-6 sm:py-10">
      <h1 className="text-2xl font-bold text-foreground mb-6">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="bg-card border rounded-lg p-4 flex gap-4">
              <img src={product.image} alt={product.name} className="h-24 w-24 rounded-md object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground font-medium uppercase">{product.brand}</p>
                <h3 className="text-sm font-medium text-card-foreground">{product.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Code: {product.productCode}</p>
                <p className="text-xs text-muted-foreground">{product.deliveryInfo}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1.5 hover:bg-accent transition-colors"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="px-3 text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => {
                        const newTotal = totalPoints + product.points;
                        if (newTotal > userPoints) return;
                        updateQuantity(product.id, quantity + 1);
                      }}
                      className="p-1.5 hover:bg-accent transition-colors"
                      title={totalPoints + product.points > userPoints ? "Insufficient points" : ""}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-primary text-sm">{(product.points * quantity).toLocaleString()} pts</span>
                    <button onClick={() => removeFromCart(product.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border rounded-lg p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{totalPoints.toLocaleString()} pts</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax & Shipping</span>
                <span>Included</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold text-foreground">
                <span>Total</span>
                <span>{totalPoints.toLocaleString()} pts</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Your balance: {userPoints.toLocaleString()} pts · Remaining: {(userPoints - totalPoints).toLocaleString()} pts
            </p>
            {totalPoints > userPoints && (
              <p className="text-xs text-destructive mt-2">Insufficient points to complete this order.</p>
            )}
            <Button
              className="w-full mt-4 h-11 rounded-lg"
              disabled={totalPoints > userPoints}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>
            <p className="text-[11px] text-muted-foreground text-center mt-3">
              Address changes after checkout are not available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
