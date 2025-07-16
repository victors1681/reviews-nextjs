"use client";
import { Card, Flex, Box } from "@radix-ui/themes";

interface ReviewSkeletonProps {
  count?: number;
}

function SkeletonBar({
  width = "100%",
  height = "16px",
}: {
  width?: string;
  height?: string;
}) {
  return (
    <Box
      style={{
        width,
        height,
        backgroundColor: "var(--gray-4)",
        borderRadius: "4px",
        opacity: 0.6,
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }}
    />
  );
}

function SingleReviewSkeleton() {
  return (
    <Card>
      <Flex direction="column" gap="3" p="4">
        {/* Header with avatar and name */}
        <Flex align="center" gap="3">
          <Box
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "var(--gray-4)",
              borderRadius: "50%",
              opacity: 0.6,
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
          <Flex direction="column" gap="2" style={{ flex: 1 }}>
            <SkeletonBar width="120px" height="14px" />
            <SkeletonBar width="80px" height="12px" />
          </Flex>
        </Flex>

        {/* Rating stars */}
        <Flex gap="1">
          {[...Array(5)].map((_, i) => (
            <Box
              key={i}
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: "var(--gray-4)",
                borderRadius: "2px",
                opacity: 0.6,
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />
          ))}
        </Flex>

        {/* Review content */}
        <Flex direction="column" gap="2">
          <SkeletonBar width="100%" height="14px" />
          <SkeletonBar width="90%" height="14px" />
          <SkeletonBar width="75%" height="14px" />
        </Flex>

        {/* Date */}
        <SkeletonBar width="100px" height="12px" />
      </Flex>
    </Card>
  );
}

export default function ReviewSkeleton({ count = 6 }: ReviewSkeletonProps) {
  return (
    <Flex direction="column" gap="3">
      {[...Array(count)].map((_, index) => (
        <SingleReviewSkeleton key={index} />
      ))}
    </Flex>
  );
}
