import api from "../context/apiSetup";
import type { ApiResponse } from "../types/general.types";
import type { Part, CreatePart, UpdatePart } from "../types/part.types";

const BASE_PATH = "/parts";

export const PartService = {
  async getAllParts(): Promise<ApiResponse<Part[]>> {
    try {
      const response = await api.get<Part[]>(BASE_PATH);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch parts";
      if (error instanceof Error) message = error.message;
      return { data: [], success: false, message };
    }
  },

  async getPartById(id: number): Promise<ApiResponse<Part>> {
    try {
      const response = await api.get<Part>(`${BASE_PATH}/${id}`);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch part";
      if (error instanceof Error) message = error.message;
      return { data: {} as Part, success: false, message };
    }
  },

  async getPartsByCategory(categoryId: number): Promise<ApiResponse<Part[]>> {
    try {
      const response = await api.get<Part[]>(
        `${BASE_PATH}/category/${categoryId}`
      );
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch parts by category";
      if (error instanceof Error) message = error.message;
      return { data: [], success: false, message };
    }
  },

  async getPartsBySpecification(
    specificationId: number
  ): Promise<ApiResponse<Part[]>> {
    try {
      const response = await api.get<Part[]>(
        `${BASE_PATH}/specification/${specificationId}`
      );
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch parts by specification";
      if (error instanceof Error) message = error.message;
      return { data: [], success: false, message };
    }
  },

  async createPart(part: CreatePart): Promise<ApiResponse<Part>> {
    try {
      const response = await api.post<Part>(BASE_PATH, part);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to create part";
      if (error instanceof Error) message = error.message;
      return { data: {} as Part, success: false, message };
    }
  },

  async updatePart(id: number, part: UpdatePart): Promise<ApiResponse<Part>> {
    try {
      const response = await api.patch<Part>(`${BASE_PATH}/${id}`, part);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to update part";
      if (error instanceof Error) message = error.message;
      return { data: {} as Part, success: false, message };
    }
  },

  async deletePart(id: number): Promise<ApiResponse<boolean>> {
    try {
      await api.delete(`${BASE_PATH}/${id}`);
      return { data: true, success: true };
    } catch (error: unknown) {
      let message = "Failed to delete part";
      if (error instanceof Error) message = error.message;
      return { data: false, success: false, message };
    }
  },
};
