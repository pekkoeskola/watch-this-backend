import { test, expect, describe, beforeAll } from "vitest";
import { removeSession, setSessionID } from "./operations.js";
import glideClient from "./client.js";

describe("after adding sessionid to valkey", () => {
  let ID: string = "";
  beforeAll(async () => {
    ID = (await setSessionID(54, "user"))!;
  });

  test("it should be available", async () => {
    const gotUser = await glideClient.get(ID);
    const user = {
      id: 54,
      username: "user",
    };

    expect(JSON.parse(gotUser!.toString())).toEqual(user);
  });

  test("after removal it should not be available", async () => {
    await removeSession(ID);

    const gotUser = await glideClient.get(ID);

    expect(gotUser).toBeNull();
  });
});
