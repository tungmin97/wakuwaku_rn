import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { weekDayDict } from '@utils/weekDayDictionary';
dayjs.extend(customParseFormat);

type Props = {
  day: string;
  time: string;
};

export const formatTimer = ({ day, time }: Props) => {
  const convertedDay = dayjs().day(weekDayDict[day]).format('DD/MM/YYYY');
  const airedTime = dayjs(`${convertedDay} ${time}`, 'DD/MM/YYYY HH:mm').subtract(2, 'hour');
  const airedTimeDiff = airedTime.diff();
  const formattedTime = airedTime.valueOf();

  return airedTimeDiff > 0 ? formattedTime : 0;
};
