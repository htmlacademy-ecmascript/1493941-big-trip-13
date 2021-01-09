import {offerOptions, pointDestinations, pointTypes, point} from "../mocks/event.js";
import SmartView from "../presenter/smart.js";
import dayjs from "dayjs";

const BLANK_EVENT = {
  type: ``,
  destination: ``,
  offers: [],
  description: ``,
  photo: [],
  dates: {
    start: dayjs().format(`DD/MM/YY HH:mm`),
    end: dayjs().format(`DD/MM/YY HH:mm`),
  },
  price: 0,
  isFavorite: false,
};

let isSubmitDisabled = false;

const creatOffersListElement = (options, isOffersOptions, offers) => {
  if (isOffersOptions) {
    return `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                      <div class="event__available-offers">
    ${Object.entries(options).map((value) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" data-name="${value[0]}" id="event-offer-${value[0]}-1" type="checkbox" name="event-offer-${value[0]}" ${offers.includes(value[0]) ? `checked` : ``}>
            <label class="event__offer-label" for="event-offer-${value[0]}-1">
                <span class="event__offer-title">${value[1].name}</span>
                   &plus;&euro;&nbsp;
                <span class="event__offer-price">${value[1].price}</span>
            </label>
    </div>`).join(``)}</div></section>`;
  } else {
    return ``;
  }
};

const creatDestinationListElement = (description, isDestinationDescription) => {
  if (isDestinationDescription) {
    return `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                  </section>`;
  } else {
    return ``;
  }
};


const creatPhotoListElement = (photo, isPhoto) => {
  let photoString = ``;
  if (isPhoto) {
    for (const item of photo) {
      photoString = photoString + `<img class="event__photo" src="${item}" alt="Event photo">`;
    }

    return `<div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photoString}
                      </div>
                    </div>`;
  } else {
    return ``;
  }
};

const createEditPointElement = (data) => {
  const {
    type,
    destination,
    offers,
    dates,
    price,
    photo,
    description,
    isDestinationDescription,
    isPhoto,
    isOffersOptions,
  } = data;

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${pointTypes.map((pointType) => `<div class="event__type-item">
                          <input id="event-type-${pointType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === type ? `checked` : ``}>
                          <label class="event__type-label  event__type-label--${pointType.toLowerCase()}" for="event-type-${pointType.toLowerCase()}-1">${pointType}</label>
                        </div>`).join(``)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${pointDestinations.map((name) => `<option value="${name}"></option>`).join(``)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dates.start).format(`DD/MM/YY HH:mm`)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dates.end).format(`DD/MM/YY HH:mm`)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? `disabled` : ``}>Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                ${creatOffersListElement(offerOptions[type], isOffersOptions, offers)}
                ${creatDestinationListElement(description, isDestinationDescription)}
                ${creatPhotoListElement(photo, isPhoto)}
                </section>
              </form>
            </li>`;
};

export default class PointEditForm extends SmartView {
  constructor(event = BLANK_EVENT) {
    super();
    this._data = PointEditForm.parseEventToData(event);

    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._changeTypeHandler = this._changeTypeHandler.bind(this);
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._changeOffersHandler = this._changeOffersHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(event) {
    this.updateData(PointEditForm.parseEventToData(event));
  }

  getTemplate() {
    return createEditPointElement(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setSubmitHandler(this._callback.submitClick);
    this.setCloseClickHandler(this._callback.submitClick);
  }

  _changeTypeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      isOffersOptions: Boolean(offerOptions[evt.target.value]),
      offers: [],
    });
  }

  _changeOffersHandler(evt) {
    evt.preventDefault();
    if (evt.target.checked) {
      const newOffersOption = evt.target.dataset.name;
      this.updateData({
        offers: this._data.offers.concat(newOffersOption),
      }, true);
    }
    if (!evt.target.checked) {
      const indexOffersOption = this._data.offers.indexOf(evt.target.dataset.name);
      this.updateData({
        offers: this._data.offers.splice(indexOffersOption, 1),
      });
    }
  }

  _changeDestinationHandler(evt) {
    evt.preventDefault();
    if (pointDestinations.includes(evt.target.value)) {
      isSubmitDisabled = false;
      this.updateData({
        destination: evt.target.value,
        description: point[evt.target.value.toUpperCase()].description,
        photo: point[evt.target.value.toUpperCase()].photo,
        isDestinationDescription: point[evt.target.value.toUpperCase()].description !== ``,
        isDestinationPhoto: point[evt.target.value.toUpperCase()].photo !== ``,
      });
    } else {
      isSubmitDisabled = true;
      this.getElement().querySelector(`.event__save-btn`).disabled = true;
    }
  }

  _priceInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value,
    }, true);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._changeTypeHandler);
    this.getElement()
      .querySelector(`.event__field-group--destination`)
      .addEventListener(`change`, this._changeDestinationHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._priceInputHandler);
    if (this._data.isOffersOptions) {
      this.getElement()
        .querySelector(`.event__available-offers`)
        .addEventListener(`change`, this._changeOffersHandler);
    }
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._closeClickHandler);
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submitClick(PointEditForm.parseDataToEvent(this._data));
  }

  setSubmitHandler(callback) {
    this._callback.submitClick = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._submitHandler);
  }

  static parseEventToData(event) {
    return Object.assign({}, event, {
      isDestinationDescription: event.description !== ``,
      isPhoto: event.photo !== [],
      isOffersOptions: Boolean(offerOptions[event.type]),
    });
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isDestinationDescription;
    delete data.isPhoto;
    delete data.isOffersOptions;

    return data;
  }
}
