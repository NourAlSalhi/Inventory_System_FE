import { useEffect, useState } from "react";
import {
  InventoryProduct,
  Location,
  TransferFormProps,
  TransferFormState,
} from "@/types";
import { API_URL } from "@/constant";

const TransferForm = ({ onTransferSuccess }: TransferFormProps) => {
  const [form, setForm] = useState<TransferFormState>({
    sourceType: null,
    sourceId: null,
    destinationId: null,
    productId: null,
    quantity: 1,
    sources: [],
    destinations: [],
    products: [],
  });

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSourceTypeChange = (type: "Warehouse" | "Store") => {
    setForm((prev) => ({
      ...prev,
      sourceType: type,
      sourceId: null,
      destinationId: null,
      productId: null,
      quantity: 1,
      sources: [],
      destinations: [],
      products: [],
    }));

    fetch(`${API_URL}/locations?type=${type.toLowerCase()}`)
      .then((res) => res.json())
      .then((json) =>
        setForm((prev) => ({ ...prev, sources: json.data }))
      );
      
  };
  useEffect(() => {
    if (!form.sourceId || !form.sourceType) return;
  
    const loadProducts = async () => {
      const res = await fetch(`${API_URL}/inventory/${form.sourceId}`);
      const json = await res.json();
  
      const products: InventoryProduct[] = json.data.map((p: any) => ({
        id: p.product_id,
        product_name: p.Product.name,
        quantity: p.quantity,
      }));      
  
      setForm((prev) => ({
        ...prev,
        products,
        productId: null,
        quantity: 1,
      }));
    };
  
    const loadDestinations = async () => {
      const destinationType =
        form.sourceType === "Warehouse" ? "store" : "warehouse";
  
      const res = await fetch(`${API_URL}/locations?type=${destinationType}`);
      const json = await res.json();
  
      setForm((prev) => ({
        ...prev,
        destinations: json.data,
        destinationId: null,
      }));
    };
  
    loadProducts();
    loadDestinations();
  }, [form.sourceId, form.sourceType]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.sourceId || !form.destinationId || !form.productId) {
      showToast("Please fill all fields", "error");
      return;
    }

    const response = await fetch(`${API_URL}/transfers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: form.productId,
        from_location_id: form.sourceId,
        to_location_id: form.destinationId,
        quantity: form.quantity,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      showToast(data.message || "Transfer created successfully!", "success");
      setForm({
        sourceType: null,
        sourceId: null,
        destinationId: null,
        productId: null,
        quantity: 1,
        sources: [],
        destinations: [],
        products: [],
      });
      onTransferSuccess?.();
    } else {
      showToast(data.error || "Failed to create transfer", "error");
    }
  };

  return (
    <div className="relative">
      {/* Toast message */}
      {toast && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-md text-white ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {toast.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto mt-5 p-6 bg-white shadow-md rounded-md space-y-4"
      >
        <h2 className="text-xl font-semibold">New Stock Transfer</h2>

        <div>
          <label className="block mb-1 font-medium">Source Type</label>
          <div className="flex gap-4">
            {["Warehouse", "Store"].map((type) => (
              <label key={type} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="sourceType"
                  value={type}
                  checked={form.sourceType === type}
                  onChange={() =>
                    handleSourceTypeChange(type as "Warehouse" | "Store")
                  }
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {form.sources.length > 0 && (
          <div>
            <label className="block mb-1">From Location</label>
            <select
              value={form.sourceId ?? ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  sourceId: Number(e.target.value),
                }))
              }
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select source</option>
              {form.sources.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {form.products.length > 0 && (
          <div>
            <label className="block mb-1">Product</label>
            <select
              value={form.productId ?? ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  productId: Number(e.target.value),
                }))
              }
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select product</option>
              {form.products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.product_name} ({p.quantity})
                </option>
              ))}
            </select>
          </div>
        )}

        {form.productId && (
          <div>
            <label className="block mb-1">Quantity</label>
            <input
              type="number"
              min={1}
              value={form.quantity}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  quantity: Number(e.target.value),
                }))
              }
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        )}

        {form.destinations.length > 0 && (
          <div>
            <label className="block mb-1">To Location</label>
            <select
              value={form.destinationId ?? ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  destinationId: Number(e.target.value),
                }))
              }
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select destination</option>
              {form.destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-2 rounded text-white ${
            form.sourceType &&
            form.sourceId &&
            form.destinationId &&
            form.productId &&
            form.quantity > 0
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={
            !form.sourceType ||
            !form.sourceId ||
            !form.destinationId ||
            !form.productId ||
            form.quantity < 1
          }
        >
          Create Transfer
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
