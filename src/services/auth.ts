import prisma from "../prisma/client.js";
import valkey from "../valkey/operations.js";

const isAuthenticated = async (sessionID: string): Promise<boolean> => {
  const user = await valkey.getUser(sessionID);
  if (user === null) {
    return false;
  }
  return true;
};

const belongsToGroup = async (
  groupID: number,
  userID: number,
): Promise<boolean> => {
  const group = await prisma.watchGroup.findUniqueOrThrow({
    where: {
      id: groupID,
    },
    include: {
      users: true,
    },
  });
  if (group.users.find((u) => u.id === userID)) {
    return true;
  }
  return false;
};

export default { isAuthenticated, belongsToGroup };
