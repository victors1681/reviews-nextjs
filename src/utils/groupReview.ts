import { ReviewType } from "@/types/ReviewType";
import moment from "moment";

const getDateGroup = (reviewDate: string | Date): string => {
  const now = moment();
  const date = moment(reviewDate);

  if (date.isSame(now, "day")) return "Today";
  if (date.isSame(now.clone().subtract(1, "day"), "day")) return "Yesterday";

  if (
    date.isSame(now, "week") &&
    !date.isSame(now, "day") &&
    !date.isSame(now.clone().subtract(1, "day"), "day")
  )
    return "This Week";

  if (date.isSame(now.clone().subtract(1, "week"), "week")) return "Last Week";
  if (date.isSame(now, "month")) return "This Month";
  if (date.isSame(now.clone().subtract(1, "month"), "month"))
    return "Last Month";
  if (date.isSame(now.clone().subtract(2, "month"), "month"))
    return "2 Months Ago";

  return date.format("MMMM YYYY");
};

export const groupReviewsByDate = (reviews: ReviewType[]) => {
  const groups = new Map<string, ReviewType[]>();

  reviews.forEach((review) => {
    const group = getDateGroup(review.date);

    if (!groups.has(group)) {
      groups.set(group, []);
    }
    groups.get(group)?.push(review);
  });

  const sortOrder = [
    "Today",
    "Yesterday",
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "2 Months Ago",
  ];

  const sortedGroups: { [key: string]: ReviewType[] } = {};

  sortOrder.forEach((group) => {
    if (groups.has(group)) {
      if ((groups.get(group)?.length ?? 0) === 0) {
        delete sortedGroups[group];
        return;
      } else {
        sortedGroups[group] = groups.get(group) || [];
      }
    }
  });

  Object.keys(groups)
    .filter((key) => !sortOrder.includes(key))
    .sort((a, b) => {
      const groupA = groups.get(a);
      const groupB = groups.get(b);
      const dateA = moment(groupA && groupA[0] ? groupA[0].date : undefined);
      const dateB = moment(groupB && groupB[0] ? groupB[0].date : undefined);
      return dateB.valueOf() - dateA.valueOf();
    })
    .forEach((group) => {
      const groupReviews = groups.get(group);
      if (groupReviews) {
        sortedGroups[group] = groupReviews;
      }
    });

  console.log("Grouped Reviews:", sortedGroups);
  return sortedGroups;
};
