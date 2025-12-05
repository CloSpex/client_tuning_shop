import React from "react";
import type { PartCategory } from "../../../types/partCategory.types";
import type { Specification } from "../../../types/specification.types";
import type { Model } from "../../../types/model.types";

interface PartFormProps {
  formData: any;
  categories: PartCategory[];
  specifications: Specification[];
  models: Model[];
  onChange: (field: string, value: any) => void;
}

export const PartForm: React.FC<PartFormProps> = ({
  formData,
  categories,
  specifications,
  models,
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

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <select
          required
          value={formData.partCategoryId || ""}
          onChange={(e) => onChange("partCategoryId", parseInt(e.target.value))}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specification *
        </label>
        <select
          required
          value={formData.carSpecificationId || ""}
          onChange={(e) =>
            onChange("carSpecificationId", parseInt(e.target.value))
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Specification</option>
          {specifications.map((spec) => (
            <option key={spec.id} value={spec.id}>
              {models.find((m) => m.id === spec.modelId)?.name ||
                "Unknown Model"}{" "}
              ({spec.yearStart || "?"} - {spec.yearEnd || "?"}) -{" "}
              {spec.volumeLitres || "-"}L / {spec.powerKilowatts || "-"}kW
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price
        </label>
        <input
          type="number"
          step="0.01"
          value={formData.price || ""}
          onChange={(e) =>
            onChange(
              "price",
              e.target.value ? parseFloat(e.target.value) : null
            )
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <input
          type="number"
          value={formData.quantity || ""}
          onChange={(e) =>
            onChange(
              "quantity",
              e.target.value ? parseInt(e.target.value) : null
            )
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Color *
      </label>
      <div className="flex space-x-2">
        <input
          type="color"
          required
          value={
            formData.color && /^#([0-9A-F]{3}){1,2}$/i.test(formData.color)
              ? formData.color
              : "#000000"
          }
          onChange={(e) => onChange("color", e.target.value.toUpperCase())}
          className="h-10 w-12 p-0 border-none bg-transparent cursor-pointer rounded-lg overflow-hidden"
          style={{ minWidth: "48px" }}
        />
        <input
          type="text"
          required
          value={formData.color || ""}
          onChange={(e) => onChange("color", e.target.value.toUpperCase())}
          placeholder="#RRGGBB"
          maxLength={7}
          className="flex-grow px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 uppercase font-mono"
        />
      </div>
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Image Path
      </label>
      <input
        type="text"
        value={formData.imagePath || ""}
        onChange={(e) => onChange("imagePath", e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        placeholder="https://example.com/image.jpg"
      />
    </div>
  </>
);
