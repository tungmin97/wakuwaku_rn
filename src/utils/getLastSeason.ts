import { AnimeSeason, SeasonQuery } from '@src/types/animeTypes';

export const getLastSeason = (): SeasonQuery => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const lastYear = year - 1;
  let lastSeason: AnimeSeason;

  if (month >= 0 && month <= 2) {
    lastSeason = AnimeSeason.Spring;
  } else if (month >= 3 && month <= 5) {
    lastSeason = AnimeSeason.Winter;
  } else if (month >= 6 && month <= 8) {
    lastSeason = AnimeSeason.Winter;
  } else {
    lastSeason = AnimeSeason.Summer;
  }
  return {
    lastSeason,
    lastYear,
  };
};
