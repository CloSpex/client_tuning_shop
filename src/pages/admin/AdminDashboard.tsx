import { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { BrandService } from "../../services/brandService";
import { ModelService } from "../../services/modelService";
import { SpecificationService } from "../../services/specificationService";
import { PartService } from "../../services/partService";
import { EnumService } from "../../services/enumService";
import { PartCategoryService } from "../../services/partCategoryService";
import type { Brand } from "../../types/brand.types";
import type { Model } from "../../types/model.types";
import type { Specification } from "../../types/specification.types";
import type { Part } from "../../types/part.types";
import type { VehicleTypes } from "../../types/enum.types";
import type { PartCategory } from "../../types/partCategory.types";
import { BrandsTable } from "../../components/admin/tables/BrandsTable";
import { ModelsTable } from "../../components/admin/tables/ModelsTable";
import { SpecificationsTable } from "../../components/admin/tables/SpecificationsTable";
import { PartsTable } from "../../components/admin/tables/PartsTable";
import { FormModal } from "../../components/admin/FormModal";
import type {
  CreateDataType,
  ItemType,
  UpdateDataType,
} from "../../types/admin.types";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<
    "brands" | "models" | "specifications" | "parts"
  >("brands");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [specifications, setSpecifications] = useState<Specification[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [categories, setCategories] = useState<PartCategory[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleTypes>({
    engineTypes: [],
    transmissionTypes: [],
    bodyTypes: [],
  });

  const [editingItem, setEditingItem] = useState<ItemType | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterModel, setFilterModel] = useState("");
  const [filterSpec, setFilterSpec] = useState("");

  useEffect(() => {
    loadData();
    loadEnums();
    loadCategories();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "models") {
      setFilterModel("");
      setFilterSpec("");
    } else if (activeTab === "specifications") {
      setFilterSpec("");
    }
  }, [filterBrand, activeTab]);

  useEffect(() => {
    if (activeTab === "specifications") {
      setFilterSpec("");
    }
  }, [filterModel, activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      const brandsRes = await BrandService.getAllBrands();
      if (brandsRes.success) setBrands(brandsRes.data);

      const modelsRes = await ModelService.getAllModels();
      if (modelsRes.success) setModels(modelsRes.data);

      const specsRes = await SpecificationService.getAllSpecifications();
      if (specsRes.success) setSpecifications(specsRes.data);

      if (activeTab === "parts") {
        const res = await PartService.getAllParts();
        if (res.success) setParts(res.data);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadEnums = async () => {
    try {
      const res = await EnumService.getAllVehicleTypes();
      if (res.success) setVehicleTypes(res.data);
    } catch (error) {
      console.error("Failed to load enums:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await PartCategoryService.getAll();
      if (res.success) setCategories(res.data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const handleCreate = async (data: CreateDataType) => {
    setLoading(true);
    try {
      if (activeTab === "brands") {
        const res = await BrandService.createBrand(data as any);
        if (res.success) setBrands([...brands, res.data]);
      } else if (activeTab === "models") {
        const res = await ModelService.createModel(data as any);
        if (res.success) setModels([...models, res.data]);
      } else if (activeTab === "specifications") {
        const res = await SpecificationService.createSpecification(data as any);
        if (res.success) setSpecifications([...specifications, res.data]);
      } else if (activeTab === "parts") {
        const res = await PartService.createPart(data as any);
        if (res.success) setParts([...parts, res.data]);
      }
      setShowForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Failed to create:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: number, data: UpdateDataType) => {
    setLoading(true);
    try {
      if (activeTab === "brands") {
        const res = await BrandService.updateBrand(id, data as any);
        if (res.success)
          setBrands(brands.map((b) => (b.id === id ? res.data : b)));
      } else if (activeTab === "models") {
        const res = await ModelService.updateModel(id, data as any);
        if (res.success)
          setModels(models.map((m) => (m.id === id ? res.data : m)));
      } else if (activeTab === "specifications") {
        const res = await SpecificationService.updateSpecification(
          id,
          data as any
        );
        if (res.success)
          setSpecifications(
            specifications.map((s) => (s.id === id ? res.data : s))
          );
      } else if (activeTab === "parts") {
        const res = await PartService.updatePart(id, data as any);
        if (res.success)
          setParts(parts.map((p) => (p.id === id ? res.data : p)));
      }

      setShowForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Failed to update:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    setLoading(true);
    try {
      let res;
      if (activeTab === "brands") {
        res = await BrandService.deleteBrand(id);
        if (res.success) setBrands(brands.filter((b) => b.id !== id));
      } else if (activeTab === "models") {
        res = await ModelService.deleteModel(id);
        if (res.success) setModels(models.filter((m) => m.id !== id));
      } else if (activeTab === "specifications") {
        res = await SpecificationService.deleteSpecification(id);
        if (res.success)
          setSpecifications(specifications.filter((s) => s.id !== id));
      } else if (activeTab === "parts") {
        res = await PartService.deletePart(id);
        if (res.success) setParts(parts.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setLoading(false);
    }
  };

  const openCreateForm = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const openEditForm = (item: ItemType) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const getFilteredData = () => {
    let data: ItemType[] = [];
    if (activeTab === "brands") data = brands;
    else if (activeTab === "models") data = models;
    else if (activeTab === "specifications") data = specifications;
    else if (activeTab === "parts") data = parts;

    if (searchTerm) {
      data = data.filter(
        (item) =>
          ("name" in item &&
            item.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
          ("question" in item &&
            typeof item.question === "string" &&
            item.question.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return data;
  };

  const getAvailableModels = () => {
    if (!filterBrand) return models;
    return models.filter((m) => m.brandId === parseInt(filterBrand));
  };

  const getAvailableSpecifications = () => {
    if (!filterModel) return specifications;
    return specifications.filter((s) => s.modelId === parseInt(filterModel));
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Admin Dashboard
          </h1>

          <div className="flex gap-2 mb-6 border-b">
            {["brands", "models", "specifications", "parts"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab as any);
                  setSearchTerm("");
                  setFilterBrand("");
                  setFilterModel("");
                  setFilterSpec("");
                }}
                className={`px-6 py-3 font-medium capitalize transition ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-4 mb-6 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {(activeTab === "models" ||
              activeTab === "specifications" ||
              activeTab === "parts") && (
              <select
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Brands</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            )}

            {(activeTab === "specifications" || activeTab === "parts") && (
              <select
                value={filterModel}
                onChange={(e) => setFilterModel(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={!filterBrand}
              >
                <option value="">All Models</option>
                {getAvailableModels().map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            )}

            {activeTab === "parts" && (
              <select
                value={filterSpec}
                onChange={(e) => setFilterSpec(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={!filterModel}
              >
                <option value="">All Specifications</option>
                {getAvailableSpecifications().map((s) => (
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
            )}

            <button
              onClick={openCreateForm}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {activeTab === "brands" && (
                <BrandsTable
                  data={getFilteredData() as Brand[]}
                  onEdit={openEditForm}
                  onDelete={handleDelete}
                />
              )}
              {activeTab === "models" && (
                <ModelsTable
                  data={getFilteredData() as Model[]}
                  brands={brands}
                  selectedBrandId={filterBrand ? parseInt(filterBrand) : null}
                  onEdit={openEditForm}
                  onDelete={handleDelete}
                />
              )}
              {activeTab === "specifications" && (
                <SpecificationsTable
                  data={getFilteredData() as Specification[]}
                  models={models}
                  vehicleTypes={vehicleTypes}
                  selectedModelId={filterModel ? parseInt(filterModel) : null}
                  onEdit={openEditForm}
                  onDelete={handleDelete}
                />
              )}
              {activeTab === "parts" && (
                <PartsTable
                  data={getFilteredData() as Part[]}
                  specifications={specifications}
                  categories={categories}
                  models={models}
                  vehicleTypes={vehicleTypes}
                  selectedSpecificationId={
                    filterSpec ? parseInt(filterSpec) : null
                  }
                  onEdit={openEditForm}
                  onDelete={handleDelete}
                />
              )}
            </>
          )}
        </div>
      </div>

      {showForm && (
        <FormModal
          type={activeTab}
          item={editingItem}
          brands={brands}
          models={models}
          specifications={specifications}
          categories={categories}
          vehicleTypes={vehicleTypes}
          onSave={(data) =>
            editingItem
              ? handleUpdate(editingItem.id, data as UpdateDataType)
              : handleCreate(data as CreateDataType)
          }
          onClose={closeForm}
          loading={loading}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
