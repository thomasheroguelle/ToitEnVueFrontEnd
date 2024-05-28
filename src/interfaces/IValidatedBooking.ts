export interface OwnerChoice {
  bookingId: number;
  bookingStatus: StatusEnum;
}

export enum StatusEnum {
  confirmed = 'CONFIRMED',
  rejected = 'REJECTED',
  pending = 'PENDING',
}
