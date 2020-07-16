// Import deps
import React from "react";

// Import components
import { ClientListRow } from "./clients-list-row";

// Import styles
import "./../styles/clients-list.css";

// Create interfaces
interface ClientUI {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}

interface ClientListUI {
  clients: ClientUI[];
  loading: boolean;
  handleClientRemove: (id: number, email: string) => void;
}

// Create ClientList component
export const ClientList = (props: ClientListUI) => {
  // Show loading message
  if (props.loading) return <p>Leaderboard table is loading...</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table-head-item" />

          <th className="table-head-item">Email</th>

          <th className="table-head-item">First Name</th>

          <th className="table-head-item">Last Name</th>

          <th className="table-head-item" />
        </tr>
      </thead>

      <tbody className="table-body">
        {props.clients.length > 0 ? (
          props.clients.map((client: ClientUI, idx) => (
            <ClientListRow
              key={client.id}
              client={client}
              position={idx + 1}
              handleClientRemove={props.handleClientRemove}
            />
          ))
        ) : (
          <tr className="table-row">
            <td
              className="table-item"
              style={{ textAlign: "center" }}
              colSpan={6}
            >
              There are no clients registered!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
