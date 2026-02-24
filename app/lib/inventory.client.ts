export interface InventoryItem {
  id: number;
  name: string;
  set: string;
  qty: number;
  price: string;
}

const INVENTORY_STORAGE_KEY = "tcg-vendor:inventory-items";

function isInventoryItem(value: unknown): value is InventoryItem {
  if (!value || typeof value !== "object") return false;

  let item = value as Record<string, unknown>;
  return (
    typeof item.id === "number" &&
    typeof item.name === "string" &&
    typeof item.set === "string" &&
    typeof item.qty === "number" &&
    typeof item.price === "string"
  );
}

export function readInventoryItems(): InventoryItem[] {
  if (typeof window === "undefined") return [];

  try {
    let raw = window.localStorage.getItem(INVENTORY_STORAGE_KEY);
    if (!raw) return [];

    let parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isInventoryItem);
  } catch {
    return [];
  }
}

export function addInventoryItem(item: InventoryItem) {
  if (typeof window === "undefined") return;

  let current = readInventoryItems();
  window.localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify([item, ...current]));
}
