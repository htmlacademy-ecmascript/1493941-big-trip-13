import TripInfoView from "../view/trip-info.js";
import CostInfoView from "../view/cost.js";
import MenuView from "../view/menu.js";
import FilterFormView from "../view/filter.js";
import {render, RenderPosition} from "../utils/render.js";

export default class Trip {
  constructor(tripInfoContainer, tripMenuContainer) {
    this._tripInfoContainer = tripInfoContainer;
    this._tripMenuContainer = tripMenuContainer;
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();

    this._renderTripInfo(this._tripPoints);
  }

  _renderTripInfo(tripPoints) {
    this._tripInfoComponent = new TripInfoView(tripPoints);
    this._costInfoComponent = new CostInfoView(tripPoints);
    this._menuComponent = new MenuView();
    this._filterFormComponent = new FilterFormView();

    if (tripPoints.length) {
      render(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
      const tripInfo = this._tripInfoContainer.querySelector(`.trip-info`);
      render(tripInfo, this._costInfoComponent.getElement(), RenderPosition.BEFOREEND);
    }

    render(this._tripMenuContainer, this._menuComponent, RenderPosition.BEFOREBEGIN);
    render(this._tripMenuContainer, this._filterFormComponent, RenderPosition.AFTEREND);
  }
}
