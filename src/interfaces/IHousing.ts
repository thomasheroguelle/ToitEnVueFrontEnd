export interface IHousing {
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
  furnished: boolean;
  living_space: number;
  highlights: HighLights[];
  year_of_construction: number;
  housingCondition: HousingConditionEnum;
  user_id: number;
  username: string;
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
  img: string;
}
