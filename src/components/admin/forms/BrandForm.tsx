import React from "react";

interface BrandFormProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export const BrandForm: React.FC<BrandFormProps> = ({ formData, onChange }) => (
  <>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Name *
      </label>
      <input
        type="text"
        required
        value={formData.name || ""}
        onChange={(e) => onChange("name", e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Description
      </label>
      <textarea
        value={formData.description || ""}
        onChange={(e) => onChange("description", e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        rows={3}
      />
    </div>
  </>
);
