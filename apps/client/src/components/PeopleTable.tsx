import { Table } from "antd";
import React from "react";
import { useAppSelector } from "../store";

type Props = {};

const PeopleTable = (props: Props) => {
  const selected_movie_id = useAppSelector(
    (state) => state.filters.selected_movie_id
  );

  const columns = [
    {
      title: "ID",
      dataIndex: ["person", "id"],
      key: "person.id",
    },
    {
      title: "Name",
      dataIndex: ["person", "name"],
      key: "person.name",
    },
    {
      title: "Born",
      dataIndex: ["person", "born"],
      key: "person.born",
    },
    {
      title: "Relation",
      dataIndex: ["relation", "type"],
      key: "relation.type",
    },
  ];

  if (selected_movie_id === undefined) return null;

  return <Table dataSource={[]} columns={columns} />;
};

export default PeopleTable;
