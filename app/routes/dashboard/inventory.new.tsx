import { Form, redirect, useOutletContext } from "react-router";
import { PageContent } from "~/components/PageContent";
import { PageHeader } from "~/components/PageHeader";
import { Button } from "~/components/ui/Button";
import { db } from "~/lib/prisma.server";
import { requireAuth } from "~/lib/session.server";
import type { Route } from "./+types/inventory.new";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Add Inventory Item - TCG Vendor" }];
}

export async function action({ request }: Route.ActionArgs) {
  const session = await requireAuth(request);
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const set = formData.get("set") as string;
  const qty = parseInt(formData.get("qty") as string);
  const price = formData.get("price") as string;
  const assetType = (formData.get("assetType") as string) || "raw_card";
  const notes = formData.get("notes") as string;

  await db.asset.create({
    data: {
      user_id: session.user.id,
      asset_type: assetType as any,
      asset_status: "owned",
      notes: notes || null,
      metadata: {
        name,
        set,
        quantity: qty,
        price,
      },
    },
  });

  return redirect("/app/inventory");
}

export default function NewInventoryItem() {
  const { collapsed, setCollapsed } = useOutletContext<{
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
  }>();

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
          <Form method="post" className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Card Name</label>
              <input
                required
                name="name"
                className="w-full bg-[#101010] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500"
                placeholder="Charizard VMAX"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Set</label>
              <input
                required
                name="set"
                className="w-full bg-[#101010] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500"
                placeholder="Shining Fates"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Type</label>
              <select
                name="assetType"
                defaultValue="raw_card"
                className="w-full bg-[#101010] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500"
              >
                <option value="raw_card">Raw Card</option>
                <option value="graded_card">Graded Card</option>
                <option value="sealed_product">Sealed Product</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Quantity</label>
                <input
                  required
                  min={1}
                  type="number"
                  name="qty"
                  defaultValue="1"
                  className="w-full bg-[#101010] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Price</label>
                <input
                  required
                  name="price"
                  className="w-full bg-[#101010] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500"
                  placeholder="$120.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Notes (Optional)</label>
              <textarea
                name="notes"
                rows={3}
                className="w-full bg-[#101010] border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500"
                placeholder="Additional notes about this item..."
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Button type="submit">Save Item</Button>
              <Button type="button" variant="secondary">
                <a href="/app/inventory" className="no-underline">Cancel</a>
              </Button>
            </div>
          </Form>
        </div>
      </PageContent>
    </>
  );
}
