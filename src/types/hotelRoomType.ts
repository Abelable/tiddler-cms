export interface HotelRoomTypeListSearchParams {
  hotelId: number;
  hotelName: string;
  page: number;
  limit: number;
}

export interface HotelRoomType {
  id: number;
  hotelId: number;
  name: string;
  imageList: string[];
  bedDesc: string;
  areaSize: number;
  floorDesc: string;
  facilityList: string[];
  createdAt: string;
  updatedAt: string;
}

export interface HotelRoomTypeListResult {
  list: HotelRoomType[];
  page: string;
  limit: string;
  total: string;
}
