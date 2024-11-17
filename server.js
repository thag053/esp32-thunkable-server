const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Endpoint to receive weight data from ESP32
app.post('/weight', (req, res) => {
  const { weight } = req.body;
  console.log(`Received weight: ${weight}`);
  res.send('Weight data received');
});

// Endpoint to control the servo motor
app.post('/dispense', (req, res) => {
  const { action } = req.body; // e.g., 'start' or 'stop'
  console.log(`Servo action: ${action}`);
  res.send(`Servo action ${action} received`);
});

// Set the server to listen on the provided port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

