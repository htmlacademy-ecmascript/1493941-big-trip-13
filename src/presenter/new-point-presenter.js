import PointEditFormView from "../view/edit-form-view.js";
import {UserAction, UpdateType} from "../const.js";
import {render, RenderPosition, remove} from "../utils/render.js";

export default class NewPointPresenter {
  constructor(tripPointsContainer, handleViewAction, offers, destination) {
    this._tripPointsContainer = tripPointsContainer;
    this._changeData = handleViewAction;
    this._offers = offers;
    this._destinations = destination;

    this._tripPointEditComponent = null;
    this._destroyCallback = null;

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._renderForm = this._renderForm.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._tripPointEditComponent !== null) {
      return;
    }

    this._tripPointEditComponent = new PointEditFormView({}, true, this._offers, this._destinations);
    this._tripPointEditComponent.setSubmitHandler(this._handleSubmit);
    this._tripPointEditComponent.setCloseClickHandler(this._handleCloseClick);
    this._tripPointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    this._renderForm();
  }

  _renderForm() {
    render(this._tripPointsContainer, this._tripPointEditComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._tripPointEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._tripPointEditComponent);
    this._tripPointEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    document.querySelector(`.trip-main__event-add-btn`).disabled = false;
  }

  setSaving() {
    this._tripPointEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._tripPointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._tripPointEditComponent.shake(resetFormState);
  }


  _handleSubmit(point) {
    this._changeData(UserAction.ADD_POINT, UpdateType.MAJOR, point);
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }

  _handleCloseClick() {
    this.destroy();
  }
}
