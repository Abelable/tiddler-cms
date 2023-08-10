export interface HotelListSearchParams {
  name: string;
  grade: number | undefined;
  categoryId: number | undefined;
  status: number | undefined;
  page: number;
  limit: number;
}

interface Facility {
  facilityId: number;
  content: string;
}

interface Service {
  serviceId: number;
  content: string;
}

export interface HotelDetail {
  id: number;
  name: string;
  grade: number;
  categoryId: number;
  video: string;
  imageList: string[];
  longitude: number;
  latitude: number;
  address: string;
  featureTagList: string[];
  openingYear: string;
  lastDecorationYear: string;
  roomNum: number;
  tel: string;
  brief: string;
  facilityList: Facility[];
  serviceList: Service[];
  remindList: string[];
  checkInTipList: string[];
  preorderTipList: string[];
}

export interface Hotel {
  id: number;
  status: number;
  failureReason: string;
  name: string;
  level: string;
  categoryId: number;
  rate: number;
  createdAt: string;
  updatedAt: string;
}

export interface HotelListResult {
  list: Hotel[];
  page: string;
  limit: string;
  total: string;
}

export interface HotelOption {
  id: number;
  name: string;
}
