import Head from "next/head";

export async function getStaticProps({ params }) {
  const hero = await fetch("https://source.unsplash.com/random/624x288");
  const heroSrc = await hero.url;
  const randomContent = await fetch(
    "https://loripsum.net/api/10/decorate/ul/bq/code/headers"
  );
  const html = await randomContent.text();
  return {
    props: {
      title: params.id,
      content: html,
      heroSrc,
    },
  };
}

export async function getStaticPaths() {
  const paths = [{ params: { id: "static" } }];

  return { paths, fallback: "blocking" };
}

export default function Post({ title, content, heroSrc }) {
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
        <img src={heroSrc} alt="hero image" className="object-cover" />
      </div>
      <div
        className="my-12 prose prose-indigo prose-lg text-gray-500 mx-auto"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
}
