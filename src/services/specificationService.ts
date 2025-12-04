import api from "../context/apiSetup";
import type { ApiResponse } from "../types/general.types";
import type {
  Specification,
  CreateSpecification,
  UpdateSpecification,
} from "../types/specification.types";

const BASE_PATH = "/specifications";

export const SpecificationService = {
  async getAllSpecifications(): Promise<ApiResponse<Specification[]>> {
    try {
      const response = await api.get<Specification[]>(BASE_PATH);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch specifications";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: [], success: false, message };
    }
  },

  async getSpecificationById(id: number): Promise<ApiResponse<Specification>> {
    try {
      const response = await api.get<Specification>(`${BASE_PATH}/${id}`);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch specification";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: {} as Specification, success: false, message };
    }
  },

  async getSpecificationsByModelId(
    modelId: number
  ): Promise<ApiResponse<Specification[]>> {
    try {
      const response = await api.get<Specification[]>(
        `${BASE_PATH}/model/${modelId}`
      );
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch specifications by model";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: [], success: false, message };
    }
  },

  async createSpecification(
    specification: CreateSpecification
  ): Promise<ApiResponse<Specification>> {
    try {
      const response = await api.post<Specification>(BASE_PATH, specification);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to create specification";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: {} as Specification, success: false, message };
    }
  },

  async updateSpecification(
    id: number,
    specification: UpdateSpecification
  ): Promise<ApiResponse<Specification>> {
    try {
      const response = await api.patch<Specification>(
        `${BASE_PATH}/${id}`,
        specification
      );
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to update specification";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: {} as Specification, success: false, message };
    }
  },

  async deleteSpecification(id: number): Promise<ApiResponse<boolean>> {
    try {
      await api.delete(`${BASE_PATH}/${id}`);
      return { data: true, success: true };
    } catch (error: unknown) {
      let message = "Failed to delete specification";
      if (error instanceof Error) {
        message = error.message;
      }
      return { data: false, success: false, message };
    }
  },
};
