import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_ClIENT } from "../mutations/ClientMutations";
// Use refresh page after client delete
import { GET_CLIENTS } from "../queries/ClientQueries";
import { GET_PROJECTS } from "../queries/ProjectQueries";

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_ClIENT, {
    variables: { id: client.id },
    // A way to refresh view after deleting client but...
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    // ... instead of making a call to the server, go to the cache and write the last GET_CLIENTS query without the client with deleteClient id.
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({
    //     query: GET_CLIENTS,
    //   });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
