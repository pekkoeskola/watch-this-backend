import argon from "@node-rs/argon2";

import prisma from "../prisma/client.js";

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
    }
  });

  return newUser;
};

export default {
  addUser,
};
