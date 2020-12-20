import AbstractView from "./abstract.js";

const createNoPointsElement = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class TripList extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createNoPointsElement();
  }
}
