import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

// ITEM CALLS

export const deleteItemCall = async (id) => {
  return await axios.post(
    `${API_BASE_URL}/items/delete`,
    { id },
    {
      withCredentials: true,
    }
  );
};

export const addItemsCall = async (items) => {
  return await axios.post(
    `${API_BASE_URL}/items/add`,
    { items },
    {
      withCredentials: true,
    }
  );
};

export const increaseQuantityCall = async (ean) => {
  return await addItemsCall([{ ean, quantity: 1 }]);
};

export const decreaseQuantityCall = async (id) => {
  return await axios.post(`${API_BASE_URL}/items/decrease`, { id, quantity: 1 }, { withCredentials: true });
};

export const getItemByIdCall = async (id) => {
  return await axios.get(`${API_BASE_URL}/items/${id}`, {
    withCredentials: true,
  });
};

// AUTH CALLS
export const loginCall = async (inputs) => {
  const res = await axios.post(`${API_BASE_URL}/login`, inputs, {
    withCredentials: true,
  });
  return res;
};

export const logoutCall = async () => {
  return await axios.post(
    `${API_BASE_URL}/logout`,
    {},
    {
      withCredentials: true,
    }
  );
};
//OPENAI API CALLS

export const generateRecipe = async (selectedItems) => {
  return await axios.post(
    `${API_BASE_URL}/bot/generate`,
    { selectedItems },
    {
      withCredentials: true,
    }
  );
};
