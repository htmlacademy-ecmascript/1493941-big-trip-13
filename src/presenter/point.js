import TripPointView from "../view/trip-point";
import PointEditFormView from "../view/edit-form";
import {render, RenderPosition, replace, remove} from "../utils/render";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Point {
  constructor(tripPointsContainer, changeData, changeMode) {
    this._tripPointsContainer = tripPointsContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._tripPointComponent = null;
    this._tripPointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._setEditClickHandler = this._setEditClickHandler.bind(this);
    this._setCloseClickHandler = this._setCloseClickHandler.bind(this);
    this._setSubmitHandler = this._setSubmitHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(tripPoint) {
    this._tripPoint = tripPoint;

    const prevTripPointComponent = this._tripPointComponent;
    const prevTripPointEditComponent = this._tripPointEditComponent;

    this._tripPointComponent = new TripPointView(this._tripPoint);
    this._tripPointEditComponent = new PointEditFormView(this._tripPoint);

    this._tripPointComponent.setEditClickHandler(this._setEditClickHandler);
    this._tripPointEditComponent.setSubmitHandler(this._setSubmitHandler);
    this._tripPointEditComponent.setCloseClickHandler(this._setCloseClickHandler);
    this._tripPointComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevTripPointComponent === null || prevTripPointEditComponent === null) {
      render(this._tripPointsContainer, this._tripPointComponent, RenderPosition.BEFOREEND);
      return;
    }
    if (this._mode === Mode.DEFAULT) {
      replace(this._tripPointComponent, prevTripPointComponent);
    }
    if (this._mode === Mode.EDITING) {
      replace(this._tripPointEditComponent, prevTripPointEditComponent);
    }

    remove(prevTripPointComponent);
    remove(prevTripPointEditComponent);
  }

  destroy() {
    remove(this._tripPointComponent);
    remove(this._tripPointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditFormToTripPoint();
    }
  }

  _replaceTripPointToEditForm() {
    replace(this._tripPointEditComponent, this._tripPointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceEditFormToTripPoint() {
    replace(this._tripPointComponent, this._tripPointEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._tripPoint, {isFavorite: !this._tripPoint.isFavorite}));
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceEditFormToTripPoint();
    }
  }

  _setEditClickHandler() {
    this._replaceTripPointToEditForm();
  }

  _setCloseClickHandler() {
    this._replaceEditFormToTripPoint();
  }

  _setSubmitHandler(tripPoint) {
    this._changeData(tripPoint);
    this._replaceEditFormToTripPoint();
  }
}
