import axios from 'axios';

// Function to fetch data from the backend
const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/data');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Function to send data to the backend
const saveData = async (data) => {
  try {
    const response = await axios.post('http://localhost:5000/api/data', data);
    console.log(response.data);
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export { fetchData, saveData };
