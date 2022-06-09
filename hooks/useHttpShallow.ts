import { useCookie } from "next-cookie";
import { http } from "../utils/http";
import { useRouter } from "next/router";

export default function apiShallowAuth() {
  // define hooks

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cookie = useCookie();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  // check if hooks loaded
  if (!cookie || !router) return false;

  // return instance
  return http(cookie as any, router as any);
}
