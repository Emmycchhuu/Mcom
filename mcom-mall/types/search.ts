/**
 * Query parameters for product search
 */
export interface SearchParams {
  q: string
  page?: number
  limit?: number
}

/**
 * Individual product result from search
 */
export interface SearchResult {
  id: string
  title: string
  shortDescription: string
  price: number
  fileUrls: string[]
  category?: string
}

/**
 * API response structure for search endpoint
 * Returns paginated results with metadata
 */
export interface SearchResponse {
  items: SearchResult[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
}
