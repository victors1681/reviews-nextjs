import { Flex, Text, Box } from "@radix-ui/themes";

export default function Header() {
  return (
    <Box asChild>
      <header>
        <Flex
          justify="between"
          align="center"
          p="4"
          style={{
            borderBottom: "1px solid var(--gray-6)",
            backgroundColor: "var(--gray-2)",
          }}
        >
          <Text size="6" weight="bold">
            Reviews App
          </Text>
          <Flex gap="4" align="center">
            <Text size="2" color="gray">
              Made for For Appfigures
            </Text>
          </Flex>
        </Flex>
      </header>
    </Box>
  );
}
