import React from "react";
import type { Brand } from "../../../types/brand.types";

interface ModelFormProps {
  formData: any;
  brands: Brand[];
  onChange: (field: string, value: any) => void;
}

export const ModelForm: React.FC<ModelFormProps> = ({
  formData,
  brands,
  onChange,
}) => (
  <>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Name *
      </label>
      <input
        type="text"
        required
        value={formData.name || ""}
        onChange={(e) => onChange("name", e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Brand *
      </label>
      <select
        required
        value={formData.brandId || ""}
        onChange={(e) => onChange("brandId", parseInt(e.target.value))}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Brand</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>
    </div>
  </>
);
