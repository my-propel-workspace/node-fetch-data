const fetch = require('node-fetch');

async function fetchData() {
  try {
    const response = await fetch('YOUR_DATA_API_URL');
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

module.exports = fetchData;
