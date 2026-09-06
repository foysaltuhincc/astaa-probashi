export type CategoryType = 
  | 'all'
  | 'visa' 
  | 'flight' 
  | 'currency' 
  | 'health' 
  | 'legal' 
  | 'community' 
  | 'jobs';

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: CategoryType;
  categoryName: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  readTime: string;
  views: number;
  featured?: boolean;
  country: string;
  countryFlag: string;
  tags: string[];
  imageUrl: string;
}

export interface FlightDeal {
  id: string;
  fromCity: string;
  fromCode: string;
  toCity: string;
  toCode: string;
  airline: string;
  airlineCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  priceBdt: number;
  agencyPriceBdt?: number;
  savingsBdt?: number;
  baggage: string;
  affiliateUrl: string;
  popularRoute?: boolean;
}

export interface StoreProduct {
  id: string;
  title: string;
  category: 'electronics' | 'health_parents' | 'groceries' | 'lifestyle' | 'eid_gift' | 'fashion' | 'gadget' | 'home_accessories' | 'beauty_care';
  categoryLabel: string;
  priceBdt: number;
  originalPriceBdt: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  description: string;
  deliveryTime: string;
  directStoreUrl: string;
  sectionUrl?: string;
  inStock?: boolean;
  popularForExpat?: boolean;
}

export interface AgencyPriceComparison {
  feature: string;
  agencyWay: string;
  probashiHubWay: string;
  advantage: string;
}

export interface CustomerTestimonial {
  id: string;
  name: string;
  location: string;
  route: string;
  savings: string;
  quote: string;
  verified: boolean;
  avatarText: string;
}

export interface CurrencyRate {
  code: string;
  name: string;
  country: string;
  flag: string;
  symbol: string;
  rateToBdt: number;
  bankRate: number;
  change24h: number; // percentage
  govtIncentivePercent: number;
}

export interface HotelDeal {
  id: string;
  name: string;
  city: string;
  country: string;
  rating: number;
  reviewsCount: number;
  pricePerNightBdt: number;
  amenities: string[];
  imageUrl: string;
  type: 'airport_transit' | 'hajj_umrah' | 'city_center' | 'budget';
  affiliateUrl: string;
  distanceToAirport?: string;
}

export interface CarRentalService {
  id: string;
  title: string;
  city: string;
  country: string;
  carType: string;
  seats: number;
  luggage: number;
  pricePerDayBdt: number;
  driverIncluded: boolean;
  features: string[];
  affiliateUrl: string;
  imageUrl: string;
}

export interface EmergencyContact {
  id: string;
  country: string;
  city: string;
  title: string;
  type: 'embassy' | 'consulate' | 'hospital' | 'welfare' | 'hotline';
  phone: string;
  whatsapp?: string;
  email?: string;
  address: string;
  hours: string;
  isHotline?: boolean;
}

export interface AffiliatePlatformInfo {
  name: string;
  category: string;
  commission: string;
  freeTier: string;
  description: string;
  guideSteps: string[];
  signupUrl: string;
}
