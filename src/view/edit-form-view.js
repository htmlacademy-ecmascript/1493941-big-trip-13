import SmartView from "./smart-view.js";
import dayjs from "dayjs";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

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

const createOffersListElement = (offers, pointOffers) => {
  return `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                      <div class="event__available-offers">
    ${offers.map((value) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" data-name="${value.title}" data-price="${value.price}" id="event-offer-${value.title}-1" type="checkbox" name="event-offer-${value.title}" ${pointOffers.findIndex((item) => item.title === value.title) >= 0 ? `checked` : ``}>
            <label class="event__offer-label" for="event-offer-${value.title}-1">
                <span class="event__offer-title">${value.title}</span>
                   &plus;&euro;&nbsp;
                <span class="event__offer-price">${value.price}</span>
            </label>
    </div>`).join(``)}</div></section>`;
};

const createDestinationListElement = (description) => {
  return `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                  </section>`;
};

const createPhotoListElement = (photo) => {
  return `<div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photo.map((item) => `<img class="event__photo" src="${item.src}" alt="${item.description}">`).join(``)}
                      </div>
                    </div>`;
};

const createEditPointElement = (data, isSubmitDisabled, offers, pointTypes, destinations, isNewPoint) => {
  const pointOffers = data.offers;
  const offersByType = isNewPoint ? offers.find((item) => item.type === pointTypes[0]).offers : offers.find((item) => item.type === data.type).offers;
  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${isNewPoint ? pointTypes[0] : data.type.toLowerCase()}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${pointTypes.map((pointType) => `<div class="event__type-item">
                          <input id="event-type-${pointType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === data.type ? `checked` : ``}>
                          <label class="event__type-label  event__type-label--${pointType.toLowerCase()}" for="event-type-${pointType.toLowerCase()}-1">${pointType}</label>
                        </div>`).join(``)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">${data.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${data.destination}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${destinations.map((item) => `<option value="${item.name}"></option>`).join(``)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(data.dates.start).format(`DD/MM/YY HH:mm`)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(data.dates.end).format(`DD/MM/YY HH:mm`)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${data.price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? `disabled` : ``}>Save</button>
                  <button class="event__reset-btn" type="reset">${isNewPoint ? `Cancel` : `Delete`}</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                ${offersByType.length > 0 ? createOffersListElement(offersByType, pointOffers) : ``}
                ${data.isDestinationDescription ? createDestinationListElement(data.description) : ``}
                ${data.photo.length > 0 ? createPhotoListElement(data.photo) : ``}
                </section>
              </form>
            </li>`;
};

export default class EditFormView extends SmartView {
  constructor(event, isNewPoint, offers, destinations) {
    super();
    this.isNewPoint = isNewPoint;
    this._data = this.isNewPoint ? EditFormView.adaptEventToData(BLANK_EVENT) : EditFormView.adaptEventToData(event);
    this._destinations = destinations;
    this._pointTypes = offers.map((item) => item.type);
    this._offers = offers;
    this.isSubmitDisabled = false;
    this._startDatepicker = null;
    this._endDatepicker = null;

    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._changeTypeHandler = this._changeTypeHandler.bind(this);
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._changeOffersHandler = this._changeOffersHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }
  }

  reset(event) {
    this.updateData(EditFormView.adaptEventToData(event));
  }

  getTemplate() {
    return createEditPointElement(this._data, this.isSubmitDisabled, this._offers, this._pointTypes, this._destinations, this.isNewPoint);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setSubmitHandler(this._callback.submitClick);
    this.setCloseClickHandler(this._callback.closeClick);
    this._setDatepicker();
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setDatepicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    this._startDatepicker = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          dateFormat: `d/m/Y H:i`,
          enableTime: true,
          time_24hr: true,
          defaultDate: this._data.dates.start,
          onClose: this._startDateChangeHandler
        }
    );

    this._endDatepicker = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          dateFormat: `d/m/Y H:i`,
          enableTime: true,
          time_24hr: true,
          minDate: this._data.dates.start,
          defaultDate: this._data.dates.end,
          onClose: this._endDateChangeHandler
        }
    );
  }

  _changeTypeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offers: [],
    });
  }

  _changeOffersHandler(evt) {
    evt.preventDefault();
    if (evt.target.checked) {
      this._data.offers.push({title: evt.target.dataset.name, price: Number(evt.target.dataset.price)});
      this.updateData({
        offers: this._data.offers,
      });
    }
    if (!evt.target.checked) {
      this._data.offers = this._data.offers.filter((item) => item.title !== evt.target.dataset.name);
      this.updateData({
        offers: this._data.offers,
      });
    }
  }

  _changeDestinationHandler(evt) {
    evt.preventDefault();
    if (this._destinations.filter((item) => item.name === evt.target.value).length > 0) {
      const destination = this._destinations.filter((item) => item.name === evt.target.value)[0];
      this.isSubmitDisabled = false;
      this.updateData({
        destination: evt.target.value,
        description: destination.description,
        photo: destination.pictures,
        isDestinationDescription: destination.description !== ``,
        isDestinationPhoto: destination.photo !== [],
      });
    } else {
      this.isSubmitDisabled = true;
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
    const type = this.isNewPoint ? this._offers[0].type : this._data.type;
    const offersByType = this._offers.find((item) => item.type === type).offers;
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._changeTypeHandler);
    this.getElement()
      .querySelector(`.event__field-group--destination`)
      .addEventListener(`change`, this._changeDestinationHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._priceInputHandler);
    if (offersByType.length > 0) {
      this.getElement()
        .querySelector(`.event__available-offers`)
        .addEventListener(`change`, this._changeOffersHandler);
    }
  }

  _startDateChangeHandler([userDate]) {
    this.updateData({
      dates: {
        start: dayjs([userDate]).toDate(),
        end: this._data.dates.end,
      }
    });
  }

  _endDateChangeHandler([userDate]) {
    this.updateData({
      dates: {
        start: this._data.dates.start,
        end: dayjs([userDate]).toDate(),
      }
    });
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
    this._callback.submitClick(EditFormView.adaptDataToEvent(this._data));
  }

  setSubmitHandler(callback) {
    this._callback.submitClick = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._submitHandler);
  }

  static adaptEventToData(event) {
    return Object.assign({}, event, {
      isDestinationDescription: event.description !== ``,
      isPhoto: Boolean(event.photo.length > 0)
    });
  }

  static adaptDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isDestinationDescription;
    delete data.isPhoto;

    return data;
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditFormView.adaptDataToEvent(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

}
