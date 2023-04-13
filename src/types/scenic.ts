export interface ScenicListSearchParams {
  name: string;
  categoryId: number | undefined;
  status: number | undefined;
  page: number;
  limit: number;
}

interface OpenTime {
  openDate: string;
  closeData: string;
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
}

export interface Scenic {
  id: number;
  status: number;
  failureReason: string;
  categoryId: number;
  name: string;
  level: string;
  rate: number;
  createdAt: string;
  updatedAt: string;
}

export interface ScenicListResult {
  list: Scenic[];
  page: string;
  limit: string;
  total: string;
}
