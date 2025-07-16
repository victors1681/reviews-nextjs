import { Container, Flex, Text } from "@radix-ui/themes";
import FilterSkeleton from "../components/skeleton/FilterSkeleton";
import ReviewSkeleton from "../components/skeleton/ReviewSkeleton";

export default function Loading() {
  return (
    <Container size="4" p="4">
      <Flex direction="column" gap="4">
        <Text size="6" weight="bold">
          Reviews
        </Text>
        <FilterSkeleton />
        <ReviewSkeleton count={6} />
      </Flex>
    </Container>
  );
}
