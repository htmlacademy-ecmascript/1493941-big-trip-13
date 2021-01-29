import TripInfoView from "../view/trip-info-view.js";
import CostInfoView from "../view/cost-view.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import TripListView from "../view/trip-list-view.js";
import SorterView from "../view/sorter-view.js";
import NoPointsView from "../view/no-points-view.js";
import PointPresenter, {State as PointPresenterViewState} from "./point-presenter.js";
import NewPointPresenter from "./new-point-presenter.js";
import LoadingView from "../view/load-view.js";
import {sortByDate, sortByDuration, sortByPrice} from "../utils/util.js";
import {SortType, UpdateType, UserAction, FilterType} from "../const";

export default class TripPresenter {
  constructor(tripInfoContainer, tripPointsContainer, pointsModel, offersModel, destinationsModel, filterModel, api) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._tripInfoContainer = tripInfoContainer;
    this._tripPointsContainer = tripPointsContainer;
    this._tripPointsPresenter = {};
    this._currentSortType = SortType.DAY;
    this._isLoading = true;
    this._api = api;

    this._tripListComponent = null;
    this._sortComponent = null;
    this._noPointsComponent = null;
    this._tripInfoComponent = null;
    this._costInfoComponent = null;

    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._tripListComponent = new TripListView();
    this._noPointsComponent = new NoPointsView();

    this._renderTrip();
  }

  createPoint(callback) {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._newPointPresenter = new NewPointPresenter(
        this._tripListComponent,
        this._handleViewAction,
        this._offersModel.getOffers(),
        this._destinationsModel.getDestinations()
    );
    this._newPointPresenter.init(callback);
  }

  _getOffers() {
    return this._offersModel.getOffers();
  }

  _getDestinations() {
    return this._destinationsModel.getDestinations();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.DURATION:
        return filtredPoints.slice().sort(sortByDuration);
      case SortType.PRICE:
        return filtredPoints.slice().sort(sortByPrice);
      case SortType.DAY:
        return filtredPoints.slice().sort(sortByDate);
    }
    return filtredPoints;
  }

  destroy() {
    this._clearTripPointList(true);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearTripPointList(false);
    this._renderSort();
    this._renderTripList();
  }

  _handleModeChange() {
    Object
      .values(this._tripPointsPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SorterView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripPointsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoPoints() {
    render(this._tripPointsContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderTripList() {
    render(this._tripPointsContainer, this._tripListComponent, RenderPosition.BEFOREEND);

    const points = this._getPoints().slice();
    const offers = this._getOffers();
    const destinations = this._getDestinations();
    this._renderTripPoints(points, offers, destinations);
  }

  _renderTripInfo() {
    this._tripInfoComponent = new TripInfoView(this._getPoints());
    render(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    const tripInfo = this._tripInfoContainer.querySelector(`.trip-info`);
    this._costInfoComponent = new CostInfoView(this._getPoints());
    render(tripInfo, this._costInfoComponent.getElement(), RenderPosition.BEFOREEND);
  }

  renderTripInfo() {
    this._renderTripInfo();
  }

  _renderLoading() {
    render(this._tripPointsContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter(this._tripListComponent, offers, destinations, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._tripPointsPresenter[point.id] = pointPresenter;
  }

  _renderTripPoints(points, offers, destinations) {
    points.forEach((point) => this._renderPoint(point, offers, destinations));
  }

  _handleViewAction(actionType, updateType, update) {

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._tripPointsPresenter[update.id].setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          })
           .catch(() => {
             this._tripPointsPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
           });
        break;
      case UserAction.ADD_POINT:
        this._newPointPresenter.setSaving();
        this._api.addPoint(update)
          .then((response) => {
            console.log(response);
            this._pointsModel.addPoint(updateType, response);
          })
          .catch((er) => {
            console.log(er);
            this._newPointPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_POINT:
        this._tripPointsPresenter[update.id].setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update)
          .then(() => {
            this._pointsModel.deletePoint(updateType, update);
          })
          .catch(() => {
            this._tripPointsPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._tripPointsPresenter[data.id].init(data, this._getOffers(), this._getDestinations());
        break;
      case UpdateType.MINOR:
        this._clearTripPointList(false);
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTripPointList(true);
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _clearTripPointList(resetSortType = false) {
    Object
      .values(this._tripPointsPresenter)
      .forEach((presenter) => presenter.destroy());
    this._tripPointsPresenter = {};

    remove(this._sortComponent);
    remove(this._loadingComponent);
    remove(this._tripListComponent);
    remove(this._noPointsComponent);
    remove(this._tripInfoComponent);
    remove(this._costInfoComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _clearTripInfo() {
    remove(this._tripInfoComponent);
    remove(this._costInfoComponent);
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const points = this._getPoints();
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderTripList(points);
    this._renderTripInfo();
  }
}
