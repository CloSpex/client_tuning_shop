import api from "../context/apiSetup";
import type { ApiResponse } from "../types/general.types";
import type { Order, CreateOrder, UpdateOrder } from "../types/order.types";

const BASE_PATH = "/orders";

export const OrderService = {
  async getAllOrders(): Promise<ApiResponse<Order[]>> {
    try {
      const response = await api.get<Order[]>(BASE_PATH);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch all orders";
      if (error instanceof Error) message = error.message;
      return { data: [], success: false, message };
    }
  },

  async getMyOrders(): Promise<ApiResponse<Order[]>> {
    try {
      const response = await api.get<Order[]>(`${BASE_PATH}/me`);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch your orders";
      if (error instanceof Error) message = error.message;
      return { data: [], success: false, message };
    }
  },

  async getOrderById(id: number): Promise<ApiResponse<Order>> {
    try {
      const response = await api.get<Order>(`${BASE_PATH}/${id}`);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch order";
      if (error instanceof Error) message = error.message;
      return { data: {} as Order, success: false, message };
    }
  },

  async createOrder(order: CreateOrder): Promise<ApiResponse<Order>> {
    try {
      const response = await api.post<Order>(BASE_PATH, order);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to create order";
      if (error instanceof Error) message = error.message;
      return { data: {} as Order, success: false, message };
    }
  },

  async updateOrder(
    id: number,
    order: UpdateOrder
  ): Promise<ApiResponse<Order>> {
    try {
      const response = await api.patch<Order>(`${BASE_PATH}/${id}`, order);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to update order";
      if (error instanceof Error) message = error.message;
      return { data: {} as Order, success: false, message };
    }
  },

  async deleteOrder(id: number): Promise<ApiResponse<boolean>> {
    try {
      await api.delete(`${BASE_PATH}/${id}`);
      return { data: true, success: true };
    } catch (error: unknown) {
      let message = "Failed to delete order";
      if (error instanceof Error) message = error.message;
      return { data: false, success: false, message };
    }
  },
};
