import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const register = ({ email, password }) => async (dispatch) => {
   const options = {
     headers: {
       "Content-Type": "application/json",
     },
   };
   const body = JSON.stringify({ email, password });
 
   try {
     const res = await axios.post("https://my-tasklist21.herokuapp.com/api/user/register", body, options);
 
     dispatch({
       type: "REGISTERED",
       payload: res.data,
     });
     toast.success(`Registered successfully!`)
   } catch (err) {
    const errors = err.response.data.errors;
    if (!errors) {
    toast.error(err.response.data.message);
    } else {
      errors.map((error) => toast.error(error.msg));
    }
   }
 };

export const login = ({ email, password }) => async (dispatch) => {
   const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
  
    try {
      const res = await axios.post("https://my-tasklist21.herokuapp.com/api/user/login", body, options);
  
      dispatch({
        type: "LOGGED_IN",
        payload: res.data,
      });
      toast.success(`Logged in successfully!`)

    } catch (err) {
      const errors = err.response.data.errors;
      if (!errors) {
      toast.error(err.response.data.message);
      } else {
        errors.map((error) => toast.error(error.msg));
      }
    }
};

export const logout = () => {
  toast.success(`Logged out successfully!`)
   return {
      type: "LOGGED_OUT",
   };
 };
