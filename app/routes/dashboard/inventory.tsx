import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import { DataTable } from "~/components/DataTable";
import { PageContent } from "~/components/PageContent";
import { PageHeader } from "~/components/PageHeader";
import { TestLink } from "~/components/TestLink";
import { type InventoryItem, readInventoryItems } from "~/lib/inventory.client";
import type { Route } from "./+types/inventory";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Inventory - TCG Vendor" }];
}

const mockItems: InventoryItem[] = [
  {
    id: 1,
    name: "Charizard VMAX",
    set: "Shining Fates",
    qty: 3,
    price: "$120.00",
  },
  {
    id: 2,
    name: "Pikachu VMAX",
    set: "Vivid Voltage",
    qty: 12,
    price: "$45.00",
  },
  { id: 3, name: "Mewtwo GX", set: "Shining Legends", qty: 7, price: "$28.50" },
  {
    id: 4,
    name: "Lugia V Alt Art",
    set: "Silver Tempest",
    qty: 1,
    price: "$210.00",
  },
  {
    id: 5,
    name: "Umbreon VMAX Alt Art",
    set: "Evolving Skies",
    qty: 2,
    price: "$340.00",
  },
];

export default function Inventory() {
  const { collapsed, setCollapsed } = useOutletContext<{
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
  }>();
  const [savedItems, setSavedItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    setSavedItems(readInventoryItems());
  }, []);

  const items = useMemo(() => [...savedItems, ...mockItems], [savedItems]);
  const columns = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        render: (item: InventoryItem) => (
          <span className="font-medium">{item.name}</span>
        ),
      },
      {
        key: "set",
        header: "Set",
        render: (item: InventoryItem) => (
          <span className="text-gray-400">{item.set}</span>
        ),
      },
      {
        key: "qty",
        header: "Qty",
        render: (item: InventoryItem) => (
          <span className="text-gray-400">{item.qty}</span>
        ),
      },
      {
        key: "price",
        header: "Price",
        render: (item: InventoryItem) => (
          <span className="text-gray-400">{item.price}</span>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <PageHeader
        title="Inventory"
        description="Manage your card inventory and listings."
        breadcrumbs={[{ label: "Inventory" }]}
        collapsed={collapsed}
        onToggleSidebar={() => setCollapsed(!collapsed)}
        action={
          <TestLink
            to="/app/inventory/new"
            className="inline-flex items-center gap-2 h-9 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white no-underline"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </TestLink>
        }
      />

      <PageContent>
        <div className="space-y-6">
          {/* <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <TextField
                placeholder="Search inventory..."
                className="w-full [&_input]:bg-[#141414] [&_input]:border-gray-800 [&_input]:text-gray-300 [&_input]:placeholder-gray-500 [&_input]:pl-9 [&_input]:pr-4"
              />
            </div>
          </div> */}
          <DataTable
            title="Inventory Items"
            description="Your current stock and pricing."
            columns={columns}
            data={items}
            searchPlaceholder="Search inventory..."
          />
        </div>
      </PageContent>
    </>
  );
}
