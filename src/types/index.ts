export interface Campaign {
  name: string;
  country: string;
  performance: number; // 0-10 scale
  uniqueUsers: number;
  latitude?: number;
  longitude?: number;
  state?: string;
  city?: string;
}