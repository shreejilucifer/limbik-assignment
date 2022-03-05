import { Space } from "antd";
import type { NextPage } from "next";
import Filters from "../src/components/Filters";
import PageLayout from "../src/components/PageLayout";
import PeopleTable from "../src/components/PeopleTable";

const Home: NextPage = () => {
  return (
    <PageLayout>
      <Space direction="vertical" size="large">
        <Filters />
        <PeopleTable />
      </Space>
    </PageLayout>
  );
};

export default Home;
