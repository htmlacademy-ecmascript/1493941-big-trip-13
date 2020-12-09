import {createElement} from "../util.js";
import {offerOptions} from "../mocks/event";

const createCostInfoElement = (cost) => {
  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
            </p>`;
};

const getTripCost = (array) => {
  let cost = 0;
  for (const item of array) {
    let offerPrice = 0;
    if (item.type in offerOptions) {
      for (const offer of item.offers) {
        offerPrice = offerPrice + offerOptions[item.type][offer].price;
      }
    }
    cost = cost + item.price + offerPrice;
  }

  return cost;
};

export default class CostInfo {
  constructor(array) {
    this.cost = getTripCost(array);
    this._element = null;
  }

  getTemplate() {
    return createCostInfoElement(this.cost);
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
