// pages/admin/Users.tsx
import React, { useState, useEffect } from "react";
import { UserService } from "../../services/userService";
import type { User, UpdateRoleDto } from "../../types/user.types";
// Import the new presentation component
import UserAdminTable from "../../components/admin/UserAdminTable";

const availableRoles = ["User", "Admin"];

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const result = await UserService.getAllUsers();

    if (result.success) {
      setUsers(result.data);
      setError(null);
    } else {
      setError(result.message ?? "Failed to fetch users.");
    }
    setLoading(false);
  };

  const handleRoleUpdate = async (userId: number, newRole: string) => {
    if (
      !window.confirm(
        `Are you sure you want to change user ${userId}'s role to ${newRole}?`
      )
    ) {
      return;
    }

    const updateData: UpdateRoleDto = { role: newRole };

    const result = await UserService.updateUserRole(userId, updateData);

    if (result.success) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === result.data.id
            ? { ...user, role: result.data.role }
            : user
        )
      );
      console.log(result.message);
    } else {
      console.error("Role update failed:", result.message);
    }
  };
  return (
    <UserAdminTable
      users={users}
      loading={loading}
      error={error}
      availableRoles={availableRoles}
      onRoleUpdate={handleRoleUpdate}
    />
  );
};

export default Users;
