import { InventoryItem } from "@/types";

interface Props {
  data: InventoryItem[];
}

const InventoryTable = ({ data }: Props) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead className="bg-gray-100 text-sm uppercase text-gray-500">
        <tr>
          <th className="px-6 py-3 text-left">Product Name</th>
          <th className="px-6 py-3 text-left">SKU</th>
          <th className="px-6 py-3 text-left">Quantity</th>
          <th className="px-6 py-3 text-left">Status</th>
        </tr>
      </thead>

      <tbody className="divide-y">
        {data.map((item) => {
          const status =
            item.item.quantity === 0
              ? "Out of Stock"
              : item.item.quantity < 20
                ? "Low Stock"
                : "In Stock";

          const badgeColor =
            item.item.quantity === 0
              ? "bg-red-100 text-red-700"
              : item.item.quantity < 20
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700";

          return (
            <tr key={item.item.sku}>
              <td className="px-6 py-4 font-medium text-left">
                {item.item.Product?.name}
              </td>
              <td className="px-6 py-4 text-gray-500 text-left">{item.item.Product?.sku}</td>
              <td className="px-6 py-4 font-semibold text-left">{item.item.quantity}</td>
              <td className="px-6 py-4 text-left">
                <span
                  className={`rounded-full px-3 py-1 text-xs ${badgeColor}`}
                >
                  {status}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default InventoryTable;
