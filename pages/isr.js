import Layout from "../components/Layout";
import SubLayout from "../components/SubLayout";

export async function getStaticProps() {
  console.log("🤩🤩🤩 영우의 로그 : ", "server");
  return {
    props: { time: new Date().toISOString() },
    revalidate: 1,
  };
}

export default function ISR({ time }) {
  return <h1 className="title">{time}</h1>;
}

ISR.getLayout = function getLayout(page) {
  return (
    <Layout>
      <SubLayout>{page}</SubLayout>
    </Layout>
  );
};
