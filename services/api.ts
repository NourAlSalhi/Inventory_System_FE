import type { InventoryItem } from "../types";
import { API_URL } from "@/constant";

export const fetchLocations = async (type?: string) => {
  const res = await fetch(`${API_URL}/locations?type=${type || ""}`);
  if (!res.ok) throw new Error("Failed to fetch locations");
  return res.json();
};

export async function getInventoryByLocation(
  locationId: number,
): Promise<InventoryItem[]> {
  const res = await fetch(`${API_URL}/inventory/${locationId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch inventory");
  }
  return res.json();
}

export const transferStock = async (payload: {
  product_id: number;
  from_location_id: number;
  to_location_id: number;
  quantity: number;
}) => {
  const res = await fetch(`${API_URL}/transfers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
};
