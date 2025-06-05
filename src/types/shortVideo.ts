export interface ShortVideoListSearchParams {
  title: string;
  userId: number | undefined;
  scenicId: number | undefined;
  hotelId: number | undefined;
  restaurantId: number | undefined;
  goodsId: number | undefined;
  page: number;
  limit: number;
}

export interface ShortVideo {
  id: number;
  status: number;
  userId: number;
  title: string;
  cover: string;
  videoUrl: string;
  longitude: number;
  latitude: number;
  address: string;
  isPrivate: number;
  likeNumber: number;
  commentsNumber: number;
  collectionTimes: number;
  shareTimes: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface ShortVideoListResult {
  list: ShortVideo[];
  page: string;
  limit: string;
  total: string;
}
