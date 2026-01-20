const API_URL = 'http://localhost:3000/api';

export const fetchLocations = async (type?: string) => {
  const res = await fetch(`${API_URL}/locations?type=${type || ''}`);
  return res.json();
};

export const fetchInventory = async (locationId: number) => {
  const res = await fetch(`${API_URL}/inventory/${locationId}`);
  return res.json();
};

export const transferStock = async (payload: {
  product_id: number;
  from_location_id: number;
  to_location_id: number;
  quantity: number;
}) => {
  const res = await fetch(`${API_URL}/transfers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
};
