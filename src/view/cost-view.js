import AbstractView from "./abstract-view.js";

const createCostInfoElement = (points) => {
  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripCost(points)}</span>
            </p>`;
};

const getTripCost = (points) => {
  let cost = 0;
  for (const item of points) {
    const offerPrice = (item.offers.length > 0) ? item.offers.map((offer) => offer.price).reduce((a, b) => a + b) : 0;
    cost += item.price + offerPrice;
  }

  return cost;
};

export default class CostInfo extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createCostInfoElement(this._points);
  }
}
