import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import { reversedWeekDayDict, weekDayDict } from './weekDayDictionary';

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(duration);

export const toUnix = (input: string) => dayjs(input, 'HH:mm').unix();

export const formatTime = (day: string, time: string) => {
  const convertedDay = dayjs().day(weekDayDict[day]).format('DD/MM/YYYY');

  const airedTimeDiff = dayjs(`${convertedDay} ${time}`, 'DD/MM/YYYY HH:mm').add(2, 'hour').diff();

  return airedTimeDiff > 0
    ? 'Airing in ' +
        dayjs
          .duration(airedTimeDiff)
          .format('D [days]/H [hours]/m [mins]')
          .replace(/\b0+\s\b[a-z/]+\s*/gi, '')
          .split('/')
          .slice(0, 2)
          .join(', ')
    : 'Aired ' +
        dayjs
          .duration(-airedTimeDiff)
          .format('D [days]/H [hours]/m [mins]')
          .replace(/\b0+\s\b[a-z/]+\s*/gi, '')
          .split('/')
          .slice(0, 2)
          .join(', ') +
        ' ago';
};

export const getDate = () => {
  const date = dayjs();
  const today = reversedWeekDayDict[date.day()];
  const tomorrow = reversedWeekDayDict[date.add(1, 'day').day()];

  return { today, tomorrow };
};
