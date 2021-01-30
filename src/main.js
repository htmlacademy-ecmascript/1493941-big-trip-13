import TripPresenter from "./presenter/trip-presenter.js";
import FilterPresenter from "./presenter/filter-presenter.js";
import StatsView from "./view/trip-stat-view.js";
import MenuView from "./view/menu-view.js";
import PointsModel from "./model/points-model.js";
import OffersModel from "./model/offers-model.js";
import FilterModel from "./model/filter-model.js";
import DestinationsModel from "./model/destinations-model.js";
import Api from "./api.js";
import {UpdateType, MenuItem, FilterType} from "./const.js";
import {render, RenderPosition, remove} from "./utils/render";

const AUTHORIZATION = `Basic hS2sn3dfSwSl1sa2j`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;

const api = new Api(END_POINT, AUTHORIZATION);

const header = document.querySelector(`.page-header`);

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();
const menuComponent = new MenuView(pointsModel);

render(header, menuComponent, RenderPosition.AFTERBEGIN);

const tripMain = document.querySelector(`.trip-main`);
const tripPointsContainer = document.querySelector(`.trip-events`);
const tripFilterContainer = document.querySelector(`.trip-main__trip-controls`);
const tripPresenter = new TripPresenter(tripMain, tripPointsContainer, pointsModel, offersModel, destinationsModel, filterModel, api);
const filterPresenter = new FilterPresenter(tripFilterContainer, filterModel, pointsModel);

const handlePointNewFormClose = () => {
  menuComponent.getElement().querySelector(`[data-name=${MenuItem.TABLE}]`)
    .disable = false;
  menuComponent.setMenuItem(MenuItem.TABLE);
};

let statisticComponent = null;

const handleAddButtonClick = () => {
  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripPresenter.init();
  remove(statisticComponent);
  tripPresenter.createPoint(handlePointNewFormClose);
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MINOR, FilterType.EVERYTHING);
      tripPresenter.init();
      remove(statisticComponent);
      menuComponent.getElement().querySelector(`[data-name=${MenuItem.TABLE}]`)
        .classList.add(`trip-tabs__btn--active`);
      menuComponent.getElement().querySelector(`[data-name=${MenuItem.STATS}]`)
        .classList.remove(`trip-tabs__btn--active`);
      menuComponent.getElement().querySelector(`[data-name=${MenuItem.ADD_NEW_POINT}]`).disabled = false;
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.DISABLED);
      if (pointsModel.getPoints().length !== 0) {
        tripPresenter.renderTripInfo();
      }
      menuComponent.getElement().querySelector(`[data-name=${MenuItem.TABLE}]`)
        .classList.remove(`trip-tabs__btn--active`);
      menuComponent.getElement().querySelector(`[data-name=${MenuItem.STATS}]`)
        .classList.add(`trip-tabs__btn--active`);
      statisticComponent = new StatsView(pointsModel.getPoints());
      render(tripPointsContainer, statisticComponent, RenderPosition.AFTEREND);
      break;
  }
};

Promise.all([
  api.getOffers(),
  api.getDestinations(),
  api.getPoints(),
])
  .then(([offers, destinations, points]) => {
    offersModel.setOffers(offers);
    destinationsModel.setDestinations(destinations);
    pointsModel.setPoints(UpdateType.INIT, points);
    menuComponent.setMenuClickHandler(handleSiteMenuClick);
    menuComponent.setAddButtonClickHandler(handleAddButtonClick);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });

tripPresenter.init();
filterPresenter.init();
