// Import deps
import React, { useEffect, useState } from "react";
import axios from "axios";

// Import components
import { ClientList } from "./clients-list";

// Import styles
import "./../styles/clients.css";

// Create Client component
export const Clients = () => {
  // Prepare states
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all clients on initial render
  useEffect(() => {
    fetchClients();
  }, []);

  // Fetch all clients
  const fetchClients = async () => {
    // Send GET request to 'clients/all' endpoint
    axios
      .get("http://localhost:4001/clients/all")
      .then((response) => {
        // Update the clients state
        setClients(response.data);

        // Update loading state
        setLoading(false);
      })
      .catch((error) =>
        console.error(`There was an error retrieving the client list: ${error}`)
      );
  };

  // Reset all input fields
  const handleInputsReset = () => {
    setFirstname("");
    setEmail("");
    setLastname("");
  };

  // Create new client
  const handleClientCreate = () => {
    // Send POST request to 'clients/create' endpoint
    axios
      .post("http://localhost:4001/clients/create", {
        firstname: firstname,
        email: email,
        lastname: lastname,
      })
      .then((res) => {
        console.log(res.data);

        // Fetch all clients to refresh
        // the clients on the client list
        fetchClients();
      })
      .catch((error) =>
        console.error(
          `There was an error creating the ${email} client: ${error}`
        )
      );
  };

  // Submit new client
  const handleClientSubmit = () => {
    // Check if all fields are filled
    if (firstname.length > 0 && email.length > 0 && lastname.length > 0) {
      // Create new client
      handleClientCreate();

      console.info(`Client ${email} by ${firstname} added.`);

      // Reset all input fields
      handleInputsReset();
    }
  };

  // Remove client
  const handleClientRemove = (id: number, email: string) => {
    // Send PUT request to 'clients/delete' endpoint
    axios
      .put("http://localhost:4001/clients/delete", { id: id })
      .then(() => {
        console.log(`Client ${email} removed.`);

        // Fetch all clients to refresh
        // the clients on the client list
        fetchClients();
      })
      .catch((error) =>
        console.error(
          `There was an error removing the ${email} client: ${error}`
        )
      );
  };

  // Reset client list (remove all clients)
  const handleListReset = () => {
    // Send PUT request to 'clients/reset' endpoint
    axios
      .put("http://localhost:4001/clients/reset")
      .then(() => {
        // Fetch all clients to refresh
        // the clients on the client list
        fetchClients();
      })
      .catch((error) =>
        console.error(`There was an error resetting the client list: ${error}`)
      );
  };

  return (
    <div className="book-list-wrapper">
      {/* Form for creating new book */}
      <div className="book-list-form">
        <div className="form-wrapper" onSubmit={handleClientSubmit}>
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="email">
                Email:
              </label>
              <input
                className="form-input"
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="firstname">
                First Name:
              </label>
              <input
                className="form-input"
                type="text"
                id="firstname"
                name="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.currentTarget.value)}
              />
            </fieldset>
          </div>

          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="lastname">
                Last Name:
              </label>
              <input
                className="form-input"
                type="text"
                id="lastname"
                name="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.currentTarget.value)}
              />
            </fieldset>
            {/*
            <fieldset>
              <label className="form-label" htmlFor="rating">
                Last Name:
              </label>
              <input
                className="form-input"
                type="text"
                id="rating"
                name="rating"
                value={rating}
                onChange={(e) => setRating(e.currentTarget.value)}
              />
            </fieldset>

            */}
          </div>
        </div>

        <button onClick={handleClientSubmit} className="btn btn-add">
          Add the client
        </button>
      </div>

      {/* Render client list component */}
      <ClientList
        clients={clients}
        loading={loading}
        handleClientRemove={handleClientRemove}
      />

      {/* Show reset button if list contains at least one client */}
      {clients.length > 0 && (
        <button className="btn btn-reset" onClick={handleListReset}>
          Reset client list.
        </button>
      )}
    </div>
  );
};

export default Clients;
