const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Endpoint to control the servo motor (dispense action)
app.post('/dispense', (req, res) => {
  const { action } = req.body; // Expecting action like 'dispense' or 'stop'
  
  if (!action) {
    console.log("No action provided in the request.");
    return res.status(400).send("Error: Action is required.");
  }
  
  console.log(`Received action: ${action}`);
  res.send(`Servo action ${action} received`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
