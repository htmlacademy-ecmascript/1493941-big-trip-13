export const createTripInfoElement = (info) => {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${info.tripDestination}</h1>

              <p class="trip-info__dates">${info.tripDuration}</p>
            </div>
          </section>`;
};
