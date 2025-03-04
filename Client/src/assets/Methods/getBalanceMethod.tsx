const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/game/balance');
      const result = await response.json();
      return result;
    } catch (err) {
      throw new Error('An error occurred while fetching data');
    }
  };

export default fetchData