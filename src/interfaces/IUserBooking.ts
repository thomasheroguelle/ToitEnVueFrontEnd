import { StatusEnum } from './IValidatedBooking';

export interface UserBookings {
  id: number;
  interested: number;
  beginningDate: Date;
  endDate: Date;
  housingDto: HousingFromUser;
  statusEnum: StatusEnum;
  totalPrice: number;
}

export interface HousingFromUser {
  housing_id: number;
  title: string;
  address: string;
  city: string;
  zipcode: number;
  price: number;
  files: FileDto[];
}

export interface FileDto {
  file_id: number;
  file_name: string;
  content_type: string;
}
