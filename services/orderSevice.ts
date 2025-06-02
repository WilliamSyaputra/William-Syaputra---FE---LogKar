import { OrderResponse } from "@/types/orders";
import { OrderPayload } from "@/types/payload";

const API_ENDPOINT =
  "https://frontend-api-mocking-production.up.railway.app/api/orders";

const fetchOrderData = async (
  payload: OrderPayload
): Promise<OrderResponse> => {
  const res = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch order data");
  }

  return res.json();
};

export const orderService = {
  fetchOrderData,
};
