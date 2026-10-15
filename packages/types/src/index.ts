/** Types shared between apps and packages. Backend types live in `@boilerplate/api-client`. */

export type Locale = "it" | "en";

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
