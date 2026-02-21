import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart, getCartItemKey } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Check } from "lucide-react";

const steps = ["Address", "Contact", "Review"];

const CheckoutPage = () => {
  const [step, setStep] = useState(0);
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const { items, totalPoints, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handlePlaceOrder = () => {
    clearCart();
    navigate("/confirmation");
  };

  return (
    <div className="container-main py-6 sm:py-10 max-w-2xl">
      {/* Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${
              i < step ? "bg-success text-success-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-sm font-medium hidden sm:inline ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
            {i < steps.length - 1 && <div className="w-8 sm:w-16 h-px bg-border" />}
          </div>
        ))}
      </div>

      <div className="bg-card border rounded-lg p-6 sm:p-8">
        {step === 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
            <div className="bg-muted rounded-lg p-4 text-sm space-y-1">
              <p className="font-medium">John Doe</p>
              <p className="text-muted-foreground">123 Culinary Street</p>
              <p className="text-muted-foreground">New York, NY 10001</p>
              <p className="text-muted-foreground">United States</p>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              This address is linked to your account and cannot be changed during checkout.
            </p>
            <Button className="mt-6 w-full h-11 rounded-lg" onClick={() => setStep(1)}>Continue</Button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Account Email</label>
                <Input value="john.doe@company.com" disabled className="bg-muted" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Delivery Contact Email</label>
                <Input placeholder="delivery@email.com" value={contactEmail} onChange={e => setContactEmail(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number</label>
                <Input placeholder="+1 (555) 000-0000" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1 h-11 rounded-lg" onClick={() => setStep(0)}>Back</Button>
              <Button className="flex-1 h-11 rounded-lg" onClick={() => setStep(2)}>Continue</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Review Your Order</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => {
                const key = getCartItemKey(item);
                const pts = item.selectedOption ? item.selectedOption.points : item.product.points;
                return (
                  <div key={key} className="flex items-center gap-3 text-sm">
                    <img src={item.product.image} alt={item.product.name} className="h-12 w-12 rounded object-cover" />
                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                      {item.selectedOption && <p className="text-xs text-primary">{item.selectedOption.title}</p>}
                      <p className="text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-primary">{(pts * item.quantity).toLocaleString()} pts</span>
                  </div>
                );
              })}
            </div>
            <div className="border-t pt-3 text-sm">
              <div className="flex justify-between font-semibold mb-3">
                <span>Total</span>
                <span className="text-primary">{totalPoints.toLocaleString()} pts</span>
              </div>
              <div className="bg-muted rounded-lg p-3 text-xs text-muted-foreground space-y-1 mb-4">
                <p><strong>Address:</strong> 123 Culinary Street, New York, NY 10001</p>
                <p><strong>Contact:</strong> {contactEmail || "john.doe@company.com"} · {phone || "Not provided"}</p>
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm mb-4 cursor-pointer">
              <Checkbox checked={acknowledged} onCheckedChange={v => setAcknowledged(v === true)} className="mt-0.5" />
              <span className="text-muted-foreground">I acknowledge the cancellation policies and terms for the products in my order.</span>
            </label>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 h-11 rounded-lg" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1 h-11 rounded-lg" disabled={!acknowledged} onClick={handlePlaceOrder}>
                Place Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;