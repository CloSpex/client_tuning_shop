import type { BaseCreator } from "./general.types";

export interface PartCategory extends BaseCreator {
  name: string;
  isExterior: boolean;
}

export interface CreatePartCategory {
  name: string;
  isExterior?: boolean;
}

export interface UpdatePartCategory {
  name?: string;
  isExterior?: boolean;
}
