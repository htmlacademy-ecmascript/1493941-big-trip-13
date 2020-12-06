/* import {
  getRandomInteger
} from "./util.js";*/
import {createTripInfoElement} from "./view/trip-info.js";
import {createCostInfoElement} from "./view/cost.js";
import {createMenuElement} from "./view/menu.js";
import {createFilterFormElement} from "./view/filter.js";
import {createSorterFormElement} from "./view/sorter.js";
import {createTripListElement} from "./view/trip-list.js";
import {createTripPointElement} from "./view/trip-point.js";
/* import {
  createNewPointElement
} from "./view/new-form.js";*/
import {generateEvent} from "./mocks/event.js";
import {createEditPointElement} from "./view/edit-form.js";
import {getDateFormat} from "./util";

const EVENT_COUNT = 20;
const render = (container, layout, place) => {
  container.insertAdjacentHTML(place, layout);
};

const tripMain = document.querySelector(`.trip-main`);
const tripControlsTitle = document.querySelector(`.trip-controls :last-child`);
const tripEvents = document.querySelector(`.trip-events`);


const eventsPoints = new Array(EVENT_COUNT).fill().map(generateEvent);
const events = eventsPoints.slice().sort((a, b) => {
  return +a.dateTime.start - b.dateTime.start;
});

const getTripCost = (array) => {
  let cost = 0;
  for (const item of array) {
    let offerPrice = 0;
    for (const offer of item.offers) {
      if (offer.isChecked) {
        offerPrice = offerPrice + offer.price;
      }
    }
    cost = cost + item.price + offerPrice;
  }
  return cost;
};

const getTripInfo = (array) => {
  const tripDuration = `${getDateFormat(array[0].dateTime.start).day}&nbsp;—&nbsp;${getDateFormat(array[array.length - 1].dateTime.end).dayOfMonth}`;
  const tripDestination = `${array[0].destination} &mdash; ... &mdash; ${array[array.length - 1].destination}`;
  return {
    tripDuration,
    tripDestination
  };
};

if (EVENT_COUNT) {
  render(tripEvents, createSorterFormElement(), `beforeend`);
  render(tripMain, createTripInfoElement(getTripInfo(events)), `afterbegin`);

  const tripInfo = document.querySelector(`.trip-info`);
  render(tripInfo, createCostInfoElement(getTripCost(events)), `beforeend`);
}
render(tripControlsTitle, createMenuElement(), `beforebegin`);
render(tripControlsTitle, createFilterFormElement(), `afterend`);

render(tripEvents, createTripListElement(EVENT_COUNT, 200), `beforeend`);
const tripEventsList = document.querySelector(`.trip-events__list`);

/* render(tripEventsList, createNewPointElement(), `afterbegin`);*/
for (let i = 0; i < EVENT_COUNT; i++) {
  render(tripEventsList, createTripPointElement(events[i]), `beforeend`);
}
render(tripEventsList, createEditPointElement(events[0]), `afterbegin`);
