import AbstractView from "./abstract-view.js";

const createLoadElement = () => {
  return `<p class="trip-events__msg">Loading...</p>`;
};

export default class LoadView extends AbstractView {
  getTemplate() {
    return createLoadElement();
  }
}
