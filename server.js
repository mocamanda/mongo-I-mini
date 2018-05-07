const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

// Connect to Mongo
mongoose
  .connect('mongodb://localhost/beardb')
  .then(mongo => {
    console.log('Successfully Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to database', err)
  });

const bearController = require('./bears/bearController');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', function(req, res) {
  res.status(200).json({ API: 'Running' });
});

server.use('/api/bears', bearController);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});
