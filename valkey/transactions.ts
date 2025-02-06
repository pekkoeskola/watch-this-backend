import session from "../utils/session.js";
import glideClient from "./client.js";
import { Transaction } from "@valkey/valkey-glide";

export const setSessionID = async (userid: number): Promise<string> => {
  const transaction = new Transaction();

  const sessionid = session.getSessionUUID();

  transaction.set(userid.toString(), sessionid).expire(userid.toString(), 60*15);
  await glideClient.exec(transaction);

  return sessionid;
};

export const removeSession = async (userid: number) => {
  const transaction = new Transaction();

  await glideClient.exec(transaction.getdel(userid.toString()));
};
