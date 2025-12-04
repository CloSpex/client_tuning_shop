import type { Brand, CreateBrand, UpdateBrand } from "./brand.types";
import type { CreateModel, Model, UpdateModel } from "./model.types";
import type {
  CreateSpecification,
  Specification,
  UpdateSpecification,
} from "./specification.types";
import type { CreatePart, Part, UpdatePart } from "./part.types";

export type ItemType = Brand | Model | Specification | Part;

export type CreateDataType =
  | CreateBrand
  | CreateModel
  | CreateSpecification
  | CreatePart;

export type UpdateDataType =
  | UpdateBrand
  | UpdateModel
  | UpdateSpecification
  | UpdatePart;

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };
