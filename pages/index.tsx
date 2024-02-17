import { GetStaticProps } from "next";

import { subjectType } from "../customTypes";
import { cacheServerUrl } from "../api";

function HomePage({ subjects }: { subjects: subjectType[] }) {
  return (
    <div>
      <main></main>
    </div>
  );
}

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  let subjects: subjectType[] = [];
  try {
    const { data } = await cacheServerUrl.get("/subject");
    subjects = data.body;
  } catch (error) {}
  return {
    props: {
      subjects,
    },
  };
};
