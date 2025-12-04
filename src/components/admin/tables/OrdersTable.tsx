import React, { useState } from "react";
import type { Order } from "../../../types/order.types";
import { Trash2, Edit } from "lucide-react";

const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Canceled",
];

interface OrdersTableProps {
  data: Order[];
  onUpdateStatus: (orderId: number, newStatus: string) => void;
  onDelete: (orderId: number) => void;
}

const getStatusClasses = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
    case "Processing":
      return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
    case "Shipped":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100";
    case "Canceled":
      return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
    case "Pending":
    default:
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
  }
};

export const OrdersTable: React.FC<OrdersTableProps> = ({
  data,
  onUpdateStatus,
  onDelete,
}) => {
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const toggleExpand = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const [tempStatus, setTempStatus] = useState<Record<number, string>>({});

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              User
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Total Price
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {data.map((order) => (
            <React.Fragment key={order.id}>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {order.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  User ID: {order.createdBy}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">
                  ${order.totalPrice.toFixed(2)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-2">
                  <button
                    onClick={() => toggleExpand(order.id)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 text-xs font-semibold"
                  >
                    {expandedOrder === order.id ? "Hide Items" : "Show Items"} (
                    {order.items.length})
                  </button>
                  <button
                    onClick={() => onDelete(order.id)}
                    title="Delete Order"
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
              {expandedOrder === order.id && (
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <td colSpan={6} className="px-4 py-4">
                    <div className="flex justify-between items-start">
                      <div className="w-2/3">
                        <h4 className="text-sm font-bold mb-2 dark:text-gray-200">
                          Order Items:
                        </h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                          {order.items.map((item, index) => (
                            <li key={index}>
                              {item.quantity} x {item.partName}
                              <span className="ml-2 font-medium">
                                (${item.unitPrice.toFixed(2)} each)
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="w-1/3 p-2 bg-white dark:bg-gray-600 rounded-lg shadow-inner">
                        <h4 className="text-sm font-bold mb-2 dark:text-gray-200">
                          Update Status:
                        </h4>
                        <div className="flex space-x-2">
                          <select
                            value={tempStatus[order.id] ?? order.status}
                            onChange={(e) =>
                              setTempStatus((prev) => ({
                                ...prev,
                                [order.id]: e.target.value,
                              }))
                            }
                            className="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                          >
                            {ORDER_STATUSES.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => {
                              const newStatus =
                                tempStatus[order.id] ?? order.status;
                              onUpdateStatus(order.id, newStatus);
                              setTempStatus((prev) => {
                                const newState = { ...prev };
                                delete newState[order.id];
                                return newState;
                              });
                            }}
                            disabled={
                              (tempStatus[order.id] ?? order.status) ===
                              order.status
                            }
                            title="Apply Status Change"
                            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:bg-gray-400"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
