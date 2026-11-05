import type { LocalizedString } from "./locale";

export type OrderStatus =
  | "pending_verification"
  | "confirmed"
  | "processing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "COD"; // Cash on Delivery strictly for Phase 1

export interface CustomerInfo {
  fullName: string;
  phone: string; // Saudi phone number format (+966...)
  email?: string;
  city: string; // Saudi Arabia City (e.g., Riyadh, Jeddah, Dammam)
  district?: string;
  addressLine: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  productName: LocalizedString;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface WhatsAppConfirmationState {
  isSent: boolean;
  sentAt?: string;
  waMessageId?: string;
  verifiedByCustomer: boolean;
}

/**
 * Order entity prepared for COD flow today, WhatsApp confirmation in phase 2,
 * and future administrative order tracking / dashboard integrations without schema redesign.
 */
export interface Order {
  id: string;
  orderNumber: string; // Human-friendly reference, e.g. "AQ-2611-001"
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  currency: "SAR";
  paymentMethod: PaymentMethod;
  paymentStatus: "pending" | "collected" | "failed";
  whatsappConfirmation: WhatsAppConfirmationState;
  metadata?: Record<string, unknown>;
}
