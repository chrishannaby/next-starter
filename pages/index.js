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
            return (
              <li key={page}>
                <Link href={`/static-only/${page}`}>
                  <a>{`/static-only/${page}`}</a>
                </Link>
              </li>
            );
          })}
        </ul>
        <p>
          For these pages we have set <code>fallback: false</code> so if we try
          to vist a any slug that was not returned from{" "}
          <code>getStaticPaths</code> we will see 404 error.
        </p>
        <p>
          {" "}
          Try visiting{" "}
          <Link href={`/static-only/${nonExistingStaticSlug}`}>
            <a>{`/static-only/${nonExistingStaticSlug}`}</a>
          </Link>
          .
        </p>
        <h2>Incremental Static Pages</h2>
        <p>
          The following slugs were returned by <code>getStaticPaths</code> and
          so they will be statically generated as part of our build.
        </p>
        <ul>
          {odbPageSlugs.critical.map((page) => {
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
          valid slug that was not returned from <code>getStaticPaths</code> it
          will be build on-demand and then cached for future visitors. You can
          test this at the links below:
        </p>
        <ul>
          {odbPageSlugs.deferred.map((page) => {
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
        <h2>Server Side Rendered</h2>
        <p>
          The following page will be server side rendered and fetch new data on
          every request.
        </p>
        <ul>
          <li>
            <Link href="/ssr">
              <a>/ssr</a>
            </Link>
          </li>
        </ul>
        <h2>ISR</h2>
        <p>
          Netlify does not support <code>stale-while-revalidate</code> which is
          a caching mechanism that is used to power ISR. You can read some of
          the reasons why this is not supported{" "}
          <a href="https://www.netlify.com/blog/2021/03/08/incremental-static-regeneration-its-benefits-and-its-flaws/">
            here
          </a>
          . As a fallback any page that uses <code>revalidate</code> will be
          server side rendered and fetch new data on every request. See an
          example here:
        </p>
        <ul>
          <li>
            <Link href="/isr">
              <a>/isr</a>
            </Link>
          </li>
        </ul>
        <p>
          This is only meant as a fallback. We recommend that you try to use one
          of the following approaches instead:
        </p>
        <ul>
          <li>
            <strong>For moderate numbers of pages (100s):</strong> statically
            generate all pages and trigger a rebuild when data/content changes.
          </li>
          <li>
            <strong>For very large numbers of pages (1000s):</strong> statically
            generate the most popular pages and build the rest on demand.
          </li>
          <li>
            <strong>For pages with a mix of static and dynamic content:</strong>{" "}
            statically generate the page including all of the relatively static
            content and fetch more dynamic content (prices, availability etc.
            client side).
          </li>
        </ul>
      </section>
    </>
  );
}
