export interface PaginationProps {
  total: number;
  perPage: number;
  currentPage: number;
}

export interface PaginateProps {
  pagination: PaginationProps;
  handlePageChange: (newPage: number) => void;
}

export interface ImageProps {
  id: string;
  account_url: string;
  images: any[];
  title: string;
  datetime: number;
  views: number;
  favorite_count: number;
}

export interface CardComponentProps {
  photo: ImageProps;
  page: number;
}
