import { Card, Flex, Text } from "@radix-ui/themes";
import moment from "moment";
import { ReviewType } from "../types/ReviewType";
import Stars from "./Stars";

interface ReviewCardProps {
  review: ReviewType;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const daysAgo = moment(review.date).fromNow();

  return (
    <Card>
      <Flex direction="column" gap="3">
        <Flex justify="start" align="center">
          <Stars rating={parseInt(review.stars)} />
        </Flex>
        <Text size="3" weight="medium">
          {review.title}
        </Text>
        <Text size="2">{review.review}</Text>
        <Text size="1" color="gray">
          By {review.author} | {review.version} | {review.iso} | {daysAgo}
        </Text>
      </Flex>
    </Card>
  );
}
