//Using this file currently to extend library types when insufficient through ts module augmentation

import Cookies from "cookies";
import { CachedUser } from "./types.ts";

//tell ts that "cookies" attribute is available on "Response" object (see cookies library for more info)
declare module "express-serve-static-core" {
  interface Request {
    cookies: Cookies;
    user: CachedUser?;
  }
  interface Response {
    cookies: Cookies;
  }
}

declare module "express" {
  interface Request {
    cookies: Cookies;
    user: CachedUser?;
  }
  interface Response {
    cookies: Cookies;
  }
}
