// api.js
import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('https://seu-banco-de-dados.com/valor');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchData;