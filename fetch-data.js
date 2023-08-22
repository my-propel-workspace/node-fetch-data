const axios = require('axios');

async function fetchData() {
    try {
      const response = await axios.get('https://dummyjson.com/products/1'); // Replace with your actual API URL
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }


module.exports = fetchData;
