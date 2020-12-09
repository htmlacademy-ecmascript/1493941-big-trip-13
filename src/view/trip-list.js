import {createElement} from "../util.js";

const createTripListElement = (eventCount, status) => {
  if (status === 200) {
    return (eventCount > 0) ? `<ul class="trip-events__list"></ul>` : `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  } else {
    return `<p class="trip-events__msg">Loading...</p>`;
  }
};

export default class TripList {
  constructor(events, status) {
    this.eventCount = events.length;
    this.status = status;
    this._element = null;
  }

  getTemplate() {
    return createTripListElement(this.eventCount, this.status);
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

