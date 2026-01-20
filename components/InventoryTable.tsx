import { InventoryItem } from '@/types';

interface Props {
  data: InventoryItem[];
}

export default function InventoryTable({ data }: Props) {
  return (
    <table className="w-full border rounded">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>SKU</th>
          <th>Quantity</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.product_id}>
            <td>{item.product_name}</td>
            <td>{item.sku}</td>
            <td>{item.quantity}</td>
            <td>
              {item.quantity === 0
                ? 'Out of Stock'
                : item.quantity < 10
                ? 'Low Stock'
                : 'In Stock'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
