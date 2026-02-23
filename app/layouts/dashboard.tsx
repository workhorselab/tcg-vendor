import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import { Form, NavLink, Outlet, redirect, useNavigation } from "react-router";
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
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <div className="relative shrink-0">
        <aside
          className={`${
            collapsed ? "w-16" : "w-60"
          } flex flex-col h-full border-r border-gray-800 bg-[#0a0a0a] transition-all duration-200`}
        >
          <div className="flex items-center gap-2 px-4 h-14 border-b border-gray-800">
            <div className="w-8 h-8 bg-linear-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            {!collapsed && (
              <span className="font-semibold text-lg truncate">TradeUp</span>
            )}
          </div>

          <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  } ${collapsed ? "justify-center" : ""}`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span className="truncate">{label}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-gray-800 p-2 space-y-1">
            {!collapsed && (
              <div className="px-3 py-2">
                <p className="text-sm font-medium truncate">
                  {loaderData.user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {loaderData.user.email}
                </p>
              </div>
            )}
            <Form method="post">
              <button
                type="submit"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors w-full ${
                  collapsed ? "justify-center" : ""
                }`}
              >
                <LogOut className="w-5 h-5 shrink-0" />
                {!collapsed && <span>Log out</span>}
              </button>
            </Form>
          </div>
        </aside>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-7 -right-3 z-40 w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      <main className="relative flex-1 overflow-y-auto">
        {isNavigating && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-orange-500 animate-pulse z-50" />
        )}
        <Outlet />
      </main>
    </div>
  );
}
