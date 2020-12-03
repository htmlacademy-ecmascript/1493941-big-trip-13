import {
  getRandomInteger
} from "../util.js";
import dayjs from "dayjs";

const TripPoint = {
  TYPES: [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`,
    `Check-in`,
    `Sightseeing`,
    `Restaurant`
  ],
  DESTINATIONS: [
    `Chamonix`,
    `Geneva`,
    `Amsterdam`,
    `Nice`,
    `Monaco`,
    `Menton`
  ],
  OPTIONS: [
    {
      id: `luggage`,
      type: `Flight`,
      name: `Add luggage`,
      price: 30,
      isChecked: false
    },
    {
      id: `comfort`,
      type: `Flight`,
      name: `Switch to comfort class`,
      price: 100,
      isChecked: false
    },
    {
      id: `meal`,
      type: `Flight`,
      name: `Add meal`,
      price: 15,
      isChecked: false
    },
    {
      id: `seats`,
      type: `Flight`,
      name: `Choose seats`,
      price: 5,
      isChecked: false
    },
    {
      id: `train`,
      type: `Flight`,
      name: `Travel by train`,
      price: 40,
      isChecked: false
    },
    {
      id: `Uber`,
      type: `Taxi`,
      name: `Order Uber`,
      price: 20,
      isChecked: false
    },
    {
      id: `tickets`,
      type: `Sightseeing`,
      name: `Book tickets`,
      price: 40,
      isChecked: false
    },
    {
      id: `Lunch`,
      type: `Sightseeing`,
      name: `Lunch in city`,
      price: 30,
      isChecked: false
    },
    {
      id: `breakfast`,
      type: `Check-in`,
      name: `Add breakfast`,
      price: 50,
      isChecked: false
    },
    {
      id: `car`,
      type: `Drive`,
      name: `Rent a car`,
      price: 200,
      isChecked: false
    }
  ],
  DESCRIPTION: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  PHOTO_PATH: `http://picsum.photos/248/152?r=`,
};

const generateDate = () => {
  const hourGap = getRandomInteger(0, 48);
  const minutesGap = getRandomInteger(0, 60);
  const startDate = dayjs().add(getRandomInteger(0, minutesGap), `minute`).add(getRandomInteger(-hourGap, 0), `hour`).valueOf();
  const endDate = dayjs().add(getRandomInteger(0, minutesGap), `minute`).add(getRandomInteger(0, hourGap), `hour`).valueOf();

  return {
    startDate,
    endDate
  };
};

const generateOffers = (type) => {
  let offersArray = TripPoint.OPTIONS.slice().filter((offer) => offer.type === type);
  offersArray.forEach((offer) => {
    offer.isChecked = Boolean(getRandomInteger(0, 1));
  });
  return offersArray;
};

const generateDescription = () => {
  const splitDescription = TripPoint.DESCRIPTION.split(`. `);

  return splitDescription.slice(0, getRandomInteger(0, splitDescription.length - 1)).join(`. `);
};

const generatePhotoArray = () => {

  return Array(getRandomInteger(0, 5)).fill().map(() => `${TripPoint.PHOTO_PATH}${getRandomInteger(1, 5)}`);
};

export const generateEvent = () => {
  const offerType = TripPoint.TYPES[getRandomInteger(0, TripPoint.TYPES.length - 1)];
  return {
    type: offerType,
    destination: TripPoint.DESTINATIONS[getRandomInteger(0, TripPoint.DESTINATIONS.length - 1)],
    offers: generateOffers(offerType),
    description: generateDescription(),
    photo: generatePhotoArray(),
    dateTime: {
      start: generateDate().startDate,
      end: generateDate().endDate
    },
    price: getRandomInteger(0, 500),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
