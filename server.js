const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Endpoint to receive weight data from ESP32
app.post('/weight', (req, res) => {
  const { weight } = req.body;
  console.log(`Received weight: ${weight}`);
  res.send('Weight data received');
});

// Endpoint to control the servo motor (e.g., dispense or stop)
app.post('/dispense', (req, res) => {
  console.log("Request body:", req.body);  // Log the entire body to check the received data
  
  const { action } = req.body;  // e.g., 'dispense' or 'stop'
  
  if (!action) {
    return res.status(400).send("Error: Action is required.");  // Return an error if action is not provided
  }

  console.log(`Received action: ${action}`);
  res.send(`Servo action ${action} received`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
