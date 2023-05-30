import { WOOD_TYPE } from "../common/common.constants";

export interface IWood {
  id: number;
  woodType: keyof typeof WOOD_TYPE;
}
