import prisma from "../prisma/client.js";
import valkey from "../valkey/operations.js";

const isAuthenticated = async (sessionID: string): Promise<boolean> => {
  const user = await valkey.getUser(sessionID);
  if (user === null) {
    return false;
  }
  return true;
};

const authenticateUser = async (sessionID: string) => {
  return await valkey.getUser(sessionID);
};

//TODO: consider storing information about user groups in valkey for potentially accelerated lookups compared to this non-optimized query
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

const logOut = async (sessionID: string) => {
  if (!(await valkey.removeSession(sessionID))) {
    return false;
  }
  return true;
};

export default { isAuthenticated, authenticateUser, belongsToGroup, logOut };
