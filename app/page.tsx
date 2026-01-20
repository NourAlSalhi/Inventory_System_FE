"use client";

import { useEffect, useState } from "react";
import InventoryTable from "@/components/InventoryTable";
import TransferForm from "@/components/TransferForm";
import { getInventoryByLocation } from "@/services/api";
import { InventoryItem } from "@/types";

export default function Page() {
  const [locationId, setLocationId] = useState(2);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadInventory = async (locId: number = locationId) => {
    setLoading(true);
    try {
      const data = await getInventoryByLocation(locId);
      setInventory(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, [locationId]);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Current Inventory</h1>
          <p className="text-sm text-gray-500">
            Real-time stock levels across all locations
          </p>
        </div>

        <div className="rounded-lg bg-white shadow">
          <div className="flex justify-end  px-6 py-4">
            <select
              className="rounded-md border px-3 py-2 text-sm"
              value={locationId}
              onChange={(e) => setLocationId(Number(e.target.value))}
            >
              <option value={1}>Main Warehouse</option>
              <option value={2}>Store Riyadh</option>
              <option value={3}>Store Jeddah</option>
            </select>
          </div>

          {loading ? (
            <div className="p-6 text-gray-500">Loading inventory...</div>
          ) : (
            <InventoryTable data={inventory} /> 
          )}
        </div>
        <TransferForm onTransferSuccess={loadInventory} />
      </div>
    </main>
  );
}
