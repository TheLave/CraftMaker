import { Rarity } from './Rarity';

export type Agent = {
  id: number;
  name: string;
  title: string;
  rarity: Rarity;
  stickers: number;
  image: string;
};
