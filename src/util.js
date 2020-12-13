import dayjs from "dayjs";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const addLeadingZero = (val)=> {
  return val.toString().padStart(2, `0`);
};

const getDatesDuration = (startDate, endDate) => {
  const ONE_DAY_HOURS = 24;
  const ONE_HOURS_MINUTES = 60;

  startDate = dayjs(startDate);
  endDate = dayjs(endDate);
  const durationHour = endDate.diff(startDate, `hour`);
  const durationMinutes = endDate.diff(startDate, `m`);
  const durationDay = endDate.diff(startDate, `day`);

  if (durationMinutes >= ONE_HOURS_MINUTES && durationHour < ONE_DAY_HOURS) {
    return `${addLeadingZero(durationHour)}H ${addLeadingZero(durationMinutes % ONE_HOURS_MINUTES)}M`;
  }
  if (durationHour > ONE_DAY_HOURS) {
    return `${addLeadingZero(durationDay)}D ${addLeadingZero(durationHour % ONE_DAY_HOURS)}H ${addLeadingZero(durationMinutes % ONE_HOURS_MINUTES)}M`;
  }

  return `${addLeadingZero(durationMinutes % ONE_HOURS_MINUTES)}M`;
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFOREBEGIN: `beforebegin`,
  AFTEREND: `afterend`
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export {
  getRandomInteger,
  getDatesDuration,
  RenderPosition,
  render,
  createElement
};
