import { randomUUID } from "node:crypto";

const getSessionUUID = (): string => {
  return randomUUID();
};

export default {
  getSessionUUID
};