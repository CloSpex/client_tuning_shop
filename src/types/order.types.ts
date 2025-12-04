import type { BaseCreator } from "./general.types";

export interface OrderItem {
  partId: number;
  partName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order extends BaseCreator {
  orderDate: string;
  status: string;
  totalPrice: number;
  items: OrderItem[];
}

export interface CreateOrderItem {
  partId: number;
  quantity: number;
}

export interface CreateOrder {
  items: CreateOrderItem[];
}

export interface UpdateOrder {
  status?: string;
}
