export class TMDBAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TMDBAPIError";
  }
}
