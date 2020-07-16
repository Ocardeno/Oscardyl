// Import express
const express = require("express");

// Import clients-controller
const clientsRoutes = require("./../controllers/clients-controller.js");

// Create router
const router = express.Router();

// Add route for GET request to retrieve all client
// In server.js, clients route is specified as '/clients'
// this means that '/all' translates to '/clients/all'
router.get("/all", clientsRoutes.clientsAll);

// Add route for POST request to create new book
// In server.js, clients route is specified as '/clients'
// this means that '/create' translates to '/clients/create'
router.post("/create", clientsRoutes.clientsCreate);

// Add route for PUT request to delete specific book
// In server.js, clients route is specified as '/clients'
// this means that '/delete' translates to '/clients/delete'
router.put("/delete", clientsRoutes.clientsDelete);

// Add route for PUT request to reset clients list
// In server.js, clients route is specified as '/clients'
// this means that '/reset' translates to '/clients/reset'
router.put("/reset", clientsRoutes.clientsReset);

// Export router
module.exports = router;
