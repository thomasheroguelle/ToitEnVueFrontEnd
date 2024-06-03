import { IUserLogin } from './IUserLogin';
import { StatusEnum } from './IValidatedBooking';

export interface IMakeBooking {
  housing_id: number;
  beginningDate: Date;
  endDate: Date;
  user_id: IUserLogin;
  statusEnumDto: StatusEnum[];
}
