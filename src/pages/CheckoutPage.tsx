import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart, getCartItemKey } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Info, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const steps = ["Address", "Contact", "Review"];

const CheckoutPage = () => {
  const [step, setStep] = useState(0);
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const { items, totalPoints, clearCart } = useCart();
  const navigate = useNavigate();

  // Address form state
  const [addressForm, setAddressForm] = useState({
    country: "United States",
    addressType: "residential" as "residential" | "business",
    firstName: "John",
    lastName: "Doe",
    address1: "555 West Branch Rd",
    address2: "",
    city: "New York",
    state: "NY",
    zip: "10001",
    nickname: "Home",
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showLoqateModal, setShowLoqateModal] = useState(false);
  const [addressSaved, setAddressSaved] = useState(true);

  const updateField = (field: string, value: string) => {
    setAddressForm(prev => ({ ...prev, [field]: value }));
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleSaveAddress = () => {
    // Simulate Loqate validation
    setShowLoqateModal(true);
  };

  const handleAcceptAddress = () => {
    setShowLoqateModal(false);
    setShowAddressForm(false);
    setAddressSaved(true);
  };

  const handlePlaceOrder = () => {
    clearCart();
    navigate("/confirmation");
  };

  return (
    <div className="container-main py-6 sm:py-10 max-w-2xl">
      {/* Blue info bar */}
      <div className="flex items-start gap-2 bg-[hsl(217,100%,95%)] text-primary p-3 rounded-lg mb-6 text-sm">
        <Info className="h-4 w-4 shrink-0 mt-0.5" />
        <p>Your selected delivery address cannot be changed at this stage because it determines pricing and product availability.</p>
      </div>

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

      <div className="bg-card border rounded-xl p-6 sm:p-8">
        {step === 0 && !showAddressForm && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
            <div className="bg-muted rounded-lg p-4 text-sm space-y-1">
              <p className="font-medium">{addressForm.firstName} {addressForm.lastName}</p>
              <p className="text-muted-foreground">{addressForm.address1}</p>
              {addressForm.address2 && <p className="text-muted-foreground">{addressForm.address2}</p>}
              <p className="text-muted-foreground">{addressForm.city}, {addressForm.state} {addressForm.zip}</p>
              <p className="text-muted-foreground">{addressForm.country}</p>
              {addressForm.nickname && (
                <p className="text-xs text-primary mt-1">📌 {addressForm.nickname}</p>
              )}
            </div>
            <div className="flex gap-3 mt-4">
              <Button variant="outline" size="sm" onClick={() => setShowAddressForm(true)}>
                <MapPin className="h-3.5 w-3.5 mr-1" /> Edit Address
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Once confirmed, address cannot be changed during checkout as it determines pricing and availability.
            </p>
            <Button className="mt-6 w-full h-11 rounded-lg" onClick={() => setStep(1)}>Continue</Button>
          </div>
        )}

        {step === 0 && showAddressForm && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
            <div className="space-y-4">
              {/* Country */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Country *</label>
                <select
                  value={addressForm.country}
                  onChange={e => updateField("country", e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                </select>
              </div>

              {/* Address Type */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Address Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" name="addrType" checked={addressForm.addressType === "residential"} onChange={() => updateField("addressType", "residential")} className="accent-[hsl(var(--primary))]" />
                    Residential
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" name="addrType" checked={addressForm.addressType === "business"} onChange={() => updateField("addressType", "business")} className="accent-[hsl(var(--primary))]" />
                    Business
                  </label>
                </div>
              </div>

              {/* Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">First Name *</label>
                  <Input value={addressForm.firstName} onChange={e => updateField("firstName", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name *</label>
                  <Input value={addressForm.lastName} onChange={e => updateField("lastName", e.target.value)} />
                </div>
              </div>

              {/* Address Lines */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Address (No P.O. Boxes) *</label>
                <Input value={addressForm.address1} onChange={e => updateField("address1", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Apartment Number, Suite, Floor</label>
                <Input value={addressForm.address2} onChange={e => updateField("address2", e.target.value)} placeholder="Optional" />
              </div>

              {/* City, State, Zip */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">City *</label>
                  <Input value={addressForm.city} onChange={e => updateField("city", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">State *</label>
                  <Input value={addressForm.state} onChange={e => updateField("state", e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Zip Code *</label>
                  <Input value={addressForm.zip} onChange={e => updateField("zip", e.target.value)} />
                </div>
              </div>

              {/* Nickname */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Nickname for Address *</label>
                <Input value={addressForm.nickname} onChange={e => updateField("nickname", e.target.value)} placeholder="Home, Office, Parents House" />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1 h-11 rounded-lg" onClick={() => setShowAddressForm(false)}>Cancel</Button>
              <Button className="flex-1 h-11 rounded-lg" onClick={handleSaveAddress}>Save and Continue</Button>
            </div>
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
              <div className="flex justify-between font-semibold mb-1">
                <span>Total</span>
                <span className="text-primary">{totalPoints.toLocaleString()} pts</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">(Including applicable taxes)</p>
              <div className="bg-muted rounded-lg p-3 text-xs text-muted-foreground space-y-1 mb-4">
                <p><strong>Address:</strong> {addressForm.address1}, {addressForm.city}, {addressForm.state} {addressForm.zip}</p>
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

      {/* Loqate Validation Modal */}
      <Dialog open={showLoqateModal} onOpenChange={setShowLoqateModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Did you mean this address?</DialogTitle>
          </DialogHeader>
          <div className="py-3 space-y-3">
            <div className="bg-muted rounded-lg p-3 text-sm">
              <p className="font-medium">Suggested Address:</p>
              <p className="text-muted-foreground">{addressForm.address1}</p>
              <p className="text-muted-foreground">{addressForm.city}, {addressForm.state} {addressForm.zip}</p>
              <p className="text-muted-foreground">{addressForm.country}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={handleAcceptAddress}>Keep My Entered Address</Button>
            <Button className="flex-1" onClick={handleAcceptAddress}>Use Suggested Address</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutPage;
