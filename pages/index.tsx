import { GetStaticProps } from "next";

import { subjectType } from "../customTypes";
import { cacheServerUrl } from "../api";
import DashboardLayout from "src/layouts/dashboard/layout";
import HomeView from "src/sections/home/view/home-view";

function HomePage({ subjects }: { subjects: subjectType[] }) {
  return (
    <div>
      <title>Home page</title>
      <DashboardLayout>
        <HomeView />
      </DashboardLayout>
    </div>
  );
}

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  let subjects: subjectType[] = [];
  // try {
  //   const { data } = await cacheServerUrl.get("/subject");
  //   subjects = data.body;
  // } catch (error) {}
  return {
    props: {
      subjects,
    },
  };
};
