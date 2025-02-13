import session from "../utils/session.js";
import glideClient from "./client.js";
import { Transaction } from "@valkey/valkey-glide";

export const setSessionID = async (userid: number): Promise<string> => {
  const transaction = new Transaction();

  const sessionid = session.getNewSessionUUID();

  transaction
    .set(sessionid, userid.toString())
    .expire(userid.toString(), 60 * 15);
  await glideClient.exec(transaction);

  return sessionid;
};

export const removeSession = async (sessionID: string) => {
  await glideClient.getdel(sessionID);
};
