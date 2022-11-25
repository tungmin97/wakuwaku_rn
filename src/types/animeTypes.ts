export interface AnimeFullById {
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
}

export interface TopAnime {
  data: AnimeById[];
  pagination: AnimePagination;
}

export interface AnimeById {
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
}

export interface AnimeImages {
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
}

export interface AnimeTrailer {
  youtube_id: string;
  url: string;
  embed_url: string;
}

export interface AnimeTitle {
  type: string;
  title: string;
}

export interface AnimeAired {
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
}

export interface AnimeBroadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

export interface AnimeSubProps {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface AnimeRelation {
  relation: string;
  entry: AnimeSubProps[];
}

export interface AnimeTheme {
  openings: string[];
  endings: string[];
}

export interface AnimeLink {
  name: string;
  url: string;
}

export interface AnimePagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: AnimePaginationItem;
}

export interface AnimePaginationItem {
  count: number;
  total: number;
  per_page: number;
}
