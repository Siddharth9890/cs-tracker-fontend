import { GetStaticProps } from "next";

import Container from "../components/HomePage/Container";
import HeroSection from "../components/HomePage/HeroSection";
import Process from "../components/HomePage/Process";

import { subjectType } from "../customTypes";
import { cacheServerUrl } from "../api";

function HomePage({ subjects }: { subjects: subjectType[] }) {
  return (
    <div>
      <main>
        <HeroSection />
        <Process />
        <Container subjects={subjects} />
      </main>
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
