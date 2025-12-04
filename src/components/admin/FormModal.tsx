import React, { useState } from "react";
import { X, Save } from "lucide-react";
import type { Brand } from "../../types/brand.types";
import type { Model } from "../../types/model.types";
import type { Specification } from "../../types/specification.types";
import type { VehicleTypes } from "../../types/enum.types";
import type { PartCategory } from "../../types/partCategory.types";
import type {
  ItemType,
  CreateDataType,
  UpdateDataType,
} from "../../types/admin.types";
import { BrandForm } from "./forms/BrandForm";
import { ModelForm } from "./forms/ModelForm";
import { SpecificationForm } from "./forms/SpecificationForm";
import { PartForm } from "./forms/PartForm";

interface FormModalProps {
  type: "brands" | "models" | "specifications" | "parts";
  item: ItemType | null;
  brands: Brand[];
  models: Model[];
  specifications: Specification[];
  categories: PartCategory[];
  vehicleTypes: VehicleTypes;
  onSave: (data: CreateDataType | UpdateDataType) => void;
  onClose: () => void;
  loading: boolean;
}

export const FormModal: React.FC<FormModalProps> = ({
  type,
  item,
  brands,
  models,
  specifications,
  categories,
  vehicleTypes,
  onSave,
  onClose,
  loading,
}) => {
  const initialFormData = item
    ? item
    : type === "brands"
    ? { name: "", description: "" }
    : type === "models"
    ? { name: "", brandId: "" }
    : type === "specifications"
    ? { modelId: "" }
    : type === "parts"
    ? { name: "", partCategoryId: "", carSpecificationId: "", color: "" }
    : {};

  const [formData, setFormData] = useState<any>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {item ? "Edit" : "Create"}{" "}
            {type.slice(0, -1).charAt(0).toUpperCase() +
              type.slice(0, -1).slice(1)}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {type === "brands" && (
            <BrandForm formData={formData} onChange={handleChange} />
          )}

          {type === "models" && (
            <ModelForm
              formData={formData}
              brands={brands}
              onChange={handleChange}
            />
          )}

          {type === "specifications" && (
            <SpecificationForm
              formData={formData}
              models={models}
              vehicleTypes={vehicleTypes}
              onChange={handleChange}
            />
          )}

          {type === "parts" && (
            <PartForm
              formData={formData}
              categories={categories}
              specifications={specifications}
              models={models}
              onChange={handleChange}
            />
          )}

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
