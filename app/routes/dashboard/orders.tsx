import type { Route } from "./+types/orders";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Orders - TCG Vendor" }];
}

const mockOrders = [
  { id: "ORD-001", customer: "Alice M.", items: 3, total: "$245.00", status: "Shipped", date: "Feb 20, 2026" },
  { id: "ORD-002", customer: "Bob K.", items: 1, total: "$120.00", status: "Processing", date: "Feb 21, 2026" },
  { id: "ORD-003", customer: "Carol S.", items: 5, total: "$89.50", status: "Delivered", date: "Feb 18, 2026" },
  { id: "ORD-004", customer: "Dave R.", items: 2, total: "$560.00", status: "Pending", date: "Feb 22, 2026" },
];

const statusColor: Record<string, string> = {
  Shipped: "bg-blue-500/10 text-blue-400",
  Processing: "bg-yellow-500/10 text-yellow-400",
  Delivered: "bg-green-500/10 text-green-400",
  Pending: "bg-gray-500/10 text-gray-400",
};

export default function Orders() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Orders</h1>
        <p className="text-gray-400 text-sm mt-1">
          Track and manage customer orders.
        </p>
      </div>

      <div className="bg-[#141414] border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400">
              <th className="text-left font-medium px-5 py-3">Order</th>
              <th className="text-left font-medium px-5 py-3">Customer</th>
              <th className="text-left font-medium px-5 py-3">Items</th>
              <th className="text-left font-medium px-5 py-3">Total</th>
              <th className="text-left font-medium px-5 py-3">Status</th>
              <th className="text-left font-medium px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-800/50 hover:bg-white/2 transition-colors"
              >
                <td className="px-5 py-3 font-medium">{order.id}</td>
                <td className="px-5 py-3 text-gray-400">{order.customer}</td>
                <td className="px-5 py-3 text-gray-400">{order.items}</td>
                <td className="px-5 py-3 text-gray-400">{order.total}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      statusColor[order.status] ?? ""
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-400">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
