import Head from "next/head";
import Link from "next/link";
import staticPageSlugs from "../lib/staticPages.preval";
import odbPageSlugs from "../lib/odbPages.preval";
import { generateSlug } from "random-word-slugs";

export async function getStaticProps() {
  const nonExistingStaticSlug = generateSlug();
  return {
    props: {
      staticPageSlugs,
      nonExistingStaticSlug,
    },
  };
}

export default function Home({ staticPages, nonExistingStaticSlug }) {
  return (
    <>
      <Head>
        <title>Next.js on Netlify</title>
      </Head>
      <section className="prose">
        <h2>Static Pages</h2>
        <p>
          The following slugs were returned by <code>getStaticPaths</code> and
          so they will be statically generated as part of our build.
        </p>
        <ul>
          {staticPageSlugs.map((page) => {
            const path = `/post/${page}`;
            return (
              <li key={page}>
                <Link href={path}>{path}</Link>
              </li>
            );
          })}
        </ul>
        <h2>Incremental Static Pages</h2>
        <p>
          The following slugs were returned by <code>getStaticPaths</code> and
          so they will be statically generated as part of our build.
        </p>
        <ul>
          {odbPageSlugs.critical.map((page) => {
            const path = `/post/${page}`;
            return (
              <li key={page}>
                <Link href={path}>{path}</Link>
              </li>
            );
          })}
        </ul>
        <p>
          For this directory we have set{" "}
          <code>fallback: &quot;blocking&quot;</code> so if we try to vist a
          valid slug that was not returned from <code>getStaticPaths</code> it
          will be build on-demand and then cached for future visitors. You can
          test this at the links below:
        </p>
        <ul>
          {odbPageSlugs.deferred.map((page) => {
            const path = `/post/${page}`;
            return (
              <li key={page}>
                <Link href={path}>{path}</Link>
              </li>
            );
          })}
        </ul>
        <h2>Server Side Rendered</h2>
        <p>
          The following page will be server side rendered and fetch new data on
          every request.
        </p>
        <ul>
          <li>
            <Link href="/ssr">/ssr</Link>
          </li>
        </ul>
      </section>
    </>
  );
}
