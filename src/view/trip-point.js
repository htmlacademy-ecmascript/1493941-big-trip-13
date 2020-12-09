import {getDateFormat, getDatesDuration, createElement} from "../util.js";
import {offerOptions} from "../mocks/event.js";

const createTripPointElement = (event) => {
  const {type, destination, offers, dateTime, price, isFavorite} = event;
  let offersList = ``;
  if (offers.length) {
    const options = Object.entries(offerOptions[type]);
    for (const [key, value] of options) {
      if (offers.includes(key)) {
        offersList = offersList + `<li class="event__offer"><span class="event__offer-title">${value.name}</span>&plus;&euro;&nbsp;<span class="event__offer-price">${value.price}</span></li>`;
      }
    }
    offersList = `<h4 class="visually-hidden">Offers:</h4><ul class="event__selected-offers">${offersList}</ul>`;
  }

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${getDateFormat(dateTime.start).formatDate}">${getDateFormat(dateTime.start).day}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${getDateFormat(dateTime.start).formatDate}">${getDateFormat(dateTime.start).time}</time>
        &mdash;
        <time class="event__end-time" datetime="${getDateFormat(dateTime.end).formatDate}">${getDateFormat(dateTime.end).time}</time>
      </p>
      <p class="event__duration">${getDatesDuration(dateTime.start, dateTime.end)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>
    ${offersList}
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

export default class TripPoint {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createTripPointElement(this._event);
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
