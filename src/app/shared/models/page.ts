export interface Page<T> {
  content: T[];
  pageNumber: number;
  pageSie: number;
  totalPages: number;
  totalElements: number;
}
