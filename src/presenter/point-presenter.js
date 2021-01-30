import TripPointView from "../view/trip-point-view.js";
import PointEditFormView from "../view/edit-form-view.js";
import {UserAction, UpdateType} from "../const.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};


export default class PointPresenter {
  constructor(tripPointsContainer, offers, destinations, handleViewAction, handleModeChange) {
    this._tripPointsContainer = tripPointsContainer;
    this._changeData = handleViewAction;
    this._changeMode = handleModeChange;
    this._offers = offers;
    this._destinations = destinations;

    this._tripPointComponent = null;
    this._tripPointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(tripPoint) {
    this._tripPoint = tripPoint;

    const prevTripPointComponent = this._tripPointComponent;
    const prevTripPointEditComponent = this._tripPointEditComponent;

    this._tripPointComponent = new TripPointView(this._tripPoint);
    this._tripPointEditComponent = new PointEditFormView(this._tripPoint, false, this._offers, this._destinations);

    this._tripPointComponent.setEditClickHandler(this._handleEditClick);
    this._tripPointEditComponent.setSubmitHandler(this._handleSubmit);
    this._tripPointEditComponent.setCloseClickHandler(this._handleCloseClick);
    this._tripPointEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._tripPointComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevTripPointComponent === null || prevTripPointEditComponent === null) {
      render(this._tripPointsContainer, this._tripPointComponent, RenderPosition.BEFOREEND);
      return;
    }
    if (this._mode === Mode.DEFAULT) {
      replace(this._tripPointComponent, prevTripPointComponent);
    }
    if (this._mode === Mode.EDITING) {
      replace(this._tripPointComponent, prevTripPointEditComponent);
      this._mode = Mode.DEFAULT;
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
      this._setDefaultMode();
    }
  }

  _setEditMode() {
    replace(this._tripPointEditComponent, this._tripPointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _setDefaultMode() {
    replace(this._tripPointComponent, this._tripPointEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleFavoriteClick() {
    this._changeData(UserAction.UPDATE_POINT, UpdateType.MINOR, Object.assign({}, this._tripPoint, {isFavorite: !this._tripPoint.isFavorite}));
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._tripPointEditComponent.reset(this._tripPoint);
      this._setDefaultMode();
    }
  }

  _handleEditClick() {
    this._setEditMode();
  }

  _handleCloseClick() {
    this._setDefaultMode();
  }

  _handleSubmit(update) {
    const isMinorUpdate = update.isFavorite !== this._tripPoint.isFavorite;
    this._changeData(UserAction.UPDATE_POINT, isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH, update);
    this._setDefaultMode();
  }

  _handleDeleteClick(point) {
    this._changeData(UserAction.DELETE_POINT, UpdateType.MAJOR, point);
  }

  setViewState(state) {
    switch (state) {
      case State.SAVING:
        this._tripPointEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._tripPointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
    }
  }
}
