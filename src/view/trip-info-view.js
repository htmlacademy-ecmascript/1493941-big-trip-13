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
    if (points.length > 3) {
      this._tripDuration = `${dayjs(points[0].dates.start).format(`MMM DD`)}&nbsp;—&nbsp;${dayjs(points[points.length - 1].dates.end).format(`DD`)}`;
      this._tripDestination = `${points[0].destination} &mdash; ... &mdash; ${points[points.length - 1].destination}`;
    }
    if (points.length > 0 && points.length <= 3) {
      this._tripDuration = `${dayjs(points[0].dates.start).format(`MMM DD`)}&nbsp;—&nbsp;${dayjs(points[points.length - 1].dates.end).format(`DD`)}`;
      this._tripDestination = points.map((point) => `${point.destination} &mdash; `);
    }
  }

  getTemplate() {
    return createTripInfoElement(this._tripDestination, this._tripDuration);
  }
}
