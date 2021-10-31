import Head from "next/head";
import Image from "next/image";
import staticPageSlugs from "../../lib/staticPages.preval";
import siteBuiltAt from "../../lib/buildTime.preval";
import { formatDate } from "../../lib/formatDate";

export async function getStaticProps({ params }) {
  const pageBuildAt = formatDate(new Date());
  const hero = await fetch("https://source.unsplash.com/random/700x300");
  const heroSrc = await hero.url;
  const randomContent = await fetch(
    "https://loripsum.net/api/10/decorate/ul/bq/code/headers"
  );
  const html = await randomContent.text();
  return {
    props: {
      title: params.slug,
      content: html,
      heroSrc,
      pageBuildAt,
      siteBuiltAt,
    },
  };
}

export async function getStaticPaths() {
  const paths = staticPageSlugs.map((slug) => {
    return {
      params: {
        slug,
      },
    };
  });

  return { paths, fallback: "blocking" };
}

export default function Post({
  title,
  content,
  heroSrc,
  pageBuildAt,
  siteBuiltAt,
}) {
  return (
    <>
      <Head>
        <title>Next.js | {title}</title>
      </Head>
      <div className="text-lg max-w-prose mx-auto h-72 relative">
        <div className="absolute bg-gray-600 w-full h-full opacity-60 top-0 left-0 z-10"></div>
        <div className="absolute z-20 flex flex-col items-center w-full justify-center h-full">
          <div className="text-white font-bold text-6xl overflow-ellipsis overflow-hidden">
            {title}
          </div>
        </div>
        <Image
          src={heroSrc}
          alt="hero image"
          layout="fill"
          priority={true}
          className="object-cover"
        />
      </div>
      <div className="mt-12 prose">
        <h2>
          Static page built at build time or on-demand via an{" "}
          <a href="https://docs.netlify.com/configure-builds/on-demand-builders/">
            On-demand builder
          </a>
          .
        </h2>
        <p>
          Site build started at: <strong>{siteBuiltAt}</strong>
        </p>
        <p>
          Page generated at: <strong>{pageBuildAt}</strong>
        </p>
      </div>
      <div
        className="my-12 prose prose-indigo prose-lg text-gray-500 mx-auto"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
}
