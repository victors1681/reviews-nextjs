import type { Metadata } from "next";
import ReviewsWithFilter from "../views/app/ratings";

export const metadata: Metadata = {
  title: "Reviews",
  description: "A reviews page with filtering and search capabilities",
};

export default function Home() {
  return <ReviewsWithFilter />;
}
