import type { BaseCreator } from "./general.types";

export interface Model extends BaseCreator {
  name: string;
  brandId: number;
}

export interface CreateModel {
  name: string;
  brandId: number;
}

export interface UpdateModel {
  name?: string;
  brandId?: number;
}
