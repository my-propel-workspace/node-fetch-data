const express = require('express');
const { fetchData } = require('./fetch-data');
const sanitizeHtml = require('sanitize-html')

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

const clean = (data) => {
    data = JSON.stringify(data)

    data = sanitizeHtml(data)

    data = JSON.parse(data)

    return data
}

app.get('/metrics', async (req, res) => {
  if (data) {
    const sanitizedData = clean(data.replace(/\n/g, '<br>'));

    // Save it to database
    res.json({
        success: true,
        data: sanitizedData,
    });

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
