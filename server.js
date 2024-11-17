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

// Endpoint to control servo motor
app.post('/control-servo', (req, res) => {
  const { action } = req.body; // e.g., 'dispense' or 'stop'
  console.log(`Servo action: ${action}`);
  res.send(`Servo action ${action} received`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
