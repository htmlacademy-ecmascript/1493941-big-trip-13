import AbstractView from "./abstract.js";

const createTripListElement = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class TripList extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createTripListElement();
  }
}

