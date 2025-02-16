export interface NewUser {
  username: string;
  password: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
}

export interface Group {
  id: number
  name: string,
}

export type MovieDetails = Omit<Movie, "id">;
