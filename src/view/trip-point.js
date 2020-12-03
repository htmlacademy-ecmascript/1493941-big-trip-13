import {getDateFormat, getDatesDuration} from "../util.js";

export const createTripPointElement = (event) => {

  let offersList = ``;
  if (event.offers.length) {
    const checkedOffers = event.offers.slice().filter((offer) => offer.isChecked);

    for (const offer of checkedOffers) {
      offersList = offersList + `<li class="event__offer">
        <span class="event__offer-title">${offer.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`;
    }
    offersList = `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">${offersList}</ul>`;
  }
  return `
<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${getDateFormat(event.dateTime.start).formatDate}">${getDateFormat(event.dateTime.start).day}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${event.type} ${event.destination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${getDateFormat(event.dateTime.start).formatDate}">${getDateFormat(event.dateTime.start).time}</time>
        &mdash;
        <time class="event__end-time" datetime="${getDateFormat(event.dateTime.end).formatDate}">${getDateFormat(event.dateTime.end).time}</time>
      </p>
      <p class="event__duration">${getDatesDuration(event.dateTime.start, event.dateTime.end)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${event.price}</span>
    </p>
    ${offersList}
    <button class="event__favorite-btn ${event.isFavorite ? `event__favorite-btn--active` : ``}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>
`;
};
