import type { BaseCreator } from "./general.types";

export interface EngineType extends BaseCreator {
  name: string;
}

export interface CreateEngineType {
  name: string;
}

export interface UpdateEngineType {
  name?: string;
}

export interface TransmissionType extends BaseCreator {
  name: string;
}

export interface CreateTransmissionType {
  name: string;
}

export interface UpdateTransmissionType {
  name?: string;
}

export interface BodyType extends BaseCreator {
  name: string;
}

export interface CreateBodyType {
  name: string;
}

export interface UpdateBodyType {
  name?: string;
}

export interface VehicleTypes {
  engineTypes: EngineType[];
  transmissionTypes: TransmissionType[];
  bodyTypes: BodyType[];
}
