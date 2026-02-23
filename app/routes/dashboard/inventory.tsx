import { Plus, Search } from "lucide-react";
import { Button } from "~/components/ui/Button";
import type { Route } from "./+types/inventory";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Inventory - TCG Vendor" }];
}

const mockItems = [
  { id: 1, name: "Charizard VMAX", set: "Shining Fates", qty: 3, price: "$120.00" },
  { id: 2, name: "Pikachu VMAX", set: "Vivid Voltage", qty: 12, price: "$45.00" },
  { id: 3, name: "Mewtwo GX", set: "Shining Legends", qty: 7, price: "$28.50" },
  { id: 4, name: "Lugia V Alt Art", set: "Silver Tempest", qty: 1, price: "$210.00" },
  { id: 5, name: "Umbreon VMAX Alt Art", set: "Evolving Skies", qty: 2, price: "$340.00" },
];

export default function Inventory() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Inventory</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your card inventory and listings.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Item
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search inventory..."
            className="w-full bg-[#141414] border border-gray-800 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-gray-600"
          />
        </div>
      </div>

      <div className="bg-[#141414] border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400">
              <th className="text-left font-medium px-5 py-3">Name</th>
              <th className="text-left font-medium px-5 py-3">Set</th>
              <th className="text-left font-medium px-5 py-3">Qty</th>
              <th className="text-left font-medium px-5 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {mockItems.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-800/50 hover:bg-white/2 transition-colors"
              >
                <td className="px-5 py-3 font-medium">{item.name}</td>
                <td className="px-5 py-3 text-gray-400">{item.set}</td>
                <td className="px-5 py-3 text-gray-400">{item.qty}</td>
                <td className="px-5 py-3 text-gray-400">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
