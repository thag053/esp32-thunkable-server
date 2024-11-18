const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON requests and set Content-Type to application/json
app.use(bodyParser.json());

// Always return JSON responses middleware
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

// In-memory data storage for weight and dispense actions
let currentWeight = null;
let currentAction = null;

// Endpoint to receive weight data from ESP32 (POST)
app.post('/weight', (req, res) => {
  console.log("Received POST request for /weight");

  const { weight } = req.body;

  if (weight == null) {
    return res.status(400).json({ error: "Weight is required." });  // Return error in JSON format
  }

  currentWeight = weight;
  console.log(`Received weight: ${weight}`);
  res.json({ message: 'Weight data received', weight });  // Return success in JSON format
});

// Endpoint to retrieve the current weight (GET for Thunkable to get weight)
app.get('/weight', (req, res) => {
  console.log("Received GET request for /weight");

  if (currentWeight == null) {
    return res.status(404).json({ error: "Weight data not found." });  // Return error in JSON format
  }

  console.log(`Sending weight: ${currentWeight}`);
  res.json({ weight: currentWeight });  // Return weight as JSON
});

// Endpoint to control the servo motor (POST for dispense or stop)
app.post('/dispense', (req, res) => {
  console.log("Received POST request for /dispense");

  const { action } = req.body;

  if (!action) {
    return res.status(400).json({ error: "Action is required." });  // Return error in JSON format
  }

  currentAction = action;
  console.log(`Received action: ${action}`);
  res.json({ message: `Servo action ${action} received`, action });  // Return success in JSON format
});

// Endpoint to retrieve the current dispense action (GET for ESP32 to get the action)
app.get('/dispense', (req, res) => {
  console.log("Received GET request for /dispense");

  if (currentAction == null) {
    return res.status(404).json({ error: "No dispense action found." });  // Return error in JSON format
  }

  console.log(`Sending action: ${currentAction}`);
  res.json({ action: currentAction });  // Return action as JSON
});

// Catch-all error handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found." });  // Return 404 error in JSON format
});

// Get the port from the environment variable or default to 10000 (Render uses dynamic ports)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
