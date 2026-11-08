"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useSyncExternalStore,
} from "react";
import {
  PROVISIONAL_PRODUCTS,
  type ProvisionalProduct,
} from "@/data/provisional-products";
import { pushEvent } from "@/lib/gtm";

export interface CartStoredEntry {
  id: string;
  qty: number;
}

export interface CartItem {
  product: ProvisionalProduct;
  quantity: number;
}

export interface CartToastData {
  product: ProvisionalProduct;
  id: number;
}

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  totalPrice?: number;
  hasPriceForAll: boolean;
  isOpen: boolean;
  isMounted: boolean;
  lastAddedToast: CartToastData | null;
  dismissToast: () => void;
  addItem: (product: ProvisionalProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "aqua_cart_v2";

// Lightweight in-memory state of raw persisted entries { id, qty }
let memoryEntries: CartStoredEntry[] = [];
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): CartStoredEntry[] {
  return memoryEntries;
}

const emptySnapshot: CartStoredEntry[] = [];
function getServerSnapshot(): CartStoredEntry[] {
  return emptySnapshot;
}

function saveEntries(entries: CartStoredEntry[]) {
  memoryEntries = entries;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // Storage empty or blocked: graceful fallback in memory
    }
  }
  notify();
}

const emptySubscribe = () => () => {};
const isClientSnapshot = () => true;
const isServerSnapshot = () => false;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const storedEntries = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isMounted = useSyncExternalStore(emptySubscribe, isClientSnapshot, isServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAddedToast, setLastAddedToast] = useState<CartToastData | null>(null);

  const dismissToast = useCallback(() => setLastAddedToast(null), []);

  // Initialize from localStorage once on client, dropping unknown product IDs
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Strictly drop unknown product IDs and validate qty
          const valid: CartStoredEntry[] = parsed
            .filter((entry): entry is CartStoredEntry => {
              if (!entry || typeof entry.id !== "string") return false;
              return PROVISIONAL_PRODUCTS.some((p) => p.id === entry.id);
            })
            .map((entry) => ({
              id: entry.id,
              qty: Math.max(1, Math.min(99, Number(entry.qty) || 1)),
            }));
          memoryEntries = valid;
          notify();
        }
      }
    } catch {
      // Storage blocked or invalid JSON
    }
  }, []);

  // Hydrate full product references from provisional products
  const items: CartItem[] = storedEntries
    .map((entry) => {
      const product = PROVISIONAL_PRODUCTS.find((p) => p.id === entry.id);
      if (!product) return null;
      return {
        product,
        quantity: Math.max(1, Math.min(99, entry.qty)),
      };
    })
    .filter((item): item is CartItem => item !== null);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Totals appear ONLY if EVERY cart item has a numeric price; otherwise undefined
  const hasPriceForAll =
    items.length > 0 &&
    items.every((item) => typeof item.product.price === "number");

  const totalPrice = hasPriceForAll
    ? items.reduce(
        (sum, item) => sum + (item.product.price as number) * item.quantity,
        0
      )
    : undefined;

  const addItem = useCallback((product: ProvisionalProduct, quantity = 1) => {
    const existingIndex = memoryEntries.findIndex((e) => e.id === product.id);
    let next: CartStoredEntry[];
    if (existingIndex > -1) {
      next = [...memoryEntries];
      const currentQty = next[existingIndex].qty;
      next[existingIndex] = {
        id: product.id,
        qty: Math.max(1, Math.min(99, currentQty + quantity)),
      };
    } else {
      next = [
        ...memoryEntries,
        { id: product.id, qty: Math.max(1, Math.min(99, quantity)) },
      ];
    }
    saveEntries(next);
    setLastAddedToast({ product, id: Date.now() });

    // Push GTM add_to_cart event
    const itemPrice = typeof product.price === "number" ? product.price : 0;
    pushEvent({
      event: "add_to_cart",
      currency: "SAR",
      value: itemPrice * quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name.ar || product.name.en,
          price: itemPrice,
          quantity,
        },
      ],
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    const next = memoryEntries.filter((e) => e.id !== productId);
    saveEntries(next);
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      const next = memoryEntries.filter((e) => e.id !== productId);
      saveEntries(next);
      return;
    }
    const clamped = Math.max(1, Math.min(99, quantity));
    const next = memoryEntries.map((e) =>
      e.id === productId ? { id: e.id, qty: clamped } : e
    );
    saveEntries(next);
  }, []);

  const clear = useCallback(() => {
    saveEntries([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        totalPrice,
        hasPriceForAll,
        isOpen,
        isMounted,
        lastAddedToast,
        dismissToast,
        addItem,
        removeItem,
        setQuantity,
        clear,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
