"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

export interface Address {
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  suburb: string;
  address1: string;
  address2: string;
  postalCode: string;
}

export interface CheckoutState {
  shippingAddress: Address;

  billingAddress: Address;

  sameAsShipping: boolean;

  deliveryMethod:
    | "standard"
    | "express"
    | "pickup";

  paymentMethod: "bank_transfer";

  selectedBankId: string;

  couponId: string;

  couponCode: string;

  discount: number;

  shippingFee: number;

  tax: number;

  orderNotes: string;
}

interface CheckoutContextType {
  checkout: CheckoutState;

  updateShippingAddress: (
    address: Partial<Address>
  ) => void;

  updateBillingAddress: (
    address: Partial<Address>
  ) => void;

  setSameAsShipping: (
    value: boolean
  ) => void;

  setDeliveryMethod: (
    method:
      | "standard"
      | "express"
      | "pickup"
  ) => void;

  setPaymentMethod: (
    method: "bank_transfer"
  ) => void;

  setSelectedBank: (
    bankId: string
  ) => void;

  setCoupon: (
    couponId: string,
    code: string,
    discount: number
  ) => void;

  clearCoupon: () => void;

  setShippingFee: (
    fee: number
  ) => void;

  setTax: (
    tax: number
  ) => void;

  setOrderNotes: (
    notes: string
  ) => void;

  resetCheckout: () => void;
}

const emptyAddress: Address = {
  firstName: "",
  lastName: "",
  company: "",
  phone: "",
  country: "New Zealand",
  state: "",
  city: "",
  suburb: "",
  address1: "",
  address2: "",
  postalCode: "",
};

const initialState: CheckoutState = {
  shippingAddress: emptyAddress,

  billingAddress: emptyAddress,

  sameAsShipping: true,

  deliveryMethod: "standard",

  paymentMethod: "bank_transfer",

  selectedBankId: "",

  couponId: "",

  couponCode: "",

  discount: 0,

  shippingFee: 0,

  tax: 0,

  orderNotes: "",
};

const CheckoutContext =
  createContext<
    CheckoutContextType | undefined
  >(undefined);

export function CheckoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [checkout, setCheckout] =
    useState(initialState);

  function updateShippingAddress(
    address: Partial<Address>
  ) {
    setCheckout((prev) => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        ...address,
      },
    }));
  }

  function updateBillingAddress(
    address: Partial<Address>
  ) {
    setCheckout((prev) => ({
      ...prev,
      billingAddress: {
        ...prev.billingAddress,
        ...address,
      },
    }));
  }

  function setSameAsShipping(
    value: boolean
  ) {
    setCheckout((prev) => ({
      ...prev,
      sameAsShipping: value,
    }));
  }

  function setDeliveryMethod(
    method:
      | "standard"
      | "express"
      | "pickup"
  ) {
    let shippingFee = 0;

    switch (method) {
      case "express":
        shippingFee = 19.99;
        break;

      case "pickup":
        shippingFee = 0;
        break;

      default:
        shippingFee = 0;
    }

    setCheckout((prev) => ({
      ...prev,
      deliveryMethod: method,
      shippingFee,
    }));
  }

  function setPaymentMethod(
    method: "bank_transfer"
  ) {
    setCheckout((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  }

  function setSelectedBank(
    bankId: string
  ) {
    setCheckout((prev) => ({
      ...prev,
      selectedBankId: bankId,
    }));
  }

  function setCoupon(
    couponId: string,
    code: string,
    discount: number
  ) {
    setCheckout((prev) => ({
      ...prev,
      couponId,
      couponCode: code,
      discount,
    }));
  }

  function clearCoupon() {
    setCheckout((prev) => ({
      ...prev,
      couponId: "",
      couponCode: "",
      discount: 0,
    }));
  }

  function setShippingFee(
    fee: number
  ) {
    setCheckout((prev) => ({
      ...prev,
      shippingFee: fee,
    }));
  }

  function setTax(
    tax: number
  ) {
    setCheckout((prev) => ({
      ...prev,
      tax,
    }));
  }

  function setOrderNotes(
    notes: string
  ) {
    setCheckout((prev) => ({
      ...prev,
      orderNotes: notes,
    }));
  }

  function resetCheckout() {
    setCheckout(initialState);
  }

  const value = useMemo(
    () => ({
      checkout,

      updateShippingAddress,

      updateBillingAddress,

      setSameAsShipping,

      setDeliveryMethod,

      setPaymentMethod,

      setSelectedBank,

      setCoupon,

      clearCoupon,

      setShippingFee,

      setTax,

      setOrderNotes,

      resetCheckout,
    }),
    [checkout]
  );

  return (
    <CheckoutContext.Provider
      value={value}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context =
    useContext(CheckoutContext);

  if (!context) {
    throw new Error(
      "useCheckout must be used inside CheckoutProvider."
    );
  }

  return context;
}