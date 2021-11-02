import preval from "next-plugin-preval";
import { generateSlug } from "random-word-slugs";

const numCriticalPages = process.env.NUMBER_OF_CRITICAL_PAGES || 10;
const numDeferredPages = process.env.NUMBER_OF_DEFERRED_PAGES || 10;

async function generateOdbPageSlugs() {
  console.log(
    `Generating ${numCriticalPages} critical page slugs and ${numDeferredPages} deferred page slugs...`
  );
  const critical = Array(numCriticalPages)
    .fill()
    .map((_) => generateSlug());
  const deferred = Array(numDeferredPages)
    .fill()
    .map((_) => generateSlug());
  return {
    critical,
    deferred,
    all: critical.concat(deferred),
  };
}

export default preval(generateOdbPageSlugs());
