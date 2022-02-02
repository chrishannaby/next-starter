export async function getStaticProps() {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log("waking up");
      resolve(1);
    }, 1000);
  });
  return {
    props: {},
    revalidate: 60,
  };
}

export default function Post({}) {
  return <>Promise</>;
}
