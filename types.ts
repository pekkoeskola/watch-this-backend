export interface NewUser {
  username: string;
  password: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
}

export type MovieDetails = Omit<Movie, "id">;
