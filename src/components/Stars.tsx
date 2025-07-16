import { Flex } from "@radix-ui/themes";
import { StarIcon, StarFilledIcon } from "@radix-ui/react-icons";

interface StarsProps {
  rating: number;
  maxStars?: number;
  size?: "small" | "medium" | "large";
}

export default function Stars({ rating, maxStars = 5 }: StarsProps) {
  const filledStars = Math.floor(rating);
  const emptyStars = maxStars - filledStars;
  const iconSize = { width: 12, height: 12 };

  return (
    <Flex align="center" gap="1">
      {Array.from({ length: filledStars }, (_, index) => (
        <StarFilledIcon
          key={`filled-${index}`}
          width={iconSize.width}
          height={iconSize.height}
          color="gold"
        />
      ))}
      {Array.from({ length: emptyStars }, (_, index) => (
        <StarIcon
          key={`empty-${index}`}
          width={iconSize.width}
          height={iconSize.height}
          color="gray"
        />
      ))}
    </Flex>
  );
}
