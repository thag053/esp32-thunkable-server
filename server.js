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

// In-memory data storage for various parameters
let currentWeight = null;
let currentAction = null;
let currentOutflow = null;
let currentInflow = null;
let currentDif = null;
let currentVibration = null;
let currentStatus = null;

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

// New endpoint for outflow data (POST)
app.post('/outflow', (req, res) => {
  console.log("Received POST request for /outflow");

  const { outflow } = req.body;

  if (outflow == null) {
    return res.status(400).json({ error: "Outflow data is required." });  // Return error in JSON format
  }

  currentOutflow = outflow;
  console.log(`Received outflow: ${outflow}`);
  res.json({ message: 'Outflow data received', outflow });  // Return success in JSON format
});

// Endpoint to retrieve current outflow data (GET)
app.get('/outflow', (req, res) => {
  console.log("Received GET request for /outflow");

  if (currentOutflow == null) {
    return res.status(404).json({ error: "Outflow data not found." });  // Return error in JSON format
  }

  console.log(`Sending outflow: ${currentOutflow}`);
  res.json({ outflow: currentOutflow });  // Return outflow as JSON
});

// New endpoint for inflow data (POST)
app.post('/inflow', (req, res) => {
  console.log("Received POST request for /inflow");

  const { inflow } = req.body;

  if (inflow == null) {
    return res.status(400).json({ error: "Inflow data is required." });  // Return error in JSON format
  }

  currentInflow = inflow;
  console.log(`Received inflow: ${inflow}`);
  res.json({ message: 'Inflow data received', inflow });  // Return success in JSON format
});

// Endpoint to retrieve current inflow data (GET)
app.get('/inflow', (req, res) => {
  console.log("Received GET request for /inflow");

  if (currentInflow == null) {
    return res.status(404).json({ error: "Inflow data not found." });  // Return error in JSON format
  }

  console.log(`Sending inflow: ${currentInflow}`);
  res.json({ inflow: currentInflow });  // Return inflow as JSON
});

// New endpoint for difference data (POST)
app.post('/dif', (req, res) => {
  console.log("Received POST request for /dif");

  const { dif } = req.body;

  if (dif == null) {
    return res.status(400).json({ error: "Difference data is required." });  // Return error in JSON format
  }

  currentDif = dif;
  console.log(`Received difference: ${dif}`);
  res.json({ message: 'Difference data received', dif });  // Return success in JSON format
});

// Endpoint to retrieve current difference data (GET)
app.get('/dif', (req, res) => {
  console.log("Received GET request for /dif");

  if (currentDif == null) {
    return res.status(404).json({ error: "Difference data not found." });  // Return error in JSON format
  }

  console.log(`Sending difference: ${currentDif}`);
  res.json({ dif: currentDif });  // Return difference as JSON
});

// New endpoint for vibration data (POST)
app.post('/vibration', (req, res) => {
  console.log("Received POST request for /vibration");

  const { vibration } = req.body;

  if (vibration == null) {
    return res.status(400).json({ error: "Vibration data is required." });  // Return error in JSON format
  }

  currentVibration = vibration;
  console.log(`Received vibration: ${vibration}`);
  res.json({ message: 'Vibration data received', vibration });  // Return success in JSON format
});

// Endpoint to retrieve current vibration data (GET)
app.get('/vibration', (req, res) => {
  console.log("Received GET request for /vibration");

  if (currentVibration == null) {
    return res.status(404).json({ error: "Vibration data not found." });  // Return error in JSON format
  }

  console.log(`Sending vibration: ${currentVibration}`);
  res.json({ vibration: currentVibration });  // Return vibration as JSON
});

// New endpoint for system status (POST)
app.post('/status', (req, res) => {
  console.log("Received POST request for /status");

  const { status } = req.body;

  if (status == null) {
    return res.status(400).json({ error: "Status is required." });  // Return error in JSON format
  }

  currentStatus = status;
  console.log(`Received status: ${status}`);
  res.json({ message: 'Status received', status });  // Return success in JSON format
});

// Endpoint to retrieve system status (GET)
app.get('/status', (req, res) => {
  console.log("Received GET request for /status");

  if (currentStatus == null) {
    return res.status(404).json({ error: "Status not found." });  // Return error in JSON format
  }

  console.log(`Sending status: ${currentStatus}`);
  res.json({ status: currentStatus });  // Return status as JSON
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
