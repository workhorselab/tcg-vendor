import { useOutletContext } from "react-router";
import { DataTable } from "~/components/DataTable";
import { PageContent } from "~/components/PageContent";
import { PageHeader } from "~/components/PageHeader";
import type { Route } from "./+types/orders";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Orders - TCG Vendor" }];
}

const mockOrders = [
  {
    id: "ORD-001",
    customer: "Alice M.",
    items: 3,
    total: "$245.00",
    status: "Shipped",
    date: "Feb 20, 2026",
  },
  {
    id: "ORD-002",
    customer: "Bob K.",
    items: 1,
    total: "$120.00",
    status: "Processing",
    date: "Feb 21, 2026",
  },
  {
    id: "ORD-003",
    customer: "Carol S.",
    items: 5,
    total: "$89.50",
    status: "Delivered",
    date: "Feb 18, 2026",
  },
  {
    id: "ORD-004",
    customer: "Dave R.",
    items: 2,
    total: "$560.00",
    status: "Pending",
    date: "Feb 22, 2026",
  },
];

const statusColor: Record<string, string> = {
  Shipped: "bg-blue-500/10 text-blue-400",
  Processing: "bg-yellow-500/10 text-yellow-400",
  Delivered: "bg-green-500/10 text-green-400",
  Pending: "bg-gray-500/10 text-gray-400",
};

export default function Orders() {
  const { collapsed, setCollapsed } = useOutletContext<{
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
  }>();

  return (
    <>
      <PageHeader
        title="Orders"
        description="Track and manage customer orders."
        breadcrumbs={[{ label: "Orders" }]}
        collapsed={collapsed}
        onToggleSidebar={() => setCollapsed(!collapsed)}
      />

      <PageContent>
        <DataTable
          title="Orders"
          description="Recent and historical customer orders."
          searchPlaceholder="Search orders..."
          columns={[
            {
              key: "id",
              header: "Order",
              render: (order) => <span className="font-medium">{order.id}</span>,
            },
            {
              key: "customer",
              header: "Customer",
              render: (order) => <span className="text-gray-400">{order.customer}</span>,
            },
            {
              key: "items",
              header: "Items",
              render: (order) => <span className="text-gray-400">{order.items}</span>,
            },
            {
              key: "total",
              header: "Total",
              render: (order) => <span className="text-gray-400">{order.total}</span>,
            },
            {
              key: "status",
              header: "Status",
              render: (order) => (
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    statusColor[order.status] ?? ""
                  }`}
                >
                  {order.status}
                </span>
              ),
            },
            {
              key: "date",
              header: "Date",
              render: (order) => <span className="text-gray-400">{order.date}</span>,
            },
          ]}
          data={mockOrders}
        />
      </PageContent>
    </>
  );
}
