"use client";
import { Container, Flex, Text, Button, Box } from "@radix-ui/themes";
import { Suspense, useEffect, useState } from "react";
import FilterComponent from "../../../components/FilterComponent";
import ReviewCard from "../../../components/ReviewCard";
import ReviewSkeleton from "../../../components/skeleton/ReviewSkeleton";
import { useReviewFilters } from "../../../hooks/useReviewFilters";
import { useReviews } from "../../../hooks/useReviews";

function ReviewsContent() {
  const { reviews, isLoading, error, pages, currentPage } = useReviews();
  const [mounted, setMounted] = useState(false);

  const {
    searchTerm,
    selectedRating,
    setSearchTerm,
    setSelectedRating,
    loadMoreReviews,
    resetFilters,
    groupedReviews,
    filterStats,
    hasActiveFilters,
    isPending,
  } = useReviewFilters(reviews);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
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
          <ReviewSkeleton count={6} />
        </Flex>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="4" p="4">
        <Flex direction="column" gap="4">
          <Text size="6" weight="bold">
            Reviews
          </Text>
          <Flex justify="center" align="center" p="8">
            <Text color="red" size="4">
              Error: {error.message || "Failed to load reviews"}
            </Text>
          </Flex>
        </Flex>
      </Container>
    );
  }

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
          {Object.entries(groupedReviews).length === 0 ? (
            <Flex justify="center" align="center" p="8">
              <Text color="gray" size="4">
                No reviews found matching your filters.
              </Text>
            </Flex>
          ) : (
            <>
              {Object.entries(groupedReviews).map(([group, reviews]) => (
                <div key={group}>
                  <Box height="64px" key={group}>
                    <Flex align="center" justify="center" height="100%">
                      <Text size="4" weight="bold" mt="2" mb="2">
                        {group} ({reviews.length})
                      </Text>
                    </Flex>
                  </Box>

                  <Flex direction="column" gap="3">
                    {reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </Flex>
                </div>
              ))}

              {currentPage < pages && (
                <Flex justify="center" p="4">
                  <Button
                    onClick={loadMoreReviews}
                    disabled={isPending}
                    size="3"
                    variant="outline"
                  >
                    {isPending ? "Loading..." : "Load More Reviews"}
                  </Button>
                </Flex>
              )}
            </>
          )}
        </Flex>
      </Flex>
    </Container>
  );
}

export default function ReviewsWithFilter() {
  return (
    <Suspense
      fallback={
        <Container size="4" p="4">
          <Flex direction="column" gap="4">
            <Text size="6" weight="bold">
              Reviews
            </Text>
            <ReviewSkeleton count={6} />
          </Flex>
        </Container>
      }
    >
      <ReviewsContent />
    </Suspense>
  );
}
