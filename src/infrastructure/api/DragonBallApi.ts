import axios from 'axios';

const API_URL = 'https://dragonball-api.com/api';

export const DragonBallApi = {
  getCharacters: async (limit: number) => {
    const response = await axios.get(`${API_URL}/characters?limit=${limit}`);
    return response.data.items;
  },
  searchCharacters: async (name: string) => {
    const response = await axios.get(`${API_URL}/characters?name=${name}`);
    return response.data;
  },
  getCharacterDetails: async (id: string) => {
    const response = await axios.get(`${API_URL}/characters/${id}`);
    return response.data;
  },
};
