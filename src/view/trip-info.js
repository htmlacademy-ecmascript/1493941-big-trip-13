import {createElement} from "../util.js";
import dayjs from "dayjs";

const createTripInfoElement = (tripDestination, tripDuration) => {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${tripDestination}</h1>

              <p class="trip-info__dates">${tripDuration}</p>
            </div>
          </section>`;
};

export default class TripInfo {
  constructor(array) {
    this._tripDestination = `${dayjs(array[0].dateTime.start).format(`MMM DD`)}&nbsp;—&nbsp;${dayjs(array[array.length - 1].dateTime.end).format(`DD`)}`;
    this._tripDuration = `${array[0].destination} &mdash; ... &mdash; ${array[array.length - 1].destination}`;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoElement(this._tripDestination, this._tripDuration);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
