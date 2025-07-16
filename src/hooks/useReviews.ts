import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { ReviewsApiResponse } from "../types/ReviewType";
import { fetcher } from "@/utils/fetcher";

const DEFAULT_LIMIT = 25;
const DEFAULT_SORT = "-date";

interface UseReviewsParams {
  page?: number;
  count?: number;
  lang?: number;
  sort?: string;
  q?: string; //query
  stars: string;
}

export function useReviews(params?: UseReviewsParams) {
  const searchParams = useSearchParams();

  const finalParams: UseReviewsParams = {
    page: searchParams.get("page")
      ? Number(searchParams.get("page"))
      : params?.page,
    count: searchParams.get("count")
      ? Number(searchParams.get("count"))
      : params?.count || DEFAULT_LIMIT,
    lang: searchParams.get("lang")
      ? Number(searchParams.get("lang"))
      : params?.lang,
    sort: searchParams.get("sort") || params?.sort || DEFAULT_SORT,
    q: searchParams.get("q") || params?.q,
    stars: searchParams.get("stars") || params?.stars || "",
  };

  const searchParamsObj = new URLSearchParams();

  searchParamsObj.set("count", String(finalParams.count));

  if (finalParams.sort) searchParamsObj.set("sort", finalParams.sort);
  if (finalParams.page) searchParamsObj.set("page", String(finalParams.page));
  if (finalParams.lang) searchParamsObj.set("lang", String(finalParams.lang));
  if (finalParams.q) searchParamsObj.set("q", finalParams.q);
  if (finalParams.stars) searchParamsObj.set("stars", finalParams.stars);

  const queryString = `?${searchParamsObj.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<ReviewsApiResponse>(
    `/api/reviews${queryString}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
    }
  );
  console.log("useReviews data:", data);
  return {
    reviews: data || [],
    total: data?.total || 0,
    totalsPerProduct: data?.totals_per_product || {},
    pages: data?.pages || 0,
    currentPage: data?.this_page || 1,
    isLoading,
    error,
    mutate,
  };
}
