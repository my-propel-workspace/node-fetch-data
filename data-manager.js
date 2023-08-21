const fetchData = require('./fetch-data'); // Assuming you have a fetch-data.js module

let data = {}; // Store fetched data here

const fetchDataAndUpdate = async () => {
  try {
    data = await fetchData.fetchData();
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

module.exports = {
  fetchDataAndUpdate,
  getData: () => data
};
