import type { BaseCreator } from "./general.types";

export interface Part extends BaseCreator {
  name: string;
  price: number;
  color: string;
  quantity: number;
  imagePath: string;
  carSpecificationId: number;
  partCategoryId: number;
}

export interface CreatePart {
  name: string;
  price: number;
  quantity: number;
  partCategoryId: number;
  color: string;
  imagePath?: string;
  carSpecificationId: number;
}

export interface UpdatePart {
  name?: string;
  price?: number;
  quantity?: number;
  imagePath?: string;
  partCategoryId: number;
  color?: string;
  carSpecificationId: number;
}
