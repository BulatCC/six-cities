import { User } from './offers';

export type Review = {
  id: number,
  rating: number,
  comment: string,
  user: User,
  date: Date,
}

export type ReviewBackend = {
  rating: string,
  comment: string,
  id: string | undefined,
}
