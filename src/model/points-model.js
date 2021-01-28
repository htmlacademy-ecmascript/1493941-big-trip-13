import Observer from "../utils/observer.js";
import dayjs from "dayjs";

export default class PointsModel extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();
    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, data) {
    const index = this._points.findIndex((point) => point.id === data.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting points`);
    }

    this._points = [
      ...this._points.slice(0, index),
      data,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, data);
  }

  addPoint(updateType, data) {
    this._points.unshift(data);

    this._notify(updateType, data);
  }

  deletePoint(updateType, data) {
    const index = this._points.findIndex((point) => point.id === data.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting points`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const {name, description: descriptionPoint, pictures: photos} = point.destination;
    const {date_from: dateFrom, date_to: dateTo, is_favorite: isFavoritePoint, base_price: basePrice} = point;

    return Object.assign(
        {},
        {
          id: point.id,
          type: point.type,
          destination: name,
          offers: point.offers,
          description: descriptionPoint,
          photo: photos,
          dates: {
            start: dateFrom,
            end: dateTo,
            duration: dayjs(dateFrom).diff(dayjs(dateTo)),
          },
          price: Number(basePrice),
          isFavorite: isFavoritePoint,
          isDestinationDescription: point.description !== ``
        }
    );
  }

  static adaptToServer(point) {
    return Object.assign(
        {},
        {
          base_price: Number(point.price),
          date_from: new Date(point.dates.start).toISOString(),
          date_to: new Date(point.dates.end).toISOString(),
          destination: {
            name: point.destination,
            description: point.description,
            pictures: point.photo ? point.photo : []
          },
          id: point.id,
          is_favorite: point.isFavorite,
          offers: point.offers,
          type: point.type,
        }
    );
  }
}
