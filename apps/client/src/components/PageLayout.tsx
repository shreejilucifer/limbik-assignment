import { Layout, Typography } from "antd";
import React from "react";

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

const PageLayout = ({ children }: Props) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header>
        <Typography.Text style={{ color: "#fff" }} strong>
          Limbik Movies
        </Typography.Text>
      </Layout.Header>
      <Layout.Content
        style={{
          backgroundColor: "#fff",
          paddingLeft: "50px",
          paddingRight: "50px",
          paddingTop: "25px",
        }}
      >
        {children}
      </Layout.Content>
      <Layout.Footer>&copy; Shreeji Pedhadiya</Layout.Footer>
    </Layout>
  );
};

export default PageLayout;
