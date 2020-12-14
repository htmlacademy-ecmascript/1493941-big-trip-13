import {createElement} from "../util.js";

const createTripListElement = (eventCount) => {
  return (eventCount > 0) ? `<ul class="trip-events__list"></ul>` : `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class TripList {
  constructor(events) {
    this._eventCount = events.length;
    this._element = null;
  }

  getTemplate() {
    return createTripListElement(this._eventCount);
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

