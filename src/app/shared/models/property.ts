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
}
