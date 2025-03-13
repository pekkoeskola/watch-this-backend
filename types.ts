export interface NewUser {
  username: string;
  password: string;
}

export interface CachedUser {
  id: number;
  username: string;
}

export interface Movie {
  id: number;
  title: string;
  overview?: string;
  posterURL?: string;
}

export interface MovieWithTmdbId {
  id: number;
  title: string;
  overview?: string;
}

export interface Group {
  id: number;
  name: string;
}

export interface Rating {
  movieID: number;
  userID: number;
  rating: number;
}


export type MovieDetails = Omit<Movie, "id">;
