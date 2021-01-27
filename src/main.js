import TripPresenter from "./presenter/trip-presenter.js";
import FilterPresenter from "./presenter/filter-presenter.js";
import PointsModel from "./model/points-model.js";
import OffersModel from "./model/offers-model.js";
import FilterModel from "./model/filter-model.js";
import DestinationsModel from "./model/destinations-model.js";
import Api from "./api.js";
import {UpdateType} from "./const.js";

const AUTHORIZATION = `Basic hS2sn3dfSwSl1sa2j`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`;

const api = new Api(END_POINT, AUTHORIZATION);

const tripMain = document.querySelector(`.trip-main`);
const tripControlsTitle = document.querySelector(`.trip-controls :last-child`);
const tripPointsContainer = document.querySelector(`.trip-events`);
const addButton = tripMain.querySelector(`.trip-main__event-add-btn`);

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();


addButton
  .addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tripPresenter.createPoint();
    addButton.disabled = true;
  });

Promise.all([
  api.getOffers(),
  api.getDestinations(),
  api.getPoints(),
])
  .then(([offers, destinations, points]) => {
    offersModel.setOffers(offers);
    destinationsModel.setDestinations(destinations);
    pointsModel.setPoints(UpdateType.INIT, points);
  })
  .catch((er) => {
    console.log(er);
    pointsModel.setPoints(UpdateType.INIT, []);
  });

const tripPresenter = new TripPresenter(tripMain, tripControlsTitle, tripPointsContainer, pointsModel, offersModel, destinationsModel, filterModel, api);
const filterPresenter = new FilterPresenter(tripControlsTitle, filterModel, pointsModel);


tripPresenter.init();
filterPresenter.init();
