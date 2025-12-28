export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;   // current page (0-based)
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}