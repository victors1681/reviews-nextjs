"use client";
import { useState } from "react";
import { ReviewType } from "../types/ReviewType";

export interface FilterState {
  searchTerm: string;
  selectedRating: string;
}

export function useReviewFilters(reviews: ReviewType[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");

  const filteredReviews = [] as ReviewType[];

  const filterStats = {
    total: 0,
    filtered: 0,
    ratingCounts: 0,
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedRating("all");
  };

  return {
    searchTerm,
    selectedRating,

    setSearchTerm,
    setSelectedRating,
    resetFilters,

    filteredReviews,
    filterStats,

    hasActiveFilters: searchTerm !== "" || selectedRating !== "all",
  };
}
