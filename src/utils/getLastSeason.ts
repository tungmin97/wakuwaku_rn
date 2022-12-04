import { AnimeSeason, SeasonQuery } from '@src/types/animeTypes';

export const getLastSeason = (): SeasonQuery => {
  const date = new Date();
  const month = date.getMonth();
  let year = date.getFullYear();
  let lastSeason: AnimeSeason;

  if (month >= 1 && month <= 3) {
    lastSeason = AnimeSeason.Fall;
    year = year - 1;
  } else if (month >= 4 && month <= 6) {
    lastSeason = AnimeSeason.Winter;
  } else if (month >= 7 && month <= 9) {
    lastSeason = AnimeSeason.Spring;
  } else {
    lastSeason = AnimeSeason.Summer;
  }
  return {
    lastSeason,
    year,
  };
};
