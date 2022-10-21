export type OfferCardTypes = {
  isFavorite: boolean,
  isPremium: boolean,
  price: number,
  title: string,
  type: string,
  rating: number,
  previewImage: string,
  id: number,
};

export type User = {
  id: number,
  name: string,
  isPro: boolean,
  avatarUrl: string
}

export type Offer = OfferCardTypes & {
  city: {
    name: string;
    location: {
      latitude: number,
      longitude: number,
      zoom: number,
    }
  },
  images: string[],
  bedrooms: number,
  maxAdults: number,
  goods: string[],
  host: User,
  description: string,
  location: {
    latitude: number,
    longitude: number,
    zoom: number
  },
}

export type SortedData = {
  cityName: string,
  data: Offer[],
};

export type CityOffers = Record<string, Offer[]>;

// аналогичная запись для CityOffers через type
// export type CityOffers = {
//   [index: string]: Offer[]
// }

// аналогичная запись для CityOffers через interface
// export interface CityOffers {
//   [index: string]: Offer[]
// }
