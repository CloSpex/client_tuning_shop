import api from "../context/apiSetup";
import type { ApiResponse } from "../types/general.types";
import type { Brand, CreateBrand, UpdateBrand } from "../types/brand.types";

const BASE_PATH = "/brand";

export const BrandService = {
  async getAllBrands(): Promise<ApiResponse<Brand[]>> {
    try {
      const response = await api.get<Brand[]>(BASE_PATH);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch brands";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: [], success: false, message };
    }
  },

  async getBrandById(id: number): Promise<ApiResponse<Brand>> {
    try {
      const response = await api.get<Brand>(`${BASE_PATH}/${id}`);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch brand";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: {} as Brand, success: false, message };
    }
  },

  async createBrand(brand: CreateBrand): Promise<ApiResponse<Brand>> {
    try {
      const response = await api.post<Brand>(BASE_PATH, brand);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to create brand";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: {} as Brand, success: false, message };
    }
  },

  async updateBrand(
    id: number,
    brand: UpdateBrand
  ): Promise<ApiResponse<Brand>> {
    try {
      const response = await api.patch<Brand>(`${BASE_PATH}/${id}`, brand);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to update brand";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: {} as Brand, success: false, message };
    }
  },

  async deleteBrand(id: number): Promise<ApiResponse<boolean>> {
    try {
      await api.delete(`${BASE_PATH}/${id}`);
      return { data: true, success: true };
    } catch (error: unknown) {
      let message = "Failed to delete brand";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: false, success: false, message };
    }
  },
};
