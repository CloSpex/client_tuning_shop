import api from "../context/apiSetup";
import type { ApiResponse } from "../types/general.types";
import type {
  EngineType,
  BodyType,
  TransmissionType,
  VehicleTypes,
} from "../types/enum.types";

const BASE_PATH = "/carenums";

export const EnumService = {
  async getAllVehicleTypes(): Promise<ApiResponse<VehicleTypes>> {
    try {
      const [enginesRes, bodiesRes, transRes] = await Promise.all([
        api.get<EngineType[]>(`${BASE_PATH}/enginetypes`),
        api.get<BodyType[]>(`${BASE_PATH}/bodytypes`),
        api.get<TransmissionType[]>(`${BASE_PATH}/transmissiontypes`),
      ]);

      return {
        data: {
          engineTypes: enginesRes.data,
          bodyTypes: bodiesRes.data,
          transmissionTypes: transRes.data,
        },
        success: true,
      };
    } catch (error: unknown) {
      let message = "Failed to fetch vehicle types";
      if (error instanceof Error) message = error.message;

      return {
        data: { engineTypes: [], bodyTypes: [], transmissionTypes: [] },
        success: false,
        message,
      };
    }
  },

  async getEngineTypes(): Promise<ApiResponse<EngineType[]>> {
    try {
      const response = await api.get<EngineType[]>(`${BASE_PATH}/enginetypes`);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch engine types";
      if (error instanceof Error) message = error.message;
      return { data: [], success: false, message };
    }
  },

  async getBodyTypes(): Promise<ApiResponse<BodyType[]>> {
    try {
      const response = await api.get<BodyType[]>(`${BASE_PATH}/bodytypes`);
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch body types";
      if (error instanceof Error) message = error.message;
      return { data: [], success: false, message };
    }
  },

  async getTransmissionTypes(): Promise<ApiResponse<TransmissionType[]>> {
    try {
      const response = await api.get<TransmissionType[]>(
        `${BASE_PATH}/transmissiontypes`
      );
      return { data: response.data, success: true };
    } catch (error: unknown) {
      let message = "Failed to fetch transmission types";
      if (error instanceof Error) message = error.message;
      return { data: [], success: false, message };
    }
  },
};
