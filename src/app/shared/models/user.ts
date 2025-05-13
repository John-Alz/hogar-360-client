export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  identityNumber: number;
  phoneNumber: number;
  birthDate: Date;
  email: string;
  password: string;
  roleId: number;
}
