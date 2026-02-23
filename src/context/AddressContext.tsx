import React, { createContext, useContext, useState, useCallback } from "react";

export interface SavedAddress {
  country: string;
  addressType: "residential" | "business";
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  nickname: string;
}

interface AddressContextType {
  address: SavedAddress | null;
  isAddressSaved: boolean;
  saveAddress: (addr: SavedAddress) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<SavedAddress | null>(null);

  const saveAddress = useCallback((addr: SavedAddress) => {
    setAddress(addr);
  }, []);

  return (
    <AddressContext.Provider value={{ address, isAddressSaved: !!address, saveAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error("useAddress must be used within AddressProvider");
  return ctx;
};
