import { gql, useQuery } from "@apollo/client";
import ClientRow from "./ClientRow"
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

export default function Clients() {
  // ApolloProvider is essentially it's own state manager, loading state is true or false.
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <p>Loading . . .</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map(client => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
