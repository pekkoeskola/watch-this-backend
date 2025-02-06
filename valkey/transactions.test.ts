import { test, expect, describe, beforeAll } from "vitest";
import { removeSession, setSessionID } from "./transactions.js";
import { Transaction } from "@valkey/valkey-glide";
import glideClient from "./client.js";

describe("after adding sessionid to valkey", () => {
  let ID = "";
  beforeAll(async () => {
    ID = await setSessionID(1);
  });

  test("it should be available", async () => {
    const transaction = new Transaction();
    transaction.get("user");
    const gotID = await glideClient.exec(transaction);

    expect(gotID![0]).toBe(ID);
  });

  test("after removal it should not be available", async () => {
    await removeSession(1);

    const transaction = new Transaction();
    transaction.get("user");
    const gotID = await glideClient.exec(transaction);

    expect(gotID![0]).toBeNull();
  });
});
