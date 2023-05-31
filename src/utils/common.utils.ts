import { GAME_SIDE, WOOD_COUNT } from "../common/common.constants";
import { IWood } from "../interfaces/common.interface";

export const createRandomWood = () => {
  const random = Math.random();
  const randomZeroOrOneOrTwo = Math.floor(random * 3);
  let woodType = null;
  if (randomZeroOrOneOrTwo === 1) woodType = GAME_SIDE.LEFT;
  if (randomZeroOrOneOrTwo === 2) woodType = GAME_SIDE.RIGHT;

  return { id: random, woodType };
};

export const addNextWood = (woodArray: IWood[]) => {
  if (
    woodArray[0].woodType === GAME_SIDE.LEFT ||
    woodArray[0].woodType === GAME_SIDE.RIGHT
  ) {
    return { id: Math.random(), woodType: null };
  } else {
    return createRandomWood();
  }
};

export const generateWoodAtTheStart = () => {
  const START_WOOD_ARRAY: IWood[] = [];

  for (let i = 0; i <= WOOD_COUNT; i++) {
    if (i === WOOD_COUNT || i % 2 === 0) {
      START_WOOD_ARRAY.push({ id: Math.random(), woodType: null });
    } else {
      START_WOOD_ARRAY.push(createRandomWood());
    }
  }

  return START_WOOD_ARRAY;
};
