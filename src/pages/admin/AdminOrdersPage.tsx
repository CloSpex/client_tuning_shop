import React, { useState, useEffect } from "react";
import { OrderService } from "../../services/orderService";
import type { Order, UpdateOrder } from "../../types/order.types";
import { RefreshCcw } from "lucide-react";

import { OrdersTable } from "../../components/admin/tables/OrdersTable";

const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllOrders = async () => {
    setLoading(true);
    const result = await OrderService.getAllOrders();
    if (result.success) {
      const sortedOrders = result.data.sort(
        (a, b) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
      setOrders(sortedOrders);
      setError(null);
    } else {
      setError(result.message || "Failed to load all orders.");
      setOrders([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleUpdateStatus = async (orderId: number, newStatus: string) => {
    if (
      window.confirm(
        `Are you sure you want to change order ${orderId} status to ${newStatus}?`
      )
    ) {
      try {
        const updatePayload: UpdateOrder = { status: newStatus };
        const result = await OrderService.updateOrder(orderId, updatePayload);

        if (result.success) {
          setOrders(
            orders.map((order) =>
              order.id === orderId ? { ...order, status: newStatus } : order
            )
          );
        } else {
          alert(`Failed to update status: ${result.message}`);
        }
      } catch (e) {
        alert("An error occurred during status update.");
      }
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    if (
      window.confirm(
        `Are you sure you want to delete order ${orderId}? This action cannot be undone.`
      )
    ) {
      try {
        const result = await OrderService.deleteOrder(orderId);

        if (result.success) {
          setOrders(orders.filter((order) => order.id !== orderId));
        } else {
          alert(`Failed to delete order: ${result.message}`);
        }
      } catch (e) {
        alert("An error occurred during order deletion.");
      }
    }
  };

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-gray-100">
          Order Management
        </h1>
        <button
          onClick={fetchAllOrders}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
        >
          <RefreshCcw className="w-5 h-5" />
          <span>{loading ? "Loading..." : "Refresh Orders"}</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
        {loading ? (
          <p className="text-center py-8">Loading all orders...</p>
        ) : (
          <OrdersTable
            data={orders}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDeleteOrder}
          />
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
