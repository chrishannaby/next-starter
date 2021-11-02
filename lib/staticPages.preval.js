import preval from "next-plugin-preval";
import { generateSlug } from "random-word-slugs";

const numStaticPages = parseInt(process.env.NUMBER_OF_STATIC_PAGES) || 10;

async function generateStaticPageSlugs() {
  console.log(`Generating ${numStaticPages} static page slugs...`);
  const slugs = Array(numStaticPages)
    .fill()
    .map((_) => generateSlug());
  console.log(slugs);
  return slugs;
}

export default preval(generateStaticPageSlugs());
