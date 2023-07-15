export interface Pagination {
  current: number;
  count: number;
}

export interface OutputPayload<T> {
  data: T[];
  pagination: Pagination;
  total_register?: number;
}
