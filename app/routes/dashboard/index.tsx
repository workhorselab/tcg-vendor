import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { useOutletContext } from "react-router";
import { PageContent } from "~/components/PageContent";
import { PageHeader } from "~/components/PageHeader";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Dashboard - TCG Vendor" }];
}

const stats = [
  {
    label: "Total Revenue",
    value: "$12,345",
    icon: DollarSign,
    change: "+12.5%",
  },
  { label: "Orders", value: "156", icon: ShoppingCart, change: "+8.2%" },
  { label: "Inventory Items", value: "2,340", icon: Package, change: "-2.1%" },
  {
    label: "Avg. Order Value",
    value: "$79.13",
    icon: TrendingUp,
    change: "+4.6%",
  },
  {
    label: "Shows this Month",
    value: "10",
    icon: TrendingUp,
    change: "+4.6%",
  },
  {
    label: "Slabs this Month",
    value: "10",
    icon: TrendingUp,
    change: "+4.6%",
  },
  {
    label: "Sealed this Month",
    value: "10",
    icon: TrendingUp,
    change: "+4.6%",
  },
  {
    label: "Trades this Month",
    value: "10",
    icon: TrendingUp,
    change: "+4.6%",
  },
  {
    label: "Purchases this Month",
    value: "10",
    icon: TrendingUp,
    change: "+4.6%",
  },
  {
    label: "Sales this Month",
    value: "10",
    icon: TrendingUp,
    change: "+4.6%",
  },
  {
    label: "Same Day Sales this Month",
    value: "10",
    icon: TrendingUp,
    change: "+4.6%",
  },
];

export default function DashboardIndex() {
  const { collapsed, setCollapsed } = useOutletContext<{
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
  }>();

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Welcome back. Here's an overview of your store."
        breadcrumbs={[{ label: "Dashboard" }]}
        collapsed={collapsed}
        onToggleSidebar={() => setCollapsed(!collapsed)}
      />

      <PageContent>
        <div className="space-y-6">
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
              <p className="text-gray-500 text-sm">
                No recent orders to display.
              </p>
            </div>
            <div className="bg-[#141414] border border-gray-800 rounded-xl p-5 min-h-[300px]">
              <h2 className="text-sm font-medium text-gray-400 mb-4">
                Low Stock Alerts
              </h2>
              <p className="text-gray-500 text-sm">
                All items are well stocked.
              </p>
            </div>
          </div>
        </div>
      </PageContent>
    </>
  );
}
