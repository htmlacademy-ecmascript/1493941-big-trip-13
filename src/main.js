import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import {generateEvent, offerOptions, point} from "./mocks/event.js";
import PointsModel from "./model/points.js";
import OffersModel from "./model/offers.js";
import FilterModel from "./model/filter.js";
import DestinationsModel from "./model/destinations.js";

const EVENT_COUNT = 6;

const tripMain = document.querySelector(`.trip-main`);
const tripControlsTitle = document.querySelector(`.trip-controls :last-child`);
const tripPointsContainer = document.querySelector(`.trip-events`);
const addButton = tripMain.querySelector(`.trip-main__event-add-btn`);

const eventsPoints = new Array(EVENT_COUNT).fill().map(generateEvent);

const pointsModel = new PointsModel();
pointsModel.setPoints(eventsPoints);
const offersModel = new OffersModel();
offersModel.setOffers(offerOptions);
const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(point);
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripMain, tripControlsTitle, tripPointsContainer, pointsModel, offersModel, destinationsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsTitle, filterModel, pointsModel);

tripPresenter.init();
filterPresenter.init();

addButton
  .addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tripPresenter.createPoint();
    addButton.disabled = true;
  });
