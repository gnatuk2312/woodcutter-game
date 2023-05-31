import { generateWoodAtTheStart } from "../utils/common.utils";

export enum GAME_SIDE {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export const WINDOW_HEIGHT = window.innerHeight;
export const WINDOW_WIDTH = window.innerWidth;
export const WINDOW_CENTER_X = window.innerWidth / 2;

export const WOOD_WIDTH = 40;
export const WOOD_HEIGHT = 40;
export const WOOD_COUNT = Math.floor(WINDOW_HEIGHT / WOOD_HEIGHT);
export const INITIAL_WOOD_ARRAY = generateWoodAtTheStart();

export const TIMER_WIDTH = WINDOW_WIDTH * 0.5;
export const TIMER_HEIGHT = 40;
export const TIMER_MAXIMUM_MS = 10000;
export const TIMER_STEP_PER_CLICK_MS = 500;
export const TIMER_INTERVAL_DELAY = 10;
export const TIMER_INTERVAL_MINUS_STEP = 20;

export const SCORE_STEP_FOR_LEVEL_UP = 10;
