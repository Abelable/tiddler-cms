export interface TourismNoteListSearchParams {
  title: string;
  userId: number | undefined;
  scenicId: number | undefined;
  hotelId: number | undefined;
  restaurantId: number | undefined;
  goodsId: number | undefined;
  page: number;
  limit: number;
}

export interface TourismNote {
  id: number;
  status: number;
  userId: number;
  imageList: string[];
  title: string;
  content: string;
  longitude: number;
  latitude: number;
  address: string;
  isPrivate: number;
  likeNumber: number;
  commentsNumber: number;
  collectionTimes: number;
  shareTimes: number;
  views: number;
  scenicIds: number[];
  hotelIds: number[];
  restaurantIds: number[];
  goodsIds: number[];
  createdAt: string;
  updatedAt: string;
}

export interface TourismNoteListResult {
  list: TourismNote[];
  page: string;
  limit: string;
  total: string;
}
