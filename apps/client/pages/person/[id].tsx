import { PageHeader } from "antd";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import MovieTable from "../../src/components/MovieTable";
import PageLayout from "../../src/components/PageLayout";
import { getMovieByPerson } from "../../src/services/persons.service";
import { PersonRelationMovie } from "../../src/types/person.dto";

type Props = {
  personRelationMovie: PersonRelationMovie[];
};

const PersonPage = ({ personRelationMovie }: Props) => {
  const router = useRouter();
  return (
    <PageLayout>
      <PageHeader
        onBack={() => router.back()}
        title={personRelationMovie[0].person.name}
      />
      <MovieTable personRelationMovie={personRelationMovie} />
    </PageLayout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const personRelationMovie = await getMovieByPerson(
    Number(context.query.id as string)
  );

  if (!personRelationMovie || !personRelationMovie.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      personRelationMovie,
    },
  };
}

export default PersonPage;
