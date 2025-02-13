import { test, expect, describe, beforeAll } from "vitest";
import { removeSession, setSessionID } from "./operations.js";
import glideClient from "./client.js";

describe("after adding sessionid to valkey", () => {
  let ID = "";
  beforeAll(async () => {
    ID = await setSessionID(54);
  });

  test("it should be available", async () => {
    const gotUser = await glideClient.get(ID);

    expect(gotUser).toBe("54");
  });

  test("after removal it should not be available", async () => {
    await removeSession(ID);

    const gotUser = await glideClient.get(ID);

    expect(gotUser).toBeNull();
  });
});
