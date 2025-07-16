export interface ReviewType {
  author: string;
  title: string;
  review: string;
  original_title: string;
  original_review: string;
  stars: string;
  iso: string;
  version: string;
  date: string;
  deleted: boolean;
  has_response: boolean;
  product: number;
  product_id: number;
  product_name: string;
  vendor_id: string;
  store: string;
  weight: number;
  id: string;
  tags?: string[];
  predicted_langs: string[];
}

export interface TotalsPerProduct {
  [productId: string]: number;
}

export interface ReviewsApiResponse {
  total: number;
  totals_per_product: TotalsPerProduct;
  pages: number;
  this_page: number;
  reviews: ReviewType[];
}
