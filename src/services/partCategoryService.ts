import api from "../context/apiSetup";
import type { ApiResponse } from "../types/general.types";
import type {
  PartCategory,
  CreatePartCategory,
  UpdatePartCategory,
} from "../types/partCategory.types";

const BASE_PATH = "/partcategories";

export const PartCategoryService = {
  async getAll(): Promise<ApiResponse<PartCategory[]>> {
    try {
      const response = await api.get<PartCategory[]>(BASE_PATH);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch part categories";
      if (error instanceof Error) message = error.message;
      return { data: [], success: false, message };
    }
  },

  async getById(id: number): Promise<ApiResponse<PartCategory>> {
    try {
      const response = await api.get<PartCategory>(`${BASE_PATH}/${id}`);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch part category";
      if (error instanceof Error) message = error.message;
      return { data: {} as PartCategory, success: false, message };
    }
  },

  async create(
    category: CreatePartCategory
  ): Promise<ApiResponse<PartCategory>> {
    try {
      const response = await api.post<PartCategory>(BASE_PATH, category);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to create part category";
      if (error instanceof Error) message = error.message;
      return { data: {} as PartCategory, success: false, message };
    }
  },

  async update(
    id: number,
    category: UpdatePartCategory
  ): Promise<ApiResponse<PartCategory>> {
    try {
      const response = await api.patch<PartCategory>(
        `${BASE_PATH}/${id}`,
        category
      );
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to update part category";
      if (error instanceof Error) message = error.message;
      return { data: {} as PartCategory, success: false, message };
    }
  },

  async delete(id: number): Promise<ApiResponse<boolean>> {
    try {
      await api.delete(`${BASE_PATH}/${id}`);
      return { data: true, success: true };
    } catch (error: unknown) {
      let message = "Failed to delete part category";
      if (error instanceof Error) message = error.message;
      return { data: false, success: false, message };
    }
  },
};
