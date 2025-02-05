import session from "../utils/session.js";
import glideClient from "./client.js";
import { Transaction } from "@valkey/valkey-glide";

export const setSessionID = async (userid: string): Promise<string> => {
  const transaction = new Transaction();

  const sessionid = session.getSessionUUID();

  transaction.set(userid, sessionid).expire(userid, 60*15);
  await glideClient.exec(transaction);

  return sessionid;
};

export const removeSession = async (userid: string) => {
  const transaction = new Transaction();

  await glideClient.exec(transaction.getdel(userid));
};
