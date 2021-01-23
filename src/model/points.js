import Observer from "../utils/observer.js";

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
}
