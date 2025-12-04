export interface NavigationItem {
  path: string;
  label: string;
  requiresAuth?: boolean;
  roles?: string[];
}

export const navigationItems: NavigationItem[] = [
  { path: "/", label: "Home" },
  { path: "/orders", label: "My Orders", requiresAuth: true, roles: ["User"] },
  {
    path: "/admin/orders",
    label: "Manage Orders",
    requiresAuth: true,
    roles: ["Admin"],
  },
  { path: "/users", label: "Users", requiresAuth: true, roles: ["Admin"] },
  {
    path: "/admin-dashboard",
    label: "Admin Dashboard",
    requiresAuth: true,
    roles: ["Admin"],
  },
];
