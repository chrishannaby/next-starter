import Head from "next/head";
import Link from "next/link";
import staticPageSlugs from "../lib/staticPages.preval";
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
            return (
              <li key={page}>
                <Link href={`/static-only/${page}`}>
                  <a>{page}</a>
                </Link>
              </li>
            );
          })}
        </ul>
        <p>
          For these pages we have set <code>fallback: false</code> so if we try
          to vist a random slug that was not returned from{" "}
          <code>getStaticPaths</code> we will see 404 error.
        </p>
        <p>
          {" "}
          Try visiting{" "}
          <Link href={`/static-only/${nonExistingStaticSlug}`}>
            <a>{nonExistingStaticSlug}</a>
          </Link>
          .
        </p>
        <h2>Incremental Static Pages</h2>
        <p>
          The following slugs were returned by <code>getStaticPaths</code> and
          so they will be statically generated as part of our build.
        </p>
        <ul>
          {staticPageSlugs.map((page) => {
            const path = `/odb/${page}`;
            return (
              <li key={page}>
                <Link href={path}>
                  <a>{path}</a>
                </Link>
              </li>
            );
          })}
        </ul>
        <p>
          For this directory we have set{" "}
          <code>fallback: &quot;blocking&quot;</code> so if we try to vist a
          random slug that was not returned from <code>getStaticPaths</code> it
          will be build on-demand.
        </p>
        <p>
          Try visiting{" "}
          <Link href={`/odb/${nonExistingStaticSlug}`}>
            <a>{`/odb/${nonExistingStaticSlug}`}</a>
          </Link>{" "}
          or any other random slug .
        </p>
      </section>
    </>
  );
}
