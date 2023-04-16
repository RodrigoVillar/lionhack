const fetchDataFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/data');
      const data = await response.json();
      console.log('Data from backend:', data);
  
      // Process the data as needed
      processData(data);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  };
  
  const processData = (data) => {
    // Process the data as needed, e.g., update state or call other functions
    console.log('Processing data:', data);
  };
  
  // Fetch data from the backend
  fetchDataFromBackend();
  