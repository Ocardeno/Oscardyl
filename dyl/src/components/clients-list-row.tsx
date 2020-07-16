// Import deps
import React from "react";

// Create interfaces
interface ClientListRowUI {
  position: number;
  client: {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
  };
  handleClientRemove: (id: number, email: string) => void;
}

// Create ClientListRow component
export const ClientListRow = (props: ClientListRowUI) => (
  <tr className="table-row">
    <td className="table-item">{props.position}</td>

    <td className="table-item">{props.client.email}</td>

    <td className="table-item">{props.client.firstname}</td>

    <td className="table-item">{props.client.lastname}</td>

    <td className="table-item">
      <button
        className="btn btn-remove"
        onClick={() =>
          props.handleClientRemove(props.client.id, props.client.email)
        }
      >
        Delete Client
      </button>
    </td>
  </tr>
);
