import React, { useState, useEffect, useMemo } from "react";
import { ShoppingCart, Car, Wrench, Loader2 } from "lucide-react";
import { BrandService } from "../../services/brandService";
import { ModelService } from "../../services/modelService";
import { SpecificationService } from "../../services/specificationService";
import { PartCategoryService } from "../../services/partCategoryService";
import { PartService } from "../../services/partService";
import { OrderService } from "../../services/orderService";
import { useAuth } from "../../context/authContext";
import type { Brand } from "../../types/brand.types";
import type { Model } from "../../types/model.types";
import type { Specification } from "../../types/specification.types";
import type { Part } from "../../types/part.types";
import type { PartCategory } from "../../types/partCategory.types";
import type { CreateOrder, CreateOrderItem } from "../../types/order.types";
import { EnumService } from "../../services/enumService";
import type { VehicleTypes } from "../../types/enum.types";

interface CartItem {
  part: Part;
  quantity: number;
}

const CreateOrderPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [specifications, setSpecifications] = useState<Specification[]>([]);

  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
  const [selectedSpecification, setSelectedSpecification] =
    useState<Specification | null>(null);

  const [categories, setCategories] = useState<PartCategory[]>([]);
  const [allParts, setAllParts] = useState<Part[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [vehicleTypes, setVehicleTypes] = useState<VehicleTypes>({
    engineTypes: [],
    transmissionTypes: [],
    bodyTypes: [],
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("shoppingCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const loadEnums = async () => {
    try {
      const res = await EnumService.getAllVehicleTypes();
      if (res.success) setVehicleTypes(res.data);
    } catch (error) {
      console.error("Failed to load enums:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [brandsRes, categoriesRes, partsRes] = await Promise.all([
        BrandService.getAllBrands(),
        PartCategoryService.getAll(),
        PartService.getAllParts(),
      ]);

      if (brandsRes.success) setBrands(brandsRes.data);
      if (categoriesRes.success) setCategories(categoriesRes.data);
      if (partsRes.success) setAllParts(partsRes.data);
      loadEnums();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedBrandId) {
      const fetchModels = async () => {
        setIsLoading(true);
        const res = await ModelService.getModelsByBrandId(selectedBrandId);
        if (res.success) setModels(res.data);
        setIsLoading(false);
      };
      fetchModels();
    } else {
      setModels([]);
      setSelectedModelId(null);
    }
  }, [selectedBrandId]);

  useEffect(() => {
    if (selectedModelId) {
      const fetchSpecs = async () => {
        setIsLoading(true);
        const res = await SpecificationService.getSpecificationsByModelId(
          selectedModelId
        );
        if (res.success) setSpecifications(res.data);
        setIsLoading(false);
      };
      fetchSpecs();
    } else {
      setSpecifications([]);
      setSelectedSpecification(null);
    }
  }, [selectedModelId]);

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }, [cart]);

  const filteredParts = useMemo(() => {
    if (!selectedSpecification) return [];

    let parts = allParts.filter(
      (p) => p.carSpecificationId === selectedSpecification.id
    );

    if (selectedCategoryId) {
      parts = parts.filter((p) => p.partCategoryId === selectedCategoryId);
    }

    parts = parts.filter((p) => (p.quantity ?? 0) > 0);

    return parts;
  }, [allParts, selectedSpecification, selectedCategoryId]);

  const addToCart = (part: Part) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.part.id === part.id);
      if (existingItem) {
        const maxQuantity = part.quantity ?? 0;
        const newQuantity = Math.min(existingItem.quantity + 1, maxQuantity);

        if (newQuantity === existingItem.quantity) {
          setMessage({
            type: "error",
            text: `Maximum stock reached for ${part.name}`,
          });
          return prevCart;
        }

        return prevCart.map((item) =>
          item.part.id === part.id ? { ...item, quantity: newQuantity } : item
        );
      }
      return [...prevCart, { part, quantity: 1 }];
    });
    setMessage({ type: "success", text: `${part.name} added to cart!` });
  };

  const updateCartQuantity = (partId: number, newQuantity: number) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter((item) => item.part.id !== partId);
      }
      return prevCart.map((item) => {
        if (item.part.id === partId) {
          const maxQuantity = item.part.quantity ?? 0;
          const quantity = Math.min(newQuantity, maxQuantity);
          if (quantity === 0) return item;
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const removeFromCart = (partId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.part.id !== partId));
  };

  const cartTotal = cart.reduce(
    (total, item) => total + (item.part.price ?? 0) * item.quantity,
    0
  );

  const handleCreateOrder = async () => {
    if (!isAuthenticated) {
      setMessage({
        type: "error",
        text: "You must be logged in to place an order.",
      });
      return;
    }
    if (cart.length === 0) {
      setMessage({ type: "error", text: "Your cart is empty." });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const items: CreateOrderItem[] = cart.map((item) => ({
      partId: item.part.id,
      quantity: item.quantity,
    }));

    const createOrderDto: CreateOrder = {
      items: items,
    };

    try {
      const result = await OrderService.createOrder(createOrderDto);

      if (result.success) {
        setMessage({
          type: "success",
          text: `Order #${result.data.id} placed successfully! Thank you.`,
        });
        setCart([]);
      } else {
        setMessage({
          type: "error",
          text:
            result.message || "Failed to place order due to a server error.",
        });
      }
    } catch (e) {
      setMessage({
        type: "error",
        text: "An unexpected error occurred during checkout.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  if (!isAuthenticated) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mt-2">Please log in to create an order.</p>
      </div>
    );
  }

  const currentCategoryName =
    categories.find((c) => c.id === selectedCategoryId)?.name || "All Parts";

  return (
    <div className="container mx-auto py-8 ">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2 text-gray-900 dark:text-gray-100">
        <ShoppingCart className="w-7 h-7 " /> Create New Order
      </h1>

      {message && (
        <div
          className={`p-4 mb-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex flex-col items-start text-gray-900 dark:text-gray-100">
            <Car className="w-6 h-6 mb-1" />
            <span className="block">1. Select Your Vehicle Spec</span>
          </h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">Brand:</span>
              <select
                value={selectedBrandId ?? ""}
                onChange={(e) =>
                  setSelectedBrandId(parseInt(e.target.value) || null)
                }
                className="mt-1 block w-full dark:text-gray-200 rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600"
                disabled={isLoading}
              >
                <option value="">Select Brand</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block" aria-disabled={!selectedBrandId}>
              <span className="text-gray-700 dark:text-gray-300">Model:</span>
              <select
                value={selectedModelId ?? ""}
                onChange={(e) =>
                  setSelectedModelId(parseInt(e.target.value) || null)
                }
                className="mt-1 block w-full dark:text-gray-200 rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600"
                disabled={!selectedBrandId || isLoading}
              >
                <option value="">Select Model</option>
                {models.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block" aria-disabled={!selectedModelId}>
              <span className="text-gray-700 dark:text-gray-300">
                Specification:
              </span>
              <select
                value={selectedSpecification?.id ?? ""}
                onChange={(e) => {
                  const specId = parseInt(e.target.value) || null;
                  const spec =
                    specifications.find((s) => s.id === specId) ?? null;
                  setSelectedSpecification(spec);
                }}
                className="mt-1 block w-full dark:text-gray-200 rounded-md border-gray-300 shadow-sm dark:bg-gray-700 dark:border-gray-600"
                disabled={
                  !selectedModelId || isLoading || specifications.length === 0
                }
              >
                <option value="">Select Specification</option>
                {specifications.map((s) => (
                  <option key={s.id} value={s.id}>
                    {
                      vehicleTypes.bodyTypes.find((e) => e.id === s.bodyTypeId)
                        ?.name
                    }
                    ,{" "}
                    {
                      vehicleTypes.transmissionTypes.find(
                        (e) => e.id === s.transmissionTypeId
                      )?.name
                    }
                    ,{" "}
                    {
                      vehicleTypes.engineTypes.find(
                        (e) => e.id === s.engineTypeId
                      )?.name
                    }
                    , {s.powerKilowatts}kw, {s.volumeLitres}l, {s.yearStart}-
                    {s.yearEnd ?? " now"}
                  </option>
                ))}
              </select>
            </label>

            {selectedSpecification && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/50 rounded-md text-sm">
                <p className="font-semibold text-blue-800 dark:text-blue-200">
                  Selected Spec:
                </p>
                <p className="text-blue-700 dark:text-blue-300">
                  {selectedSpecification.powerKilowatts} |{" "}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex flex-col items-start text-gray-900 dark:text-gray-100">
            <Wrench className="w-6 h-6 mb-1" />
            <span className="block">2. Browse & Select Parts</span>
          </h2>

          {!selectedSpecification ? (
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg text-center">
              Please select a **Specification** in the left panel to browse
              compatible parts.
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 items-center mb-4">
                <span className="font-medium dark:text-gray-300 mr-2">
                  Category:
                </span>

                <button
                  onClick={() => setSelectedCategoryId(null)}
                  className={`px-3 py-1 text-sm rounded-full transition ${
                    !selectedCategoryId
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  All Parts
                </button>

                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategoryId(c.id)}
                    className={`px-3 py-1 text-sm rounded-full transition ${
                      selectedCategoryId === c.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredParts.length === 0 ? (
                  <p className="md:col-span-2 text-center py-8 text-gray-500">
                    No parts found in the **{currentCategoryName}** category for
                    this specification.
                  </p>
                ) : (
                  filteredParts.map((part) => (
                    <div
                      key={part.id}
                      className="bg-white  dark:text-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-md flex justify-between items-center"
                    >
                      <div className="flex-grow pr-4 min-w-0">
                        {" "}
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 **truncate**">
                          {part.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ${part.price?.toFixed(2)} | Stock:{" "}
                          {part.quantity ?? 0}
                        </p>
                        <img
                          src={part.imagePath}
                          alt={part.name}
                          className="w-16 h-16 object-cover mt-2 rounded-md"
                        />
                      </div>
                      <button
                        onClick={() => addToCart(part)}
                        disabled={(part.quantity ?? 0) === 0}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:bg-gray-400"
                      >
                        {(part.quantity ?? 0) === 0
                          ? "Out of Stock"
                          : "Add to Cart"}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex flex-col items-start text-gray-900 dark:text-gray-100">
            <ShoppingCart className="w-6 h-6 mb-1" />
            <span className="block">3. Order Summary</span>
          </h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <ul className="space-y-3 max-h-60 overflow-y-auto">
              {cart.length === 0 ? (
                <li className="text-gray-500 dark:text-gray-400 text-center py-4">
                  Cart is empty. Add parts to proceed.
                </li>
              ) : (
                cart.map((item) => (
                  <li
                    key={item.part.id}
                    className="flex justify-between items-center text-sm border-b pb-2 last:border-b-0 dark:border-gray-700"
                  >
                    <div className="flex-1 pr-2">
                      <p className="font-medium text-gray-900 dark:text-gray-200">
                        {item.part.name}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        ${item.part.price?.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="1"
                        max={item.part.quantity ?? 1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartQuantity(
                            item.part.id,
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-16 text-center rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-200"
                      />
                      <button
                        onClick={() => removeFromCart(item.part.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full"
                      >
                        &times;
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>

            <div className="mt-4 pt-4 border-t dark:border-gray-700">
              <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-gray-100">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCreateOrder}
                disabled={
                  cart.length === 0 || isLoading || !selectedSpecification
                }
                className="w-full mt-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Wrench className="w-5 h-5" />
                )}
                <span>{isLoading ? "Placing Order..." : "Place Order"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;
