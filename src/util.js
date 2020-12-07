import dayjs from "dayjs";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getDateFormat = (date) => {
  const formatDate = dayjs(date).format(`DD/MM/YY HH:mm`);
  const day = dayjs(date).format(`MMM DD`);
  const time = dayjs(date).format(`HH:mm`);
  const dayOfMonth = dayjs(date).format(`DD`);

  return {
    formatDate,
    day,
    time,
    dayOfMonth
  };
};

const getDatesDuration = (startDate, endDate) => {
  startDate = dayjs(startDate);
  endDate = dayjs(endDate);
  const durationHour = endDate.diff(startDate, `hour`);
  const durationMinutes = endDate.diff(startDate, `m`);
  const durationDay = endDate.diff(startDate, `day`);
  const addNull = (val)=> {
    let stringVal = `${val}`;
    if (val < 10) {
      stringVal = `0${val}`;
    }

    return stringVal;
  };

  let durationString = `${addNull(durationMinutes % 60)}M`;
  if (durationMinutes > 59 && durationHour < 24) {
    durationString = `${addNull(durationHour)}H ${addNull(durationMinutes % 60)}M`;
  } else if (durationHour > 24) {
    durationString = `${addNull(durationDay)}D ${addNull(durationHour % 24)}H ${addNull(durationMinutes % 60)}M`;
  }

  return durationString;
};

export {
  getRandomInteger,
  getDateFormat,
  getDatesDuration
};
