import { GAME_SIDE } from "../common/common.constants";

export type TGameSide = keyof typeof GAME_SIDE;

export type TWoodType = TGameSide | null;

export interface IWood {
  id: number;
  woodType: TWoodType;
}
