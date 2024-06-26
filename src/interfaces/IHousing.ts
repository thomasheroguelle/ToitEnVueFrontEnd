import { IFile } from './IFile';

export interface IHousing {
  housing_id: number;
  title: string;
  address: string;
  city: string;
  zipcode: number;
  description: string;
  price: number;
  category: CategoryEnum;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  living_space: number;
  highlights: HighLights[];
  year_of_construction: number;
  housingCondition: HousingConditionEnum;
  user_id: number;
  username: string;
  files: IFile[];
  bookingDate: BookingDate[];
}

export interface BookingDate {
  beginningDate: Date;
  endDate: Date;
}

export enum CategoryEnum {
  appartement = 'APARTMENT',
  maison = 'HOUSE',
}
export enum HousingConditionEnum {
  necessary_renovation = 'NECESSARY_RENOVATION',
  good_condition = 'GOOD_CONDITION',
  perfect_condition = 'PERFECT_CONDITION',
  new = 'NEW',
}

export interface HighLights {
  title: string;
}

export const HIGHLIGHTS: HighLights[] = [
  {
    title: 'BALCON',
  },
  {
    title: 'TERASSE',
  },
  {
    title: 'PARKING',
  },
  {
    title: 'ASCENCEUR',
  },
  {
    title: 'CLIMATISATION',
  },
  {
    title: 'ALARME',
  },
  {
    title: 'GARAGE',
  },
  {
    title: 'JARDIN',
  },
  {
    title: 'PISCINE',
  },
];
