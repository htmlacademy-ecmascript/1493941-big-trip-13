import AbstractView from "./abstract-view.js";

const createTripListElement = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class TripListView extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createTripListElement();
  }
}

