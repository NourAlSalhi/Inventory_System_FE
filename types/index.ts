export interface InventoryItem {
  product_id: number;
  product_name: string;
  sku: string;
  quantity: number;
}
export interface Location {
  id: number;
  name: string;
  type: "warehouse" | "store";
}
export interface InventoryProduct {
  id: number;
  product_name: string;
  quantity: number;
}
export interface TransferFormProps {
  onTransferSuccess?: () => void;
}
export interface TransferFormState {
  sourceType: "Warehouse" | "Store" | null;
  sourceId: number | null;
  destinationId: number | null;
  productId: number | null;
  quantity: number;
  sources: Location[];
  destinations: Location[];
  products: InventoryProduct[];
}
