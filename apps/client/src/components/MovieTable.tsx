import { Table } from "antd";
import React from "react";
import { PersonRelationMovie } from "../types/person.dto";

type Props = {
  personRelationMovie: PersonRelationMovie[];
};

const MovieTable = ({ personRelationMovie }: Props) => {
  const columns = [
    {
      title: "ID",
      dataIndex: ["movie", "id"],
      key: "movie.id",
    },
    {
      title: "Movie Title",
      dataIndex: ["movie", "title"],
      key: "movie.title",
    },
    {
      title: "Movie Released",
      dataIndex: ["movie", "released"],
      key: "movie.released",
    },
    {
      title: "Relation",
      dataIndex: ["relation", "type"],
      key: "relation.type",
      filters: personRelationMovie
        ?.map((d) => d.relation.type)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((d) => ({ text: d, value: d })),
      onFilter: (value: any, record: PersonRelationMovie) =>
        record.relation.type.includes(value),
    },
  ];

  return (
    <Table
      bordered
      title={() =>
        `List of Movies Related to ${personRelationMovie[0].person.name}`
      }
      dataSource={personRelationMovie}
      columns={columns}
      rowKey={(pr) => `${pr.movie.id}-${pr.relation.id}`}
    />
  );
};

export default MovieTable;
