export interface InventoryItem {
  item : {
    product_id: number;
    product_name: string;
    sku: string;
    quantity: number;
    Product: [name: string, sku: string];
  }
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
  Prouduct: {
    name: string; 
  }
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
