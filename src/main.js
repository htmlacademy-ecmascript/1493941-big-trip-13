import TripInfoView from "./view/trip-info.js";
import CostInfoView from "./view/cost.js";
import MenuView from "./view/menu.js";
import FilterFormView from "./view/filter.js";
import SorterView from "./view/sorter.js";
import TripListView from "./view/trip-list.js";
import TripPointView from "./view/trip-point.js";
import {generateEvent} from "./mocks/event.js";
import PointEditFormView from "./view/edit-form.js";
import {render, RenderPosition} from "./util.js";

const EVENT_COUNT = 20;
const tripMain = document.querySelector(`.trip-main`);
const tripControlsTitle = document.querySelector(`.trip-controls :last-child`);
const tripEvents = document.querySelector(`.trip-events`);
const eventsPoints = new Array(EVENT_COUNT).fill().map(generateEvent);
const events = eventsPoints.slice().sort((a, b) => {
  return +a.dateTime.start - b.dateTime.start;
});

if (EVENT_COUNT) {
  render(tripEvents, new SorterView().getElement(), RenderPosition.BEFOREEND);
  render(tripMain, new TripInfoView(events).getElement(), RenderPosition.AFTERBEGIN);
  const tripInfo = document.querySelector(`.trip-info`);
  render(tripInfo, new CostInfoView(events).getElement(), RenderPosition.BEFOREEND);
}
render(tripControlsTitle, new MenuView().getElement(), RenderPosition.BEFOREBEGIN);
render(tripControlsTitle, new FilterFormView().getElement(), RenderPosition.AFTEREND);
render(tripEvents, new TripListView(events, 200).getElement(), RenderPosition.BEFOREEND);
const tripEventsList = document.querySelector(`.trip-events__list`);


for (let i = 0; i < Math.min(events.length, EVENT_COUNT); i++) {
  render(tripEventsList, new TripPointView(events[i]).getElement(), RenderPosition.BEFOREEND);
}
render(tripEventsList, new PointEditFormView(events[0]).getElement(), RenderPosition.AFTERBEGIN);
