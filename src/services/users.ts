import argon from "@node-rs/argon2";

import prisma from "../prisma/client.js";
import { Group } from "../../types.js";

const addUser = async (username: string, password: string) => {
  //TODO: configure argon for prod, currently using defaults

  const hash = await argon.hash(password);

  const newUser = await prisma.user.create({
    data: {
      username: username,
      password_hash: hash,
    },
    select: {
      username: true,
    },
  });

  return newUser;
};

const getUserGroups = async (authenticatedUserID: number): Promise<Group[]> => {
  const groups = await prisma.user.findFirstOrThrow({
    where: {
      id: authenticatedUserID,
    },
    select: {
      id: true,
      username: true,
      watch_groups: true,
    },
  });
  return groups.watch_groups;
};

export default {
  addUser,
  getUserGroups
};
