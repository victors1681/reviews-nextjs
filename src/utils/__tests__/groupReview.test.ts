import { groupReviewsByDate } from "../groupReview";
import { ReviewType } from "@/types/ReviewType";

const createMockReview = (id: string, date: string): ReviewType => ({
  id,
  date,
  author: "Test Author",
  title: "Test Title",
  review: "Test review content",
  original_title: "Test Title",
  original_review: "Test review content",
  stars: "5",
  iso: "en",
  version: "1.0",
  deleted: false,
  has_response: false,
  product: 1,
  product_id: 1,
  product_name: "Test Product",
  vendor_id: "test-vendor",
  store: "test-store",
  weight: 1,
  predicted_langs: ["en"],
});

describe("groupReviewsByDate", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-07-16T12:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should group reviews by "Today" correctly', () => {
    const todayReviews = [
      createMockReview("1", "2025-07-16T10:00:00Z"),
      createMockReview("2", "2025-07-16T14:30:00Z"),
    ];

    const result = groupReviewsByDate(todayReviews);

    expect(result).toHaveProperty("Today");
    expect(result.Today).toHaveLength(2);
    expect(result.Today[0].id).toBe("1");
    expect(result.Today[1].id).toBe("2");
  });

  it('should group reviews by "Yesterday" correctly', () => {
    const yesterdayReviews = [
      createMockReview("1", "2025-07-15T10:00:00Z"),
      createMockReview("2", "2025-07-15T22:30:00Z"),
    ];

    const result = groupReviewsByDate(yesterdayReviews);

    expect(result).toHaveProperty("Yesterday");
    expect(result.Yesterday).toHaveLength(2);
    expect(result.Yesterday[0].id).toBe("1");
    expect(result.Yesterday[1].id).toBe("2");
  });

  it('should group reviews by "This Week" correctly (excluding today and yesterday)', () => {
    const thisWeekReviews = [
      createMockReview("1", "2025-07-14T10:00:00Z"),
      createMockReview("2", "2025-07-12T14:30:00Z"),
    ];

    const result = groupReviewsByDate(thisWeekReviews);

    expect(result).toHaveProperty("This Week");
    expect(result["This Week"]).toHaveLength(1);
    expect(result["This Week"][0].id).toBe("1");

    expect(result).toHaveProperty("Last Week");
    expect(result["Last Week"]).toHaveLength(1);
    expect(result["Last Week"][0].id).toBe("2");
  });

  it('should group reviews by "Last Week" correctly', () => {
    const lastWeekReviews = [
      createMockReview("1", "2025-07-10T10:00:00Z"),
      createMockReview("2", "2025-07-09T14:30:00Z"),
    ];

    const result = groupReviewsByDate(lastWeekReviews);

    expect(result).toHaveProperty("Last Week");
    expect(result["Last Week"]).toHaveLength(2);
  });

  it('should group reviews by "This Month" correctly', () => {
    const thisMonthReviews = [
      createMockReview("1", "2025-07-01T10:00:00Z"),
      createMockReview("2", "2025-07-05T14:30:00Z"),
    ];

    const result = groupReviewsByDate(thisMonthReviews);

    expect(result).toHaveProperty("This Month");
    expect(result["This Month"]).toHaveLength(2);
  });

  it('should group reviews by "Last Month" correctly', () => {
    const lastMonthReviews = [
      createMockReview("1", "2025-06-15T10:00:00Z"),
      createMockReview("2", "2025-06-25T14:30:00Z"),
    ];

    const result = groupReviewsByDate(lastMonthReviews);

    expect(result).toHaveProperty("Last Month");
    expect(result["Last Month"]).toHaveLength(2);
  });

  it('should group reviews by "2 Months Ago" correctly', () => {
    const twoMonthsAgoReviews = [
      createMockReview("1", "2025-05-15T10:00:00Z"),
      createMockReview("2", "2025-05-25T14:30:00Z"),
    ];

    const result = groupReviewsByDate(twoMonthsAgoReviews);

    expect(result).toHaveProperty("2 Months Ago");
    expect(result["2 Months Ago"]).toHaveLength(2);
  });
});
