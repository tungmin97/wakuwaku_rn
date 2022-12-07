export type AnimeFullById = {
  mal_id: number;
  url: string;
  images: AnimeImages;
  trailer: AnimeTrailer;
  approved: boolean;
  titles: AnimeTitle[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: AnimeAired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: AnimeBroadcast;
  producers: AnimeSubProps[];
  licensors: AnimeSubProps[];
  studios: AnimeSubProps[];
  genres: AnimeSubProps[];
  explicit_genres: AnimeSubProps[];
  themes: AnimeSubProps[];
  demographics: AnimeSubProps[];
  relations: AnimeRelation[];
  theme: AnimeTheme;
  external: AnimeLink[];
  streaming: AnimeLink[];
};

export type TopAnime = {
  data: AnimeById[];
  pagination: AnimePagination;
};

export type AnimeById = {
  mal_id: number;
  url: string;
  images: AnimeImages;
  trailer: AnimeTrailer;
  approved: boolean;
  titles: AnimeTitle[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: AnimeAired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: AnimeBroadcast;
  producers: AnimeSubProps[];
  licensors: AnimeSubProps[];
  studios: AnimeSubProps[];
  genres: AnimeSubProps[];
  explicit_genres: AnimeSubProps[];
  themes: AnimeSubProps[];
  demographics: AnimeSubProps[];
};

export type AnimeImages = {
  jpg: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
  webp: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
};

export type AnimeTrailer = {
  youtube_id: string;
  url: string;
  embed_url: string;
};

export type AnimeTitle = {
  type: string;
  title: string;
};

export type AnimeAired = {
  from: string;
  to: string;
  prop: {
    from: {
      day: string;
      month: string;
      year: string;
    };
    to: {
      day: string;
      month: string;
      year: string;
    };
    string: string;
  };
};

export type AnimeBroadcast = {
  day: string;
  time: string;
  timezone: string;
  string: string;
};

export type AnimeSubProps = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

export type AnimeRelation = {
  relation: string;
  entry: AnimeSubProps[];
};

export type AnimeTheme = {
  openings: string[];
  endings: string[];
};

export type AnimeLink = {
  name: string;
  url: string;
};

export type AnimePagination = {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: AnimePaginationItem;
};

export type AnimePaginationItem = {
  count: number;
  total: number;
  per_page: number;
};

export enum AnimeSeason {
  Winter = 'winter',
  Spring = 'spring',
  Summer = 'summer',
  Fall = 'fall',
}

export type SeasonQuery = {
  lastSeason: AnimeSeason;
  year: number;
};

export type JustMissedAnimeProps = {
  year: number;
  season: string;
  page: number;
};

export type AnimeByGenres = {
  page: number;
  genre: number;
};

// ESPISODE

export type Pagination = {
  last_visible_page: number;
  has_next_page: boolean;
};

export type EspisodeImage = {
  jpg: {
    image_url: string;
  };
};

export type AnimeEspisode = {
  mal_id: number;
  title: string;
  episode: string;
  url: string;
  images: EspisodeImage;
};

export type AnimeVideosEpisodes = {
  pagination: Pagination;
  data: AnimeEspisode[];
};

// REVIEW
export type UserImages = {
  jpg: {
    image_url: string;
  };
  webp: {
    image_url: string;
  };
};

export type UserDetail = {
  username: string;
  url: string;
  images: UserImages;
};

export type AnimeReaction = {
  overall: number;
  nice: number;
  love_it: number;
  funny: number;
  confusing: number;
  informative: number;
  well_written: number;
  creative: number;
};

export type AnimeReviewData = {
  user: UserDetail;
  mal_id: number;
  url: string;
  type: string;
  reactions: AnimeReaction;
  date: string;
  review: string;
  score: number;
  tag: string[];
  is_spoiler: null;
  is_preliminary: null;
  episodes_watched: number;
};

export type AnimeReviews = {
  pagination: Pagination;
  data: AnimeReviewData[];
};

export type WatchListProps = {
  animeList: AnimeById[];
};
