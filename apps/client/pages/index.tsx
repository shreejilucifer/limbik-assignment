import { Typography } from "antd";
import type { NextPage } from "next";
import Filters from "../src/components/Filters";
import PageLayout from "../src/components/PageLayout";

const Home: NextPage = () => {
  return (
    <PageLayout>
      <Filters />
    </PageLayout>
  );
};

export default Home;
