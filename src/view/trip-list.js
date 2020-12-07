export const createTripListElement = (isEmpty, status) => {
  if (status === 200) {
    return (isEmpty > 0) ? `<ul class="trip-events__list"></ul>` : `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  } else {
    return `<p class="trip-events__msg">Loading...</p>`;
  }
};
