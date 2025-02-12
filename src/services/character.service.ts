import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  timeout: 5000,
});

export const getCharacters = async (page: number) => {
  try {
    const { data } = await apiClient.get("/character", {
      params: { page },
    });
    return data.results;
  } catch (error) {
    console.error("Error fetching characters: ", error);
    throw error;
  }
};

export const getCharacterById = async (id: string | number) => {
  try {
    const { data } = await apiClient.get(`/character/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching character ${id}:`, error);
    throw error;
  }
};
