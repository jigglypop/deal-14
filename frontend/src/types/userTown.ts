import { TownTypes } from './town';

export type UserTownTypes = {
  id: number
  userId: string;
  townId: number;
  createdAt: string;
  updatedAt: string;
  town: TownTypes;
}