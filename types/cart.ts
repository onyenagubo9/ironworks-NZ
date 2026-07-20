export interface CartItem {
  id: string;

  productId: string;

  variantId?: string | null;

  name: string;

  slug: string;

  sku: string;

  image: string | null;

  brand: string | null;

  category: string;

  quantity: number;

  price: number;

  comparePrice: number | null;
}

export interface CartState {
  items: CartItem[];

  itemCount: number;

  subtotal: number;
}