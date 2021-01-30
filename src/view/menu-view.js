import AbstractView from "./abstract-view.js";
import {MenuItem} from "../const.js";

const createMenuElement = () => {
  return `<div class="page-body__container  page-header__container">
        <img class="page-header__logo" src="img/logo.png" width="42" height="42" alt="Trip logo">

        <div class="trip-main">
          <!-- Маршрут и стоимость -->

          <div class="trip-main__trip-controls  trip-controls">
            <h2 class="visually-hidden">Switch trip view</h2>
            <nav class="trip-controls__trip-tabs  trip-tabs">
              <a class="trip-tabs__btn  trip-tabs__btn--active" data-name="${MenuItem.TABLE}" href="#">${MenuItem.TABLE}</a>
              <a class="trip-tabs__btn" data-name="${MenuItem.STATS}" href="#">${MenuItem.STATS}</a>
            </nav>

            <h2 class="visually-hidden">Filter events</h2>
            <!-- Фильтры -->
          </div>

          <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" data-name="${MenuItem.ADD_NEW_POINT}" type="button">New event</button>
        </div>
        </div>`;
};

export default class MenuView extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._addButtonClickHandler = this._addButtonClickHandler.bind(this);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.name);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().querySelector(`.trip-controls__trip-tabs`).addEventListener(`click`, this._menuClickHandler);
  }

  _addButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.buttonClick(evt.target.dataset.name);
  }

  setAddButtonClickHandler(callback) {
    this._callback.buttonClick = callback;
    this.getElement().querySelector(`[data-name=${MenuItem.ADD_NEW_POINT}]`).addEventListener(`click`, this._addButtonClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[data-name=${menuItem}]`);

    if (item !== null) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }

  getTemplate() {
    return createMenuElement();
  }
}
