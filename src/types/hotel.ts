export interface HotelListSearchParams {
  name: string;
  grade: number | undefined;
  categoryId: number | undefined;
  status: number | undefined;
  page: number;
  limit: number;
}

export interface HotelDetail {
  id: number;
  name: string;
  grade: number;
  categoryId: number;
  price: number;
  video: string;
  cover: string;
  appearanceImageList: string[];
  interiorImageList: string[];
  roomImageList: string[];
  environmentImageList: string[];
  restaurantImageList: string[];
  longitude: number;
  latitude: number;
  address: string;
  featureTagList: string[];
  openingYear: string;
  lastDecorationYear: string;
  roomNum: number;
  tel: string;
  brief: string;
  recreationFacility: string[];
  healthFacility: string[];
  childrenFacility: string[];
  commonFacility: string[];
  publicAreaFacility: string[];
  trafficService: string[];
  cateringService: string[];
  receptionService: string[];
  cleanService: string[];
  businessService: string[];
  otherService: string[];
  remindList: string[];
  checkInTipList: string[];
  preorderTipList: string[];
}

export interface Hotel {
  id: number;
  cover: string;
  status: number;
  failureReason: string;
  name: string;
  grade: number;
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
