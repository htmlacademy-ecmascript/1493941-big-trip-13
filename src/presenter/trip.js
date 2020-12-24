import TripInfoView from "../view/trip-info.js";
import CostInfoView from "../view/cost.js";
import MenuView from "../view/menu.js";
import FilterFormView from "../view/filter.js";
import {render, RenderPosition} from "../utils/render.js";
import TripListView from "../view/trip-list";
import SorterView from "../view/sorter";
import NoPointsView from "../view/no-points";
import PointPresenter from "./point.js";
import {updateItem} from "../utils/common.js";
import {sortByTime, sortByPrice} from "../utils/util.js";
import {SortType} from "../const.js";

export default class Trip {
  constructor(tripInfoContainer, tripMenuContainer, tripPointsContainer) {
    this._tripInfoContainer = tripInfoContainer;
    this._tripMenuContainer = tripMenuContainer;
    this._tripPointsContainer = tripPointsContainer;
    this._tripPointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._tripListComponent = null;
    this._sortComponent = null;
    this._noPointsComponent = null;
    this._tripInfoComponent = null;
    this._costInfoComponent = null;
    this._menuComponent = null;
    this._filterFormComponent = null;

    this._handleTripPointChange = this._handleTripPointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._sourcedtripPoints = tripPoints.slice();

    this._tripInfoComponent = new TripInfoView(this._tripPoints);
    this._costInfoComponent = new CostInfoView(this._tripPoints);
    this._menuComponent = new MenuView();
    this._filterFormComponent = new FilterFormView();
    this._tripListComponent = new TripListView(this._tripPoints);
    this._sortComponent = new SorterView();
    this._noPointsComponent = new NoPointsView();

    this._renderTripList(this._tripPoints);
    this._renderTripInfo(this._tripPoints);
    this._renderSort(this._tripPoints);
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._tripPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        this._tripPoints.sort(sortByPrice);
        break;
      default:
        this._tripPoints = this._sourcedtripPoints.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearTripPointList();
    this._renderTripPoints();
  }

  _handleModeChange() {
    Object
      .values(this._tripPointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderSort(tripPoints) {
    if (tripPoints.length) {
      render(this._tripPointsContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
      this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    }
  }

  _renderTripList(tripPoints) {
    if (tripPoints.length) {
      render(this._tripPointsContainer, this._tripListComponent, RenderPosition.BEFOREEND);
      this._renderTripPoints();
    } else {
      render(this._tripPointsContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
    }
  }

  _renderTripInfo(tripPoints) {
    if (tripPoints.length) {
      render(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
      const tripInfo = this._tripInfoContainer.querySelector(`.trip-info`);
      render(tripInfo, this._costInfoComponent.getElement(), RenderPosition.BEFOREEND);
    }

    render(this._tripMenuContainer, this._menuComponent, RenderPosition.BEFOREBEGIN);
    render(this._tripMenuContainer, this._filterFormComponent, RenderPosition.AFTEREND);
  }

  _renderPoint(tripPoint) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._handleTripPointChange, this._handleModeChange);
    pointPresenter.init(tripPoint);
    this._tripPointPresenter[tripPoint.id] = pointPresenter;
  }

  _renderTripPoints() {
    this._tripPoints
      .slice()
      .forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _handleTripPointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._tripPointPresenter[updatedPoint.id].init(updatedPoint);
  }


  _clearTripPointList() {
    Object
      .values(this._tripPointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._tripPointPresenter = {};
  }
}
