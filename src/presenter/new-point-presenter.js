import PointEditFormView from "../view/edit-form-view.js";
import {UserAction, UpdateType} from "../const.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {generateId} from "../utils/util.js";

export default class NewPointPresenter {
  constructor(tripPointsContainer, handleViewAction, offers, destination) {
    this._tripPointsContainer = tripPointsContainer;
    this._changeData = handleViewAction;
    this._offers = offers;
    this._destinations = destination;

    this._tripPointEditComponent = null;

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._renderForm = this._renderForm.bind(this);
  }

  init() {
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

    remove(this._tripPointEditComponent);
    this._tripPointEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    document.querySelector(`.trip-main__event-add-btn`).disabled = false;
  }

  _handleSubmit(point) {
    this._changeData(UserAction.ADD_POINT, UpdateType.MAJOR, Object.assign({id: generateId()}, point));
    this.destroy();
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
