import type { BaseCreator } from "./general.types";

export interface Brand extends BaseCreator {
  name: string;
  description?: string;
}
export interface CreateBrand {
  name: string;
  description?: string;
}
export interface UpdateBrand {
  name?: string;
  description?: string;
}
