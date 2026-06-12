export enum UserRole {
  Admin,
  User,
  Platform,
}

export enum PlanType {
  Paid,
  Free,
}
export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}
