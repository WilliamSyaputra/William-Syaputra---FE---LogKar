export interface OrderData {
  created_at: string;
  updated_at: string;
  do_id: number;
  do_no: string;
  goods_name: string;
  goods_qty: number;
  goods_qty_ton: number;
  goods_unit: string;
  order_type: string;
  order_type_name: string;
  origin_name: string;
  origin_code: string;
  destination_name: string;
  destination_code: string;
  destination_address: string;
  ref_no: string;
  status: number;
}

export type SummaryDO = {
  status: number;
  status_name: string;
  total: number;
};

export type OrderResponse = {
  summary_do: SummaryDO[];
  order_list: OrderData[];
};

export interface APIFilter {
  origin_code: string[];
  destination_code: string[];
}

export const columnsOrder = [
  { title: "Do/No", key: "do_no" },
  { title: "Do/Id", key: "do_id" },
  { title: "Goods", key: "goods_name" },
  { title: "Quantity", key: "goods_qty" },
  { title: "Unit", key: "goods_unit" },
  { title: "Goods in Ton", key: "goods_qty_ton" },
  { title: "Order Type", key: "order_type" },
  { title: "Order Type Name", key: "order_type_name" },
  { title: "Origin", key: "origin_name" },
  { title: "Destination", key: "destination_name" },
  { title: "Destination Address", key: "destination_address" },
  { title: "Status", key: "status" },
  { title: "Referensi", key: "ref_no" },
  { title: "Updated Date", key: "updated_at" },
  { title: "Kelola", key: "kelola" },
];
