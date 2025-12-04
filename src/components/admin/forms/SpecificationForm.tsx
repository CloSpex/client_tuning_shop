import React from "react";
import type { Model } from "../../../types/model.types";
import type { VehicleTypes } from "../../../types/enum.types";

interface SpecificationFormProps {
  formData: any;
  models: Model[];
  vehicleTypes: VehicleTypes;
  onChange: (field: string, value: any) => void;
}

export const SpecificationForm: React.FC<SpecificationFormProps> = ({
  formData,
  models,
  vehicleTypes,
  onChange,
}) => (
  <>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Model *
      </label>
      <select
        required
        value={formData.modelId || ""}
        onChange={(e) => onChange("modelId", parseInt(e.target.value))}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Model</option>
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Engine Type
        </label>
        <select
          value={formData.engineTypeId || ""}
          onChange={(e) =>
            onChange(
              "engineTypeId",
              e.target.value ? parseInt(e.target.value) : null
            )
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Type</option>
          {vehicleTypes.engineTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Transmission Type
        </label>
        <select
          value={formData.transmissionTypeId || ""}
          onChange={(e) =>
            onChange(
              "transmissionTypeId",
              e.target.value ? parseInt(e.target.value) : null
            )
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Type</option>
          {vehicleTypes.transmissionTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Body Type
      </label>
      <select
        value={formData.bodyTypeId || ""}
        onChange={(e) =>
          onChange(
            "bodyTypeId",
            e.target.value ? parseInt(e.target.value) : null
          )
        }
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Type</option>
        {vehicleTypes.bodyTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Volume (Litres)
        </label>
        <input
          type="number"
          step="0.1"
          value={formData.volumeLitres || ""}
          onChange={(e) =>
            onChange(
              "volumeLitres",
              e.target.value ? parseFloat(e.target.value) : null
            )
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Power (kW)
        </label>
        <input
          type="number"
          step="0.1"
          value={formData.powerKilowatts || ""}
          onChange={(e) =>
            onChange(
              "powerKilowatts",
              e.target.value ? parseFloat(e.target.value) : null
            )
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Year Start
        </label>
        <input
          type="number"
          value={formData.yearStart || ""}
          onChange={(e) =>
            onChange(
              "yearStart",
              e.target.value ? parseInt(e.target.value) : null
            )
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Year End
        </label>
        <input
          type="number"
          value={formData.yearEnd || ""}
          onChange={(e) =>
            onChange(
              "yearEnd",
              e.target.value ? parseInt(e.target.value) : null
            )
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  </>
);
