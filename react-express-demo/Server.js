const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// API endpoint to serve data
app.get('/api/data', (req, res) => {
  // Replace 'your-data.json' with the actual path to your JSON data file
  const data = require('C:\Users\Admin\Desktop\BusTicketBooking\today\Assignment1\src\Components\Data.json');
  res.json(data);
});

// Catch-all route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
