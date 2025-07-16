"use client";
import { Card, Flex, Box } from "@radix-ui/themes";

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

export default function FilterSkeleton() {
  return (
    <Card>
      <Flex direction="column" gap="4" p="4">
        {/* Search input skeleton */}
        <Flex direction="column" gap="2">
          <SkeletonBar width="80px" height="14px" />
          <SkeletonBar width="100%" height="36px" />
        </Flex>

        {/* Rating filter skeleton */}
        <Flex direction="column" gap="2">
          <SkeletonBar width="120px" height="14px" />
          <Flex gap="2" wrap="wrap">
            {[...Array(6)].map((_, i) => (
              <SkeletonBar key={i} width="60px" height="32px" />
            ))}
          </Flex>
        </Flex>

        {/* Stats and reset button skeleton */}
        <Flex justify="between" align="center">
          <SkeletonBar width="150px" height="14px" />
          <SkeletonBar width="80px" height="32px" />
        </Flex>
      </Flex>
    </Card>
  );
}
