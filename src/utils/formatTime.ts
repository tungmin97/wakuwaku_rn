import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { reversedWeekDayDict, weekDayDict } from './weekDayDictionary';

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

export const toUnix = (input: string) => dayjs(input, 'HH:mm').unix();

export const formatTime = (day: string, time: string) => {
  console.log(day, time);
  const convertedDay = dayjs().day(weekDayDict[day]).format('DD/MM/YYYY');

  const airedTime = dayjs(`${convertedDay} ${time}`, 'DD/MM/YYYY HH:mm').add(2, 'hour');

  console.log(airedTime.fromNow());
};

export const getDate = () => {
  const date = dayjs();
  const today = reversedWeekDayDict[date.day()];
  const tomorrow = reversedWeekDayDict[date.add(1, 'day').day()];

  return { today, tomorrow };
};
