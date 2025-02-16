export class TMDBAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TMDBAPIError";
  }
}

export class ValkeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValkeyError";
  }
}
