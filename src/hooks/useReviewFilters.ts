import { useState, useEffect, useCallback, useTransition } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ReviewsApiResponse, ReviewType } from "../types/ReviewType";
import { useDebounce } from "@/utils/debounce";
import { groupReviewsByDate } from "@/utils/groupReview";

export function useReviewFilters(reviews: ReviewsApiResponse | never[]) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [groupedReviews, setGroupedReviews] = useState<{
    [key: string]: ReviewType[];
  }>({});

  const [searchTerm, setSearchTermState] = useState(
    () => searchParams.get("q") || ""
  );
  const [selectedRating, setSelectedRatingState] = useState(
    () => searchParams.get("stars") || "all"
  );
  const [currentPage, setCurrentPage] = useState(() =>
    parseInt(searchParams.get("page") || "1")
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 900);

  useEffect(() => {
    const currentReviews = Array.isArray(reviews)
      ? reviews
      : reviews?.reviews || [];

    if (currentReviews.length > 0) {
      const currentPageFromUrl = parseInt(searchParams.get("page") || "1");

      if (currentPageFromUrl === 1) {
        setGroupedReviews(groupReviewsByDate(currentReviews));
      } else {
        setGroupedReviews((prevGrouped) => {
          const currentAccumulated = Object.values(prevGrouped).flat();
          const existingIds = new Set(
            currentAccumulated.map((review) => review.id)
          );
          const newReviews = currentReviews.filter(
            (review) => !existingIds.has(review.id)
          );
          const updated = [...currentAccumulated, ...newReviews];
          return groupReviewsByDate(updated);
        });
      }
    }
  }, [reviews, searchParams]);

  const updateURLParams = useCallback(
    (newSearchTerm: string, newPage?: number, preventScroll = false) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newSearchTerm.trim()) {
        params.set("q", newSearchTerm);
      } else {
        params.delete("q");
      }

      if (newPage && newPage > 1) {
        params.set("page", newPage.toString());
      } else {
        params.delete("page");
      }

      router.push(`${pathname}?${params.toString()}`, {
        scroll: !preventScroll,
      });
    },
    [searchParams, router, pathname]
  );

  useEffect(() => {
    const currentUrlSearchTerm = searchParams.get("q") || "";
    if (debouncedSearchTerm !== currentUrlSearchTerm) {
      updateURLParams(debouncedSearchTerm, 1);
    }
  }, [debouncedSearchTerm, updateURLParams, searchParams]);

  const resetState = useCallback(() => {
    setCurrentPage(1);
    setGroupedReviews({});
  }, []);

  const setSelectedRating = useCallback(
    (rating: string) => {
      startTransition(() => {
        setSelectedRatingState(rating);

        const params = new URLSearchParams(searchParams.toString());
        if (rating !== "all") {
          params.set("stars", rating);
        } else {
          params.delete("stars");
        }
        params.delete("page");
        resetState();
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [searchParams, pathname, router, resetState]
  );

  const setSearchTerm = (term: string) => {
    startTransition(() => {
      setSearchTermState(term);
    });
  };

  const loadMoreReviews = useCallback(() => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    updateURLParams(searchTerm, nextPage, true);
  }, [currentPage, updateURLParams, searchTerm]);

  const filterStats = {
    total: Array.isArray(reviews) ? 0 : reviews?.total || 0,
    filtered: Object.values(groupedReviews).flat().length,
    ratingCounts: 0,
  };

  const resetFilters = useCallback(() => {
    setSearchTermState("");
    setSelectedRatingState("all");
    resetState();

    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.delete("stars");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router, resetState]);

  return {
    searchTerm,
    selectedRating,
    currentPage,
    isPending,
    setSearchTerm,
    setSelectedRating,
    loadMoreReviews,
    resetFilters,
    groupedReviews,
    filterStats,
    hasActiveFilters: searchTerm !== "" || selectedRating !== "all",
  };
}
