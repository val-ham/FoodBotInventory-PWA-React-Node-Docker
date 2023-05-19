import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { deleteItemCall, increaseQuantityCall, getItemByIdCall, decreaseQuantityCall } from "../apiCalls";
import { AuthContext } from "./authContext";

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const { logout } = useContext(AuthContext);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/items`, {
        withCredentials: true,
      });
      setItems(res.data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        logout();
      }
    }
  };

  const deleteItem = async (itemId) => {
    await deleteItemCall(itemId);
    setItems((oldItems) => oldItems.filter((item) => item.id !== itemId));
  };

  const increaseQuantity = async (ean, id) => {
    await increaseQuantityCall(ean);
    const updatedItem = await getItemByIdCall(id);
    updateItems(id, updatedItem.data);
  };

  const decreaseQuantity = async (id, quantity) => {
    if (quantity < 2) {
      deleteItem(id);
    } else {
      await decreaseQuantityCall(id);
      const updatedItem = await getItemByIdCall(id);
      updateItems(id, updatedItem.data);
    }
  };

  const updateItems = (id, updatedItem) => {
    setItems((prevState) => prevState.map((item) => (item.id === id ? updatedItem : item)));
  };

  return <ItemsContext.Provider value={{ items, fetchItems, decreaseQuantity, deleteItem, increaseQuantity }}>{children}</ItemsContext.Provider>;
};
