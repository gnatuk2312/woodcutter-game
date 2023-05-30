import { WOOD_TYPE, WOOD_TYPE_LENGTH } from "../common/common.constants";
import { IWood } from "../interfaces/common.interface";

export const createRandomWood = () => {
  const random = Math.random();
  const randomZeroOrOneOrTwo = Math.floor(random * WOOD_TYPE_LENGTH);
  let woodType = WOOD_TYPE.NONE;
  if (randomZeroOrOneOrTwo === 1) woodType = WOOD_TYPE.LEFT;
  if (randomZeroOrOneOrTwo === 2) woodType = WOOD_TYPE.RIGHT;

  return { id: random, woodType };
};

export const addNextWood = (woodArray: IWood[]) => {
  if (
    woodArray[0].woodType === WOOD_TYPE.LEFT ||
    woodArray[0].woodType === WOOD_TYPE.RIGHT
  ) {
    return { id: Math.random(), woodType: WOOD_TYPE.NONE };
  } else {
    return createRandomWood();
  }
};