const express = require('express');
const fetchData = require('./fetch-data');

let data = {};

const app = express();
const port = process.env.PORT || 8080;

const fetchDataAndUpdate = async () => {
    try {
        data = await fetchData();
        console.log('Data fetched:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
  
  // Fetch data immediately on module import
fetchDataAndUpdate();
  
// Fetch data every 10 seconds
const fetchInterval = 10000; // 10 seconds
setInterval(fetchDataAndUpdate, fetchInterval);

app.get('/metrics', (req, res) => {
  res.json(data);
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
module.exports = { app, server, fetchDataAndUpdate }; 
