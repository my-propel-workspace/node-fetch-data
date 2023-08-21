const express = require('express');
const dataManager = require('./data-manager');

const app = express();
const port = process.env.PORT || 3000;

app.get('/metrics', (req, res) => {
  res.json(dataManager.getData());
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
module.exports = { app, server }; 
