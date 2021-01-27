import Observer from "../utils/observer.js";

export default class OffersModel extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(offers) {
    this._offers = offers.slice();
    console.log(this._offers);
  }

  getOffers() {
    return this._offers;
  }
}
