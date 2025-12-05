import React from "react";
import { Edit, Trash2 } from "lucide-react";
import type { Model } from "../../../types/model.types";
import type { Brand } from "../../../types/brand.types";
import type { ItemType } from "../../../types/admin.types";

interface ModelsTableProps {
  data: Model[];
  brands: Brand[];
  selectedBrandId: number | null;
  onEdit: (item: ItemType) => void;
  onDelete: (id: number) => void;
}

export const ModelsTable: React.FC<ModelsTableProps> = ({
  data,
  brands,
  selectedBrandId,
  onEdit,
  onDelete,
}) => {
  const filteredData = selectedBrandId
    ? data.filter((model) => model.brandId === selectedBrandId)
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
              Brand
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                No models found
              </td>
            </tr>
          ) : (
            filteredData.map((model) => (
              <tr key={model.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {model.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {model.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {brands.find((b) => b.id === model.brandId)?.name ||
                    "Unknown"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(model as ItemType)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(model.id)}
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
