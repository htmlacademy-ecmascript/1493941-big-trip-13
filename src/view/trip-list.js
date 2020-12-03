export const createTripListElement = (isEmpty, status) => {
  if (status === 200) {
    if (isEmpty > 0) {
      return `<ul class="trip-events__list"></ul>`;
    } else {
      return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
    }
  } else {
    return `<p class="trip-events__msg">Loading...</p>`;
  }
};
