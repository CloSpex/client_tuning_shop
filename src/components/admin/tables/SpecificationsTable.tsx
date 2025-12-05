import React from "react";
import { Edit, Trash2 } from "lucide-react";
import type { Specification } from "../../../types/specification.types";
import type { Model } from "../../../types/model.types";
import type { VehicleTypes } from "../../../types/enum.types";
import type { ItemType } from "../../../types/admin.types";

interface SpecificationsTableProps {
  data: Specification[];
  models: Model[];
  vehicleTypes: VehicleTypes;
  selectedModelId: number | null;
  onEdit: (item: ItemType) => void;
  onDelete: (id: number) => void;
}

export const SpecificationsTable: React.FC<SpecificationsTableProps> = ({
  data,
  models,
  vehicleTypes,
  selectedModelId,
  onEdit,
  onDelete,
}) => {
  const filteredData = selectedModelId
    ? data.filter((spec) => spec.modelId === selectedModelId)
    : data;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Model
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Engine
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Volume (L)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Power (kW)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Years
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                No specifications found
              </td>
            </tr>
          ) : (
            filteredData.map((spec) => (
              <tr key={spec.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {spec.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {models.find((m) => m.id === spec.modelId)?.name || "Unknown"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {vehicleTypes.engineTypes.find(
                    (e) => e.id === spec.engineTypeId
                  )?.name || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {spec.volumeLitres || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {spec.powerKilowatts || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {spec.yearStart && spec.yearEnd
                    ? `${spec.yearStart}-${spec.yearEnd}`
                    : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(spec as ItemType)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(spec.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
