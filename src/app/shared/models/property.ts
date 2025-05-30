import { Category } from "./category";

export interface Property {
  id?: number;
  name: string;
  description: string;
  direction: string;
  categoryId: number;
  roomCount: number;
  bathroomCount: number;
  price: number;
  locationId: number;
  activePublicationDate: Date;
  userId?: number | undefined;
}

export interface PropertyResponse {
  id?: number;
  name: string;
  description: string;
  direction: string;
  category: Category;
  roomCount: number;
  bathroomCount: number;
  price: number;
  location: Location;
  activePublicationDate: Date;
}
