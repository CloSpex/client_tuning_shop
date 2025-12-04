import React, { useState, useEffect } from "react";
import { OrderService } from "../../services/orderService";
import type { Order } from "../../types/order.types";
import { ShoppingBag } from "lucide-react";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const result = await OrderService.getMyOrders();
      if (result.success) {
        const sortedOrders = result.data.sort(
          (a, b) =>
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );
        setOrders(sortedOrders);
      } else {
        setError(result.message || "Failed to load orders.");
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading your orders...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-400" />
        <h2 className="text-xl font-semibold mt-4">No Orders Found</h2>
        <p className="text-gray-500">Start shopping to see your orders here!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border-l-4 border-blue-500 dark:border-blue-600"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-gray-900 dark:text-gray-100 font-semibold">
                Order #{order.id}
              </h2>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {order.status}
              </span>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              Date: {new Date(order.orderDate).toLocaleDateString()}
            </p>
            <p className="text-lg  text-gray-900 dark:text-gray-100  font-bold">
              Total: ${order.totalPrice.toFixed(2)}
            </p>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-md font-medium mb-2 text-gray-900 dark:text-gray-100 ">
                Items:
              </h3>
              <ul className="space-y-1">
                {order.items.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-700 dark:text-gray-300 flex justify-between"
                  >
                    <span>
                      {item.quantity}x {item.partName}
                    </span>
                    <span className="font-medium">
                      ${(item.quantity * item.unitPrice).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
