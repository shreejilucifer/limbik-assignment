import { Alert, Table } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useGetPeopleQuery } from "../services/persons.service";
import { useAppSelector } from "../store";
import { PersonRelation } from "../types/person.dto";

type Props = {};

const PeopleTable = (props: Props) => {
  const router = useRouter();
  const selected_movie_id = useAppSelector(
    (state) => state.filters.selected_movie_id
  );
  const { isLoading, isError, data } = useGetPeopleQuery(
    { movie_id: selected_movie_id },
    {
      skip: selected_movie_id === undefined,
    }
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
      title: "Relation",
      dataIndex: ["relation", "type"],
      key: "relation.type",
      filters: data
        ?.map((d) => d.relation.type)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((d) => ({ text: d, value: d })),
      onFilter: (value: any, record: PersonRelation) =>
        record.relation.type.includes(value),
    },
  ];

  if (selected_movie_id === undefined) return null;

  if (isError)
    return (
      <Alert type="error" message="An Error Occured While Fetching People" />
    );

  return (
    <Table
      bordered
      title={() => "List of People Related to Movie"}
      dataSource={data}
      columns={columns}
      loading={isLoading}
      rowKey={(pr) => `${pr.person.id}-${pr.relation.id}`}
      pagination={{ pageSize: 5 }}
      onRow={(record) => ({
        onClick: () => {
          router.push(`/person/${record.person.id}`);
        },
      })}
    />
  );
};

export default PeopleTable;
