import { create } from 'zustand';

export interface Product {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  image?: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (product, quantity = 1) => set((state) => {
    const existing = state.items.find(i => i.product._id === product._id);
    if (existing) {
      return {
        items: state.items.map(i =>
          i.product._id === product._id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        ),
      };
    }
    return { items: [...state.items, { product, quantity }] };
  }),
  removeItem: (productId) => set((state) => ({
    items: state.items.filter(i => i.product._id !== productId),
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    items: state.items.map(i =>
      i.product._id === productId ? { ...i, quantity } : i
    ),
  })),
  clearCart: () => set({ items: [] }),
}));
