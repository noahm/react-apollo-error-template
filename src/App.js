import React from "react";
import { graphql } from "@apollo/react-hoc";
import gql from "graphql-tag";

import { ErrorBoundary } from "./ErrorBoundary";

const ALL_PEOPLE = gql`
  query AllPeople($getPeople: Boolean!) {
    people @include(if: $getPeople) {
      id
      name
    }
  }
`;

const QueryByHoc = graphql(ALL_PEOPLE, {
  skip: props => !!props.skip,
  options: {
    variables: {
      getPeople: true
    }
  }
})(({ data }) => {
  if (!data) {
    return <p>Query was skipped.</p>;
  }
  if (data.loading) {
    return <p>Loading...</p>;
  }
  return (
    <ul>
      {data.people.map(person => (
        <li key={person.id}>{person.name}</li>
      ))}
    </ul>
  );
});

export default function App() {
  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <h2>Names</h2>
      <ErrorBoundary>
        <QueryByHoc skip />
      </ErrorBoundary>
    </main>
  );
}
