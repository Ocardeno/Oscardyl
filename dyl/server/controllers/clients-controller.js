// Import database
const knex = require("./../db");

// Retrieve all clients
exports.clientsAll = async (req, res) => {
  // Get all clients from database
  knex
    .select("*") // select all records
    .from("clients") // from 'clients' table
    .then((userData) => {
      // Send clients extracted from database in response
      res.json(userData);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving clients: ${err}` });
    });
};

// Create new client
exports.clientsCreate = async (req, res) => {
  // Add new client to database
  knex("clients")
    .insert({
      // insert new record, a client
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    })
    .then(() => {
      // Send a success message in response
      res.json({
        message: `Client \'${req.body.email}\' by ${req.body.firstname} created.`,
      });
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error creating ${req.body.email} client: ${err}`,
      });
    });
};

// Remove specific client
exports.clientsDelete = async (req, res) => {
  // Find specific client in the database and remove it
  knex("clients")
    .where("id", req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `Book ${req.body.id} deleted.` });
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error deleting ${req.body.id} client: ${err}`,
      });
    });
};

// Remove all clients on the list
exports.clientsReset = async (req, res) => {
  // Remove all clients from database
  knex
    .select("*") // select all records
    .from("clients") // from 'clients' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: "Clients list cleared." });
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error resetting client list: ${err}.`,
      });
    });
};
