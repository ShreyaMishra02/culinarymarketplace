import { useState } from "react";
import { useAddress, SavedAddress } from "@/context/AddressContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

const emptyAddress: SavedAddress = {
  country: "United States",
  addressType: "residential",
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  nickname: "",
};

const AddressModal = () => {
  const { showAddressModal, saveAddress } = useAddress();
  const [form, setForm] = useState<SavedAddress>(emptyAddress);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  if (!showAddressModal) return null;

  const update = (field: keyof SavedAddress, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const validate = () => {
    const required: (keyof SavedAddress)[] = ["firstName", "lastName", "address1", "city", "state", "zip", "nickname"];
    const newErrors: Record<string, boolean> = {};
    required.forEach(f => { if (!form[f].trim()) newErrors[f] = true; });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    saveAddress(form);
  };

  const fieldClass = (field: string) =>
    errors[field] ? "border-destructive ring-1 ring-destructive" : "";

  return (
    <div className="fixed inset-0 z-[100] bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-card rounded-xl shadow-2xl w-full max-w-[750px] my-10 sm:my-8">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Address & Contact Information</h1>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Please enter your address so we can determine the product assortment available in your area.
          </p>

          <div className="space-y-4">
            {/* Country */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Country *</label>
              <select
                value={form.country}
                onChange={e => update("country", e.target.value)}
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
                  <input type="radio" name="modalAddrType" checked={form.addressType === "residential"} onChange={() => update("addressType", "residential")} className="accent-[hsl(var(--primary))]" />
                  Residential
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="radio" name="modalAddrType" checked={form.addressType === "business"} onChange={() => update("addressType", "business")} className="accent-[hsl(var(--primary))]" />
                  Business
                </label>
              </div>
            </div>

            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">First Name *</label>
                <Input value={form.firstName} onChange={e => update("firstName", e.target.value)} className={fieldClass("firstName")} />
                {errors.firstName && <p className="text-xs text-destructive mt-1">Required</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name *</label>
                <Input value={form.lastName} onChange={e => update("lastName", e.target.value)} className={fieldClass("lastName")} />
                {errors.lastName && <p className="text-xs text-destructive mt-1">Required</p>}
              </div>
            </div>

            {/* Address Lines */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Address (No P.O. Boxes) *</label>
              <Input value={form.address1} onChange={e => update("address1", e.target.value)} className={fieldClass("address1")} />
              {errors.address1 && <p className="text-xs text-destructive mt-1">Required</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Apartment Number, Suite, Floor</label>
              <Input value={form.address2} onChange={e => update("address2", e.target.value)} placeholder="Optional" />
            </div>

            {/* City, State, Zip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">City *</label>
                <Input value={form.city} onChange={e => update("city", e.target.value)} className={fieldClass("city")} />
                {errors.city && <p className="text-xs text-destructive mt-1">Required</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">State *</label>
                <Input value={form.state} onChange={e => update("state", e.target.value)} className={fieldClass("state")} />
                {errors.state && <p className="text-xs text-destructive mt-1">Required</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Zip Code *</label>
                <Input value={form.zip} onChange={e => update("zip", e.target.value)} className={fieldClass("zip")} />
                {errors.zip && <p className="text-xs text-destructive mt-1">Required</p>}
              </div>
            </div>

            {/* Nickname */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Nickname for Address *</label>
              <Input value={form.nickname} onChange={e => update("nickname", e.target.value)} placeholder="Home, Office, Parents House" className={fieldClass("nickname")} />
              {errors.nickname && <p className="text-xs text-destructive mt-1">Required</p>}
            </div>
          </div>

          <Button className="mt-6 w-full sm:w-auto sm:float-right h-11 rounded-lg px-8" onClick={handleSave}>
            Save and Continue
          </Button>
          <div className="clear-both" />
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
