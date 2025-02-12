//Using this file currently to extend library types when insufficient through ts module augmentation

import Cookies from "cookies";

//tell ts that "cookies" attribute is available on "Response" object (see cookies library for more info)
declare module "express-serve-static-core" {
  interface Response {
    cookies: Cookies;
  }
}