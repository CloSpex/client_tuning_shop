import React from "react";
import { Edit, Trash2 } from "lucide-react";
import type { Brand } from "../../../types/brand.types";
import type { ItemType } from "../../../types/admin.types";

interface BrandsTableProps {
  data: Brand[];
  onEdit: (item: ItemType) => void;
  onDelete: (id: number) => void;
}

export const BrandsTable: React.FC<BrandsTableProps> = ({
  data,
  onEdit,
  onDelete,
}) => (
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
            Description
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.length === 0 ? (
          <tr>
            <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
              No brands found
            </td>
          </tr>
        ) : (
          data.map((brand) => (
            <tr key={brand.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {brand.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {brand.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {brand.description || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(brand as ItemType)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(brand.id)}
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
