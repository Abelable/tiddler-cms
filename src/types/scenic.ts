export interface ScenicListSearchParams {
  name: string;
  categoryId: number | undefined;
  page: number;
  limit: number;
}

export interface OpenTime {
  openMonth: string;
  closeMonth: string;
  openTime: string;
  closeTime: string;
  tips: string;
}
interface Policy {
  crowd: string;
  condition: string;
  content: string;
}
interface Facility {
  facilityId: number;
  content: string;
}
interface Project {
  image: string;
  name: string;
}
interface Tips {
  title: string;
  content: string;
}

export interface ScenicDetail {
  id: number;
  name: string;
  level: string;
  categoryId: number;
  price: number;
  video: string;
  imageList: string[];
  longitude: number;
  latitude: number;
  address: string;
  brief: string;
  openTimeList: OpenTime[];
  policyList: Policy[];
  hotlineList: string[];
  facilityList: Facility[];
  projectList: Project[];
  tipsList: Tips[];
  featureTagList: string[];
}

export interface Scenic {
  id: number;
  name: string;
  level: string;
  categoryId: number;
  score: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface ScenicListResult {
  list: Scenic[];
  page: string;
  limit: string;
  total: string;
}
