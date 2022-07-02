import { gql } from "@apollo/client";

// The convention here is to use all caps, and syntax for gql is backticks instead of parentheses. Also query syntax is the same from GraphiQL.
const GET_CLIENTS = gql`
  {
    clients {
      name
      id
      email
      phone
    }
  }
`;

export { GET_CLIENTS };