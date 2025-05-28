export interface Schedule {
  id?: number;
  // vendorId: number;
  propertyId: number | undefined;
  startDate: string | null;
  endDate: string | null;
}
