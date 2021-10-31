import preval from "next-plugin-preval";
import { formatDate } from "./formatDate";

async function getBuildTime() {
  return formatDate(new Date());
}

export default preval(getBuildTime());
