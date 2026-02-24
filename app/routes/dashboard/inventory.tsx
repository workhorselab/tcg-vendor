import { Plus } from "lucide-react";
import { useMemo } from "react";
import { useOutletContext } from "react-router";
import { DataTable } from "~/components/DataTable";
import { PageContent } from "~/components/PageContent";
import { PageHeader } from "~/components/PageHeader";
import { TestLink } from "~/components/TestLink";
import { db } from "~/lib/prisma.server";
import { requireAuth } from "~/lib/session.server";
import type { Route } from "./+types/inventory";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Inventory - TCG Vendor" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await requireAuth(request);

  const assets = await db.asset.findMany({
    where: {
      user_id: session.user.id,
      deleted_at: null,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return { assets };
}

interface InventoryItem {
  id: number;
  name: string;
  set: string;
  qty: number;
  price: string;
  type: string;
}

export default function Inventory({ loaderData }: Route.ComponentProps) {
  const { collapsed, setCollapsed } = useOutletContext<{
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
  }>();

  const items = useMemo(() => {
    return loaderData.assets.map((asset) => {
      const metadata = asset.metadata as any;
      return {
        id: asset.id,
        name: metadata?.name || "Unknown",
        set: metadata?.set || "Unknown",
        qty: metadata?.quantity || 0,
        price: metadata?.price || "$0.00",
        type: asset.asset_type,
      };
    });
  }, [loaderData.assets]);
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
        key: "type",
        header: "Type",
        render: (item: InventoryItem) => (
          <span className="text-gray-400 capitalize">{item.type.replace('_', ' ')}</span>
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
