import { NextRequest, NextResponse } from "next/server";
import { ReviewsApiResponse } from "../../../types/ReviewType";

const API_HOST = process.env.API_HOST || "";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const externalUrl = `${API_HOST}/_u/careers/api/reviews${
      searchParams.toString() ? "?" + searchParams.toString() : ""
    }`;
    console.log("Fetching reviews from:", externalUrl);
    const response = await fetch(externalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Failed to fetch reviews: ${response.status} ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    const data: ReviewsApiResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
