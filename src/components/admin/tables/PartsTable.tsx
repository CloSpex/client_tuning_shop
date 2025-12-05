import React from "react";
import { Edit, Trash2 } from "lucide-react";
import type { Part } from "../../../types/part.types";
import type { Specification } from "../../../types/specification.types";
import type { PartCategory } from "../../../types/partCategory.types";
import type { Model } from "../../../types/model.types";
import type { VehicleTypes } from "../../../types/enum.types";
import type { ItemType } from "../../../types/admin.types";

interface PartsTableProps {
  data: Part[];
  specifications: Specification[];
  categories: PartCategory[];
  models: Model[];
  vehicleTypes: VehicleTypes;
  selectedSpecificationId: number | null;
  onEdit: (item: ItemType) => void;
  onDelete: (id: number) => void;
}

export const PartsTable: React.FC<PartsTableProps> = ({
  data,
  specifications,
  categories,
  vehicleTypes,
  selectedSpecificationId,
  onEdit,
  onDelete,
}) => {
  const filteredData = selectedSpecificationId
    ? data.filter((part) => part.carSpecificationId === selectedSpecificationId)
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
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price/Qty
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Engine
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vol (L)
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Power (kW)
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Years
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Body
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={10} className="px-6 py-8 text-center text-gray-500">
                No parts found
              </td>
            </tr>
          ) : (
            filteredData.map((part) => {
              const spec = specifications.find(
                (s) => s.id === part.carSpecificationId
              );
              const engineType = spec
                ? vehicleTypes.engineTypes.find(
                    (e) => e.id === spec.engineTypeId
                  )?.name
                : "N/A";
              const bodyType = spec
                ? vehicleTypes.bodyTypes.find((b) => b.id === spec.bodyTypeId)
                    ?.name
                : "N/A";
              const yearInterval =
                spec?.yearStart && spec?.yearEnd
                  ? `${spec.yearStart}-${spec.yearEnd}`
                  : "N/A";

              return (
                <tr key={part.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {part.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {part.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {categories.find((c) => c.id === part.partCategoryId)
                      ?.name || "Unknown"}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${part.price?.toFixed(2) || "0.00"} / {part.quantity || 0}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                    {engineType}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                    {spec?.volumeLitres || "-"}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                    {spec?.powerKilowatts || "-"}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                    {yearInterval}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                    {bodyType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(part as ItemType)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(part.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
