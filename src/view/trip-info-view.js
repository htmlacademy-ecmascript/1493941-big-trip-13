import dayjs from "dayjs";
import AbstractView from "./abstract-view.js";

const createTripInfoElement = (tripDestination, tripDuration) => {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${tripDestination}</h1>

              <p class="trip-info__dates">${tripDuration}</p>
            </div>
          </section>`;
};

export default class TripInfoView extends AbstractView {
  constructor(points) {
    super();
    this._tripDuration = this._getTripDuration(points);
    this._tripDestination = this._getTripDestination(points);
  }

  _getTripDestination(points) {
    if (points.length > 0 && points.length <= 3) {
      const destinations = new Set(points.map((point) => `${point.destination}`));
      return [...destinations].join(` &mdash; `);
    }
    return `${points[0].destination} &mdash; ... &mdash; ${points[points.length - 1].destination}`;
  }

  _getTripDuration(points) {
    return `${dayjs(points[0].dates.start).format(`DD MMM`)}&nbsp;—&nbsp;${dayjs(points[points.length - 1].dates.end).format(`DD MMM`)}`;
  }

  getTemplate() {
    return createTripInfoElement(this._tripDestination, this._tripDuration);
  }
}
