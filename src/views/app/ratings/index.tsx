"use client";
import { Container, Flex, Text, Card } from "@radix-ui/themes";
import { ReviewType } from "../../../types/ReviewType";
import FilterComponent from "../../../components/FilterComponent";
import ReviewCard from "../../../components/ReviewCard";
import { useReviewFilters } from "../../../hooks/useReviewFilters";

const sampleReviews: ReviewType[] = [
  {
    id: "1",
    author: "John Doe",
    title: "Great product!",
    review: "I really love this product. It exceeded my expectations.",
    original_title: "Great product!",
    original_review: "I really love this product. It exceeded my expectations.",
    stars: "5",
    iso: "US",
    version: "1.0",
    date: "2025-01-01",
    deleted: false,
    has_response: false,
    product: 1,
    product_id: 1,
    product_name: "Awesome Widget",
    vendor_id: "vendor1",
    store: "online",
    weight: 1,
    predicted_langs: ["en"],
  },
  {
    id: "2",
    author: "Jane Smith",
    title: "Could be better",
    review: "The product is okay but has some issues with durability.",
    original_title: "Could be better",
    original_review: "The product is okay but has some issues with durability.",
    stars: "3",
    iso: "US",
    version: "1.0",
    date: "2025-01-02",
    deleted: false,
    has_response: true,
    product: 1,
    product_id: 1,
    product_name: "Awesome Widget",
    vendor_id: "vendor1",
    store: "online",
    weight: 1,
    predicted_langs: ["en"],
  },
  {
    id: "3",
    author: "Mike Johnson",
    title: "Excellent quality",
    review: "Outstanding build quality and great customer service.",
    original_title: "Excellent quality",
    original_review: "Outstanding build quality and great customer service.",
    stars: "5",
    iso: "US",
    version: "1.0",
    date: "2025-01-03",
    deleted: false,
    has_response: false,
    product: 2,
    product_id: 2,
    product_name: "Super Gadget",
    vendor_id: "vendor2",
    store: "online",
    weight: 1,
    predicted_langs: ["en"],
  },
];

export default function ReviewsWithFilter() {
  const {
    searchTerm,
    selectedRating,
    setSearchTerm,
    setSelectedRating,
    resetFilters,
    filteredReviews,
    filterStats,
    hasActiveFilters,
  } = useReviewFilters(sampleReviews);

  return (
    <Container size="4" p="4">
      <Flex direction="column" gap="4">
        <Text size="6" weight="bold">
          Reviews
        </Text>

        <FilterComponent
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedRating={selectedRating}
          onRatingChange={setSelectedRating}
          onReset={resetFilters}
          hasActiveFilters={hasActiveFilters}
          totalResults={filterStats.total}
          filteredResults={filterStats.filtered}
        />

        <Flex direction="column" gap="3">
          {filteredReviews.length === 0 ? (
            <Card>
              <Flex justify="center" align="center" p="4">
                <Text color="gray">
                  No reviews found matching your filters.
                </Text>
              </Flex>
            </Card>
          ) : (
            filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </Flex>
      </Flex>
    </Container>
  );
}
