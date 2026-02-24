import {
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import { Form, NavLink, Outlet, redirect } from "react-router";
import { auth } from "~/lib/auth";
import { requireAuth } from "~/lib/session.server";
import type { Route } from "./+types/dashboard";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await requireAuth(request);
  return { user: session.user };
}

export async function action({ request }: Route.ActionArgs) {
  const response = await auth.api.signOut({
    headers: request.headers,
    asResponse: true,
  });

  const headers = new Headers();
  const setCookie = response.headers.get("set-cookie");
  if (setCookie) {
    headers.append("Set-Cookie", setCookie);
  }

  return redirect("/login", { headers });
}

const navItems = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/inventory", label: "Inventory", icon: Package },
  { to: "/app/orders", label: "Orders", icon: ShoppingCart },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-[72px]" : "w-[260px]"
        } bg-[#18181b] border-r border-gray-800 flex flex-col shrink-0 transition-all duration-300`}
      >
        {/* Logo */}
        <div className="h-[68px] px-4 flex items-center border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            {!collapsed && (
              <span className="text-white font-semibold text-sm uppercase tracking-wide">
                TradeUp
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {/* Dashboard */}
          <NavLink
            to="/app"
            end
            className={({ isActive }) =>
              `flex items-center ${collapsed ? "justify-center" : "gap-3"} px-3 py-2 mb-4 rounded-md no-underline transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-900"
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Dashboard</span>}
          </NavLink>

          {/* Main Section */}
          <div className="mb-6">
            {!collapsed && (
              <div className="px-3 mb-2">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Main
                </div>
              </div>
            )}
            <div className="space-y-1">
              <NavLink
                to="/app/inventory"
                className={({ isActive }) =>
                  `flex items-center ${collapsed ? "justify-center" : "gap-3"} px-3 py-2 rounded-md no-underline transition-colors ${
                    isActive
                      ? "text-white bg-gray-900"
                      : "text-gray-400 hover:text-white hover:bg-gray-900"
                  }`
                }
              >
                <Package className="w-4 h-4 shrink-0" />
                {!collapsed && <span className="text-sm">Inventory</span>}
              </NavLink>

              <NavLink
                to="/app/orders"
                className={({ isActive }) =>
                  `flex items-center ${collapsed ? "justify-center" : "gap-3"} px-3 py-2 rounded-md no-underline transition-colors ${
                    isActive
                      ? "text-white bg-gray-900"
                      : "text-gray-400 hover:text-white hover:bg-gray-900"
                  }`
                }
              >
                <ShoppingCart className="w-4 h-4 shrink-0" />
                {!collapsed && <span className="text-sm">Orders</span>}
              </NavLink>
            </div>
          </div>

          {/* Settings Section */}
          <div className="mb-6">
            {!collapsed && (
              <div className="px-3 mb-2">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Settings
                </div>
              </div>
            )}
            <div className="space-y-1">
              <NavLink
                to="/app/settings"
                className={({ isActive }) =>
                  `flex items-center ${collapsed ? "justify-center" : "gap-3"} px-3 py-2 rounded-md no-underline transition-colors ${
                    isActive
                      ? "text-white bg-gray-900"
                      : "text-gray-400 hover:text-white hover:bg-gray-900"
                  }`
                }
              >
                <Settings className="w-4 h-4 shrink-0" />
                {!collapsed && <span className="text-sm">Settings</span>}
              </NavLink>
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="px-3 py-4 border-t border-gray-800">
          <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} px-3 py-2 mb-2 rounded-md`}>
            <div className="w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center text-xs font-medium text-white shrink-0">
              {loaderData.user.name?.charAt(0).toUpperCase() || "U"}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">
                  {loaderData.user.name || "User"}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {loaderData.user.email}
                </div>
              </div>
            )}
          </div>
          <Form method="post">
            <button
              type="submit"
              className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3"} px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-900 transition-colors text-sm`}
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {!collapsed && <span>Log out</span>}
            </button>
          </Form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet context={{ collapsed, setCollapsed }} />
      </main>
    </div>
  );
}
