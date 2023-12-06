import React, {lazy, Suspense} from "react";
import { useParams } from 'react-router-dom';
import { getPerson } from '../api/tmdb-api'
import { useQuery } from "react-query";

const TemplatePeoplePage = lazy(() => import("../components/templatePeoplePage"));
const Spinner = lazy(() => import("../components/spinner"));
const PeopleDetails = lazy(() => import("../components/peopleDetails"));

const PersonPage = (props) => {
  const { id } = useParams();
  
  const { data: person, error, isLoading, isError } = useQuery(
    ["person", { id: id }],
    getPerson
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {person ? (
        <>
        <Suspense fallback={<h1>Loading page</h1>}>
          <TemplatePeoplePage person={person}>
            <PeopleDetails person={person} />
          </TemplatePeoplePage>
        </Suspense>
        </>
      ) : (
        <p>Waiting for people details</p>
      )}
    </>
  );
};

export default PersonPage;