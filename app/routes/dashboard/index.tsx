import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard - TCG Vendor" }];
}

const stats = [
  { label: "Total Revenue", value: "$12,345", icon: DollarSign, change: "+12.5%" },
  { label: "Orders", value: "156", icon: ShoppingCart, change: "+8.2%" },
  { label: "Inventory Items", value: "2,340", icon: Package, change: "-2.1%" },
  { label: "Avg. Order Value", value: "$79.13", icon: TrendingUp, change: "+4.6%" },
];

export default function DashboardIndex() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Welcome back. Here's an overview of your store.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, change }) => (
          <div
            key={label}
            className="bg-[#141414] border border-gray-800 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">{label}</span>
              <Icon className="w-4 h-4 text-gray-500" />
            </div>
            <p className="text-2xl font-semibold">{value}</p>
            <p
              className={`text-xs mt-1 ${
                change.startsWith("+") ? "text-green-400" : "text-red-400"
              }`}
            >
              {change} from last month
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#141414] border border-gray-800 rounded-xl p-5 min-h-[300px]">
          <h2 className="text-sm font-medium text-gray-400 mb-4">
            Recent Orders
          </h2>
          <p className="text-gray-500 text-sm">No recent orders to display.</p>
        </div>
        <div className="bg-[#141414] border border-gray-800 rounded-xl p-5 min-h-[300px]">
          <h2 className="text-sm font-medium text-gray-400 mb-4">
            Low Stock Alerts
          </h2>
          <p className="text-gray-500 text-sm">All items are well stocked.</p>
        </div>
      </div>
    </div>
  );
}
