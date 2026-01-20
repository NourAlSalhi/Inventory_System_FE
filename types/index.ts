export interface InventoryItem {
  product_id: number;
  product_name: string;
  sku: string;
  quantity: number;
}

export interface Location {
  id: number;
  name: string;
  type: 'warehouse' | 'store';
}
