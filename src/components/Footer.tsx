import { Flex, Text, Box } from "@radix-ui/themes";

export default function Footer() {
  return (
    <Box asChild>
      <footer>
        <Flex
          justify="center"
          align="center"
          p="4"
          style={{
            borderTop: "1px solid var(--gray-6)",
            backgroundColor: "var(--gray-2)",
            marginTop: "auto",
          }}
        >
          <Text size="2" color="gray">
            © 2025 Reviews App - Built by Victor Santos
          </Text>
        </Flex>
      </footer>
    </Box>
  );
}
