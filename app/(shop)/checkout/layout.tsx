import { CheckoutProvider } from "@/context/CheckoutProvider";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CheckoutProvider>
      {children}
    </CheckoutProvider>
  );
}