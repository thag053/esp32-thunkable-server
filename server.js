const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// In-memory data storage for weight and dispense actions
let currentWeight = null;
let currentAction = null;

// Endpoint to receive weight data from ESP32
app.post('/weight', (req, res) => {
  const { weight } = req.body;
  
  if (weight == null) {
    return res.status(400).send("Error: Weight is required.");
  }

  currentWeight = weight;
  console.log(`Received weight: ${weight}`);
  res.send('Weight data received');
});

// Endpoint to retrieve the current weight (for Thunkable to get weight)
app.get('/weight', (req, res) => {
  console.log("Received GET request for /weight");

  if (currentWeight == null) {
    console.log("No weight data available");
    return res.status(404).send("Error: Weight data not found.");
  }

  console.log(`Sending weight: ${currentWeight}`);
  res.json({ weight: currentWeight });
});

// Endpoint to control the servo motor (e.g., dispense or stop)
app.post('/dispense', (req, res) => {
  const { action } = req.body;
  
  if (!action) {
    return res.status(400).send("Error: Action is required.");
  }

  currentAction = action;
  console.log(`Received action: ${action}`);
  res.send(`Servo action ${action} received`);
});

// Endpoint to retrieve the current dispense action (for ESP32 to get the action)
app.get('/dispense', (req, res) => {
  console.log("Received GET request for /dispense");

  if (currentAction == null) {
    console.log("No dispense action found");
    return res.status(404).send("Error: No dispense action found.");
  }

  console.log(`Sending action: ${currentAction}`);
  res.json({ action: currentAction });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
