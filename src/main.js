import PointsPresenter from "./presenter/point.js";
import TripPresenter from "./presenter/trip.js";
import {generateEvent} from "./mocks/event.js";

const EVENT_COUNT = 20;

const tripMain = document.querySelector(`.trip-main`);
const tripControlsTitle = document.querySelector(`.trip-controls :last-child`);
const tripPointsContainer = document.querySelector(`.trip-events`);

const eventsPoints = new Array(EVENT_COUNT).fill().map(generateEvent);
const events = eventsPoints.slice().sort((a, b) => {
  return +a.dateTime.start - b.dateTime.start;
});

const tripPresenter = new TripPresenter(tripMain, tripControlsTitle);
tripPresenter.init(events);
const pointsPresenter = new PointsPresenter(tripPointsContainer);
pointsPresenter.init(events);
