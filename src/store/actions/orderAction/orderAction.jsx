import { toast } from "react-toastify";
import {
  ADD_CARDS,
  REMOVE_ADDRESS,
  SET_ADDRESS,
  SET_LOADING,
  UPDATE_ADDRESS,
  REMOVE_CARDS
} from "./orderActionTypes";
import axiosInstance from "../../../api/axiosInstance";


export const setAddress = (address) => {
  // Local storage'a adresi kaydet
  localStorage.setItem("address", JSON.stringify(address));
  return { type: SET_ADDRESS, payload: address };
};

export const updateAddressAction = (address) => {
  // Local storage'taki adresi güncelle
  localStorage.setItem("address", JSON.stringify(address));
  return { type: UPDATE_ADDRESS, payload: address };
};

export const setLoading = (loading) => {
  return { type: SET_LOADING, payload: loading };
};


export const setAddressThunkAction = (formData) => (dispatch) => {
  const token = localStorage.getItem("Token");
  axiosInstance
     .post("/user/address", formData, {
    headers: {
      Authorization: `Bearer ${token}`, // token değerini kullanarak Authorization başlığı
    },
  })
  .then((res) => {
    dispatch(setAddress(res.data));
    toast.success("Address added.");
    // Sayfayı yeniden yükle
    window.location.reload();
  })
  .catch((err) => {
    console.error("Error adding address:", err);
  });
};


export const removeAddressAction = (id) => {
  console.log("Removing address action:", id);
  const storedAddress = JSON.parse(localStorage.getItem("address"));
  if (storedAddress && storedAddress.id === id) {
    console.log("Removing address from local storage");
    localStorage.removeItem("address");
  }
  return { type: REMOVE_ADDRESS, payload: id };
};

export const removeAddressThunkAction = (id) => (dispatch) => {
  const token = localStorage.getItem("Token");
  console.log("Removing address from DB:", id);

  axiosInstance
    .delete(`/user/address/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      console.log("Address successfully deleted:", res.data);
      dispatch(removeAddressAction(id));
      toast.success("Address deleted from the database.");
    })
    .catch((err) => {
      console.error("Error deleting address from the database:", err);

      if (err.response && err.response.status === 404) {
        toast.error("Address not found in the database.");
      } else {
        toast.error("Error deleting address from the database. Please try again.");
      }
    });
};

export const updateAddressThunkAction = (formData) => (dispatch) => {
  const token = localStorage.getItem("Token");
  dispatch(setLoading(true));

  console.log("Updating Address - formData:", formData); // Add this line

  axiosInstance
    .put(`/user/address`, formData, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      console.log("Update Address Response:", res.data); // Add this line
      dispatch(updateAddressAction(res.data));
      toast.success("Address updated.");
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.error(err.response);
      toast.error("Error updating address.");
    });
};

export const addCard = (card) => {
  return { type: ADD_CARDS, payload: card };
};

export const addCardsThunkAction = (formData) => (dispatch) => {
  const token = localStorage.getItem("Token");
  axiosInstance
    .post("/user/card", formData, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      dispatch(addCard(res.data));
    });
};

export const updateCardThunkAction = (formData) => (dispatch) => {
  const token = localStorage.getItem("Token");
  axiosInstance
    .put(`/user/card`, formData, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      console.log(res.data);
      toast.success("Card updated.");
    })
    .catch((err) => {
      console.error(err.response);
      toast.error("Error updating card.");
    });
};

export const removeCardThunkAction = (id) => (dispatch) => {
  const token = localStorage.getItem('Token');
  console.log('Removing card from DB:', id);

  axiosInstance
    .delete(`/user/card/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      console.log('Card successfully deleted:', res.data);
      dispatch({ type: REMOVE_CARDS, payload: id }); // Dispatch REMOVE_CARDS action with the card ID
      toast.success('Card deleted from the database.');
    })
    .catch((err) => {
      console.error('Error deleting card from the database:', err);
      toast.error('Error deleting card from the database. Please try again.');
    });
};


