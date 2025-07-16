import {
  Box,
  Flex,
  Text,
  TextField,
  Select,
  Button,
  Badge,
} from "@radix-ui/themes";
import { MagnifyingGlassIcon, Cross2Icon } from "@radix-ui/react-icons";

interface FilterComponentProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedRating: string;
  onRatingChange: (value: string) => void;
  onReset?: () => void;
  hasActiveFilters?: boolean;
  totalResults?: number;
  filteredResults?: number;
}

export default function FilterComponent({
  searchTerm,
  onSearchChange,
  selectedRating,
  onRatingChange,
  onReset,
  hasActiveFilters = false,
  totalResults,
  filteredResults,
}: FilterComponentProps) {
  return (
    <Box
      p="4"
      style={{
        backgroundColor: "var(--gray-1)",
        borderRadius: "var(--radius-3)",
        border: "1px solid var(--gray-6)",
      }}
    >
      <Flex direction="column" gap="3">
        <Flex justify="between" align="center">
          <Text size="3" weight="medium">
            Filter Reviews
          </Text>

          {hasActiveFilters && onReset && (
            <Button variant="ghost" size="1" color="gray" onClick={onReset}>
              <Cross2Icon width="12" height="12" />
              Reset
            </Button>
          )}
        </Flex>

        <Flex gap="3" direction={{ initial: "column", sm: "row" }}>
          <Box style={{ flex: 1 }}>
            <Text size="2" color="gray" mb="1" as="label">
              Search
            </Text>
            <TextField.Root
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              size="2"
            >
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </Box>

          <Box style={{ minWidth: "160px" }}>
            <Text size="2" color="gray" mb="1" as="label">
              Filter by Rating
            </Text>
            <Select.Root value={selectedRating} onValueChange={onRatingChange}>
              <Select.Trigger
                placeholder="All ratings"
                style={{ width: "100%" }}
              />
              <Select.Content>
                <Select.Item value="all">All ratings</Select.Item>
                {Array.from({ length: 5 }, (_, i) => 5 - i).map((star) => (
                  <Select.Item key={star} value={star.toString()}>
                    {star} star{star > 1 ? "s" : ""}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Box>
        </Flex>

        {typeof filteredResults === "number" &&
          typeof totalResults === "number" && (
            <Flex gap="2" align="center">
              <Text size="2" color="gray">
                Showing
              </Text>
              <Badge color={filteredResults === totalResults ? "gray" : "blue"}>
                {filteredResults}
              </Badge>
              <Text size="2" color="gray">
                of {totalResults} reviews
              </Text>
            </Flex>
          )}
      </Flex>
    </Box>
  );
}
