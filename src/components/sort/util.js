import {SortType} from "../../const";

export const sortTypeToTitle = {
  [SortType.DEFAULT]: `Popular`,
  [SortType.PRICE_UP]: `Price: low to high`,
  [SortType.PRICE_DOWN]: `Price: high to low`,
  [SortType.RATING_DOWN]: `Top rated first`
};
