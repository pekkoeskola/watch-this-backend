import { randomUUID } from "node:crypto";

const getNewSessionUUID = (): string => {
  return randomUUID();
};

export default {
  getNewSessionUUID
};