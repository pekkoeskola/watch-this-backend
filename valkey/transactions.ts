import session from "../utils/session";
import glideClient from "./client";
import { Transaction } from "@valkey/valkey-glide";

export const setSessionID = async (userid: string): Promise<string> => {
  const transaction = new Transaction();

  const sessionid = session.getSessionUUID();

  transaction.set(userid, sessionid);

  await glideClient.exec(transaction);

  return sessionid;
};
