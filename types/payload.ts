interface Filter {
  order_status: number[];
  origin_code: string[];
  destination_code: string[];
}

export interface OrderPayload {
  keyword: string;
  filter: Filter;
  page: number;
}
