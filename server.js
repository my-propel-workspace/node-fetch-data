const express = require('express');
const { fetchData } = require('./fetch-data');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const app = express();
const port = 8080;

let data = null;

app.use(express.json());

const fetchDataAndUpdate = async () => {
  try {
    data = await fetchData();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
fetchDataAndUpdate();
const fetchInterval = 10000;
const intervalId = setInterval(fetchDataAndUpdate, fetchInterval);

app.get('/metrics', async (req, res) => {
  if (data) {
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    
    const sanitizedData = DOMPurify.sanitize(data.replace(/\n/g, '<br>'));

    res.send(sanitizedData);
  } else {
    res.send('No data exist');
  }
});

app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = {
  app,
  server,
  fetchDataAndUpdate,
  intervalId,
};
