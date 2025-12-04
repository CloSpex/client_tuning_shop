import api from "../context/apiSetup";
import type { ApiResponse } from "../types/general.types";
import type { FAQ, CreateFAQ, UpdateFAQ } from "../types/faq.types";

const BASE_PATH = "/faq";

export const FaqService = {
  async getAllFaqs(): Promise<ApiResponse<FAQ[]>> {
    try {
      const response = await api.get<FAQ[]>(BASE_PATH);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch FAQs";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: [], success: false, message };
    }
  },

  async getFaqById(id: number): Promise<ApiResponse<FAQ>> {
    try {
      const response = await api.get<FAQ>(`${BASE_PATH}/${id}`);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch FAQ";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: {} as FAQ, success: false, message };
    }
  },

  async createFaq(faq: CreateFAQ): Promise<ApiResponse<FAQ>> {
    try {
      const response = await api.post<FAQ>(BASE_PATH, faq);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to create FAQ";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: {} as FAQ, success: false, message };
    }
  },

  async updateFaq(id: number, faq: UpdateFAQ): Promise<ApiResponse<FAQ>> {
    try {
      const response = await api.patch<FAQ>(`${BASE_PATH}/${id}`, faq);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to update FAQ";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: {} as FAQ, success: false, message };
    }
  },

  async deleteFaq(id: number): Promise<ApiResponse<boolean>> {
    try {
      await api.delete(`${BASE_PATH}/${id}`);
      return { data: true, success: true };
    } catch (error: unknown) {
      let message = "Failed to delete FAQ";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: false, success: false, message };
    }
  },
};
