import { type FormEvent, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { PageContent } from "~/components/PageContent";
import { PageHeader } from "~/components/PageHeader";
import { Button } from "~/components/ui/Button";
import { addInventoryItem } from "~/lib/inventory.client";
import type { Route } from "./+types/inventory.new";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Add Inventory Item - TCG Vendor" }];
}

export default function NewInventoryItem() {
  const navigate = useNavigate();
  const { collapsed, setCollapsed } = useOutletContext<{
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
  }>();

  const [name, setName] = useState("");
  const [setNameValue, setSetNameValue] = useState("");
  const [qty, setQty] = useState("1");
  const [price, setPrice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedPrice = price.trim().startsWith("$")
      ? price.trim()
      : `$${price.trim()}`;

    addInventoryItem({
      id: Date.now(),
      name: name.trim(),
      set: setNameValue.trim(),
      qty: Number(qty),
      price: normalizedPrice,
    });

    navigate("/app/inventory");
  }

  return (
    <>
      <PageHeader
        title="Add Inventory Item"
        description="Create a new inventory entry."
        breadcrumbs={[{ label: "Inventory", href: "/app/inventory" }, { label: "New" }]}
        collapsed={collapsed}
        onToggleSidebar={() => setCollapsed(!collapsed)}
      />

      <PageContent>
        <div className="max-w-2xl bg-[#141414] border border-gray-800 rounded-xl p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Card Name</label>
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full bg-[#101010] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500"
                placeholder="Charizard VMAX"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Set</label>
              <input
                required
                value={setNameValue}
                onChange={(event) => setSetNameValue(event.target.value)}
                className="w-full bg-[#101010] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500"
                placeholder="Shining Fates"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Quantity</label>
                <input
                  required
                  min={1}
                  type="number"
                  value={qty}
                  onChange={(event) => setQty(event.target.value)}
                  className="w-full bg-[#101010] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Price</label>
                <input
                  required
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  className="w-full bg-[#101010] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500"
                  placeholder="$120.00"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Button type="submit">Save Item</Button>
              <Button type="button" variant="secondary" onPress={() => navigate("/app/inventory")}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </PageContent>
    </>
  );
}
