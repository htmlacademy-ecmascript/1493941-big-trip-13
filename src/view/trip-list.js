import AbstractView from "./abstract.js";

const createTripListElement = (eventCount) => {
  return (eventCount > 0) ? `<ul class="trip-events__list"></ul>` : `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class TripList extends AbstractView {
  constructor(events) {
    super();
    this._eventCount = events.length;
  }

  getTemplate() {
    return createTripListElement(this._eventCount);
  }
}

