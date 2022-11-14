import Head from "next/head";
import Image from "next/legacy/image";
import siteBuiltAt from "../lib/buildTime.preval";
import { formatDate } from "../lib/formatDate";

export async function getServerSideProps() {
  const pageBuildAt = formatDate(new Date());
  const hero = await fetch("https://source.unsplash.com/random/700x300");
  const heroSrc = await hero.url;
  const randomContent = await fetch(
    "https://loripsum.net/api/10/decorate/ul/bq/code/headers"
  );
  const html = await randomContent.text();
  return {
    props: {
      content: html,
      heroSrc,
      pageBuildAt,
      siteBuiltAt,
    },
  };
}

export default function Post({ content, heroSrc, pageBuildAt, siteBuiltAt }) {
  return (
    <>
      <Head>
        <title>Next.js | SSR</title>
      </Head>
      <div className="text-lg max-w-prose mx-auto h-72 relative">
        <div className="absolute bg-gray-600 w-full h-full opacity-60 top-0 left-0 z-10"></div>
        <div className="absolute z-20 flex flex-col items-center w-full justify-center h-full">
          <div className="text-white font-bold text-6xl overflow-ellipsis overflow-hidden">
            Server Side Rendered
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
        <h2>Server Side Rendered Page</h2>
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
