import {getDatesDuration} from "../utils/util.js";
import dayjs from "dayjs";
import AbstractView from "./abstract-view.js";

const createTripPointElement = (event) => {
  const {type, destination, offers, dates, price, isFavorite} = event;

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${dayjs(dates.start).format(`DD/MM/YY HH:mm`)}">${dayjs(dates.start).format(`MMM DD`)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dayjs(dates.start).format(`DD/MM/YY HH:mm`)}">${dayjs(dates.start).format(`HH:mm`)}</time>
        &mdash;
        <time class="event__end-time" datetime="${dayjs(dates.end).format(`DD/MM/YY HH:mm`)}">${dayjs(dates.end).format(`HH:mm`)}</time>
      </p>
      <p class="event__duration">${getDatesDuration(dates.start, dates.end)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>
    ${offers.length > 0 ? `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">` : ``}
    ${offers.map((offer) => `
    <li class="event__offer"><span class="event__offer-title">${offer.title}
    </span>&plus;&euro;&nbsp;<span class="event__offer-price">${offer.price}
    </span></li>`).join(``)}
    ${offers.length > 0 ? `</ul>` : ``}
    <button class="event__favorite-btn ${isFavorite ? `event__favorite-btn--active` : ``}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

export default class TripPointView extends AbstractView {
  constructor(point) {
    super();
    this._point = point;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createTripPointElement(this._point);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
