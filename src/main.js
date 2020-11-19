import {
  createTripInfoElement
} from "./view/trip-info.js";
import {
  createCostInfoElement
} from "./view/cost.js";
import {
  createMenuElement
} from "./view/menu.js";
import {
  createFilterFormElement
} from "./view/filter.js";
import {
  createSorterFormElement
} from "./view/sorter.js";
import {
  createTripListElement
} from "./view/trip-list.js";
import {
  createTripPointElement
} from "./view/trip-point.js";
import {
  createNewPointElement
} from "./view/new-form.js";
import {
  createEditPointElement
} from "./view/edit-form.js";

const TASK_COUNT = 3;
const render = (container, layout, place) => {
  container.insertAdjacentHTML(place, layout);
};

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, createTripInfoElement(), `afterbegin`);

const tripInfo = document.querySelector(`.trip-info`);
render(tripInfo, createCostInfoElement(), `beforeend`);

const tripControlsTitle = document.querySelector(`.trip-controls :last-child`);
render(tripControlsTitle, createMenuElement(), `beforebegin`);
render(tripControlsTitle, createFilterFormElement(), `afterend`);

const tripEvents = document.querySelector(`.trip-events`);
render(tripEvents, createSorterFormElement(), `beforeend`);
render(tripEvents, createTripListElement(), `beforeend`);

const tripEventsList = document.querySelector(`.trip-events__list`);
render(tripEventsList, createNewPointElement(), `afterbegin`);
for (let i = 0; i < TASK_COUNT; i++) {
  render(tripEventsList, createTripPointElement(), `beforeend`);
}
render(tripEventsList, createEditPointElement(), `beforeend`);
