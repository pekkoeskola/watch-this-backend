import { MovieDetails } from "../../types.js";
import session from "../utils/session.js";
import glideClient from "./client.js";
import { Transaction } from "@valkey/valkey-glide";

export const setSessionID = async (userid: number): Promise<string> => {
  const transaction = new Transaction();

  const sessionid = session.getNewSessionUUID();

  transaction.set(sessionid, userid.toString()).expire(sessionid, 60 * 15);
  await glideClient.exec(transaction);

  return sessionid;
};

const getUser = async (sessionID: string) => {
  return await glideClient.get(sessionID);
};

export const removeSession = async (sessionID: string) => {
  await glideClient.getdel(sessionID);
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
  setMovie,
  getUser,
  getMovie,
};
