import {FilterType} from "../const";
import dayjs from "dayjs";

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.DISABLED]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs(point.dates.start).isAfter(dayjs())),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs(point.dates.start).isBefore(dayjs()))
};
