import type { BaseCreator } from "./general.types";
import type { EngineType, TransmissionType, BodyType } from "./enum.types";

export interface Specification extends BaseCreator {
  modelId: number;
  engineTypeId: number;
  transmissionTypeId: number;
  bodyTypeId: number;
  volumeLitres: number;
  powerKilowatts: number;
  yearStart?: number;
  yearEnd?: number;
  engineType: EngineType;
  transmissionType: TransmissionType;
  bodyType: BodyType;
}

export interface CreateSpecification {
  modelId: number;
  engineTypeId: number;
  transmissionTypeId: number;
  bodyTypeId: number;
  volumeLitres: number;
  powerKilowatts: number;
  yearStart?: number;
  yearEnd?: number;
}

export interface UpdateSpecification {
  modelId?: number;
  engineTypeId?: number;
  transmissionTypeId?: number;
  bodyTypeId?: number;
  volumeLitres?: number;
  powerKilowatts?: number;
  yearStart?: number;
  yearEnd?: number;
}
