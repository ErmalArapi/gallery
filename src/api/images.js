import { baseApi } from "./base";

export function getImages(options) {
  return baseApi.get("", options);
}
