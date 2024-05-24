import axios from "axios";
import * as types from './userActionTypes';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const userRequest = (userData) => ({
    type: types.USER_REQUEST,
    payload: userData,
});

export const userSuccess = (response) => ({
    type: types.USER_SUCCESS,
    payload: response,
});

export const userFailure = (error) => ({
    type: types.USER_FAILURE,
    payload: error,
});

export const userLogOut = () => ({
    type: types.USER_LOG_OUT,
});

export const signUpUser = (userData, history) => (dispatch) => {
    dispatch(userRequest(userData));
    axios.post('http://localhost:9000/user/signup', userData)
        .then((response) => {
            dispatch(userSuccess(response.data));
            toast.success("Kayıt başarılı! Hesabınızı etkinleştirmek için e-postanızı kontrol edin.");
            setTimeout(() => {
                history.goBack();
            }, 5000);
        }).catch((error) => {
            dispatch(userFailure(error.message));
            console.error("Kayıt başarısız oldu", error);
            toast.error("Kayıt başarısız oldu. Lütfen tekrar deneyin.");
        });
};

export const loginUser = (data, history) => {
    return (dispatch) => {
      axios.post("http://localhost:9000/user/login", data)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          dispatch(userSuccess(response.data)); // Başarılı giriş olduğunda userSuccess eylemini gönder
          toast.success("Hoşgeldiniz");
          history.push("/");
        })
        .catch((error) => {
          console.error("Error:", error);
          console.log("Server response:", error.response);
          dispatch(userFailure(error.message)); // Hata durumunda userFailure eylemini gönder
          toast.error("Error occurred: " + error.response.data.message);
        });
    };
  };

  export const logOutUser = (history) => (dispatch) => {
    dispatch(userLogOut());
    localStorage.removeItem('token'); // Remove token from local storage
    history.push("/");
    toast.success("Çıkış başarılı");
};
