import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"
import type { SearchResponse, SearchParams } from "@/types/search"

/**
 * Hook for searching products in the mall
 * Automatically fetches results when query changes
 *
 * @param query - Search term to look for
 * @param page - Current page number for pagination
 * @param limit - Number of results per page
 */
export function useSearch(query: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: ["search", query, page, limit],
    queryFn: async () => {
      // Skip API call for empty searches
      if (!query.trim()) {
        return { success: true, items: [], meta: { totalItems: 0 } }
      }

      const params: SearchParams = {
        q: query,
        page,
        limit,
      }

      const response = await apiClient.get<SearchResponse>("/search", { params })
      return response.data
    },
    // Only execute query when there's actual search text
    enabled: query.length > 0,
  })
}
