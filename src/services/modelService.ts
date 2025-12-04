import api from "../context/apiSetup";
import type { ApiResponse } from "../types/general.types";
import type { Model, CreateModel, UpdateModel } from "../types/model.types";

const BASE_PATH = "/model";

export const ModelService = {
  async getAllModels(): Promise<ApiResponse<Model[]>> {
    try {
      const response = await api.get<Model[]>(BASE_PATH);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch models";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: [], success: false, message };
    }
  },

  async getModelById(id: number): Promise<ApiResponse<Model>> {
    try {
      const response = await api.get<Model>(`${BASE_PATH}/${id}`);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch model";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: {} as Model, success: false, message };
    }
  },

  async getModelsByBrandId(brandId: number): Promise<ApiResponse<Model[]>> {
    try {
      const response = await api.get<Model[]>(`${BASE_PATH}/brand/${brandId}`);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch models by brand";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: [], success: false, message };
    }
  },

  async createModel(model: CreateModel): Promise<ApiResponse<Model>> {
    try {
      const response = await api.post<Model>(BASE_PATH, model);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to create model";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: {} as Model, success: false, message };
    }
  },

  async updateModel(
    id: number,
    model: UpdateModel
  ): Promise<ApiResponse<Model>> {
    try {
      const response = await api.patch<Model>(`${BASE_PATH}/${id}`, model);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to update model";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: {} as Model, success: false, message };
    }
  },

  async deleteModel(id: number): Promise<ApiResponse<boolean>> {
    try {
      await api.delete(`${BASE_PATH}/${id}`);
      return { data: true, success: true };
    } catch (error: unknown) {
      let message = "Failed to delete model";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: false, success: false, message };
    }
  },
};
