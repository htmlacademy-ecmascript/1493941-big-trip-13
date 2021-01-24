import AbstractView from "./abstract-view.js";

const createNoPointsElement = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class TripList extends AbstractView {
  getTemplate() {
    return createNoPointsElement();
  }
}
