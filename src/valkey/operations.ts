import { CachedUser, MovieDetails } from "../../types.js";
import session from "../utils/session.js";
import { cachedUserSchema } from "../zod/schemas.js";
import glideClient from "./client.js";
import { Transaction } from "@valkey/valkey-glide";


//TODO: provide reverse mapping userID -> sessionID in valkey as well
export const setSessionID = async (
  userid: number,
  username: string,
): Promise<string | null> => {
  const transaction = new Transaction();

  const sessionID = session.getNewSessionUUID();

  const user = { username: username, id: userid };

  const userString = JSON.stringify(user);

  transaction.set(sessionID, userString).expire(sessionID, 60 * 15);
  const transactionResult = await glideClient.exec(transaction);

  if (!transactionResult || transactionResult.some((result) => !result)) {
    return null;
  }

  return sessionID;
};

const getUser = async (sessionID: string): Promise<CachedUser | null> => {
  const user = await glideClient.get(sessionID);
  if (!user) {
    return null;
  }
  return cachedUserSchema.parse(JSON.parse(user.toString()));
};

const removeSession = async (
  sessionID: string,
): Promise<CachedUser | null> => {
  const removedSession = await glideClient.getdel(sessionID);
  if (!removedSession) {
    return null;
  }
  return cachedUserSchema.parse(JSON.parse(removedSession.toString()));
};

export const setMovie = async (internalID: number, details: MovieDetails) => {
  await glideClient.set(internalID.toString(), JSON.stringify(details));
};

export const getMovie = async (internalID: number) => {
  const movieDetails = await glideClient.get(internalID.toString());
  return movieDetails;
};

export const addMovie = () => {};

export default {
  setSessionID,
  removeSession,
  setMovie,
  getUser,
  getMovie,
};
