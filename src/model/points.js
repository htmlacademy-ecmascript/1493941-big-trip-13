import Observer from "../utils/observer.js";
import dayjs from "dayjs";

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(points) {
    this._points = points.slice();
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
      ...this._points.slice(index + 1)
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
      ...this._points.slice(index + 1)
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
          price: basePrice,
          isFavorite: isFavoritePoint,
          isDestinationDescription: point.description !== ``,
          isPhoto: photos !== [],
          isOffersOptions: Boolean(point.type),
        }
    );
  }

  static adaptToServer(point) {
    return Object.assign(
        {},
        point
    );
  }
}
