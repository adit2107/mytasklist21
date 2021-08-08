import axios from "axios";
import setToken from "../../helpers/setJwtToken";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const getTodos = () => async (dispatch) => {
  if (localStorage.token) setToken(localStorage.token);

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get("/api/todos", options);
    dispatch({
      type: "GET_TODOS",
      payload: res.data,
      isLoading: false
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (!errors) {
    toast.error(err.response.data.message);
    } else {
      errors.map((error) => toast.error(error.msg));
    }
  }
};

export const createTodo =
  ({ task }) =>
  async (dispatch) => {
    if (localStorage.token) setToken(localStorage.token);

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ task });

    try {
      const res = await axios.post("/api/todos", body, options);

      dispatch({
        type: "CREATED_TODO",
        payload: res.data,
      });
      toast.info(`Added a new task!`)
    } catch (err) {
      const errors = err.response.data.errors;
      if (!errors) {
      toast.error(err.response.data.message);
      } else {
        errors.map((error) => toast.error(error.msg));
      }
    }
  };

export const editTodo =
  ( todoId, value ) =>
  async (dispatch) => {
    if (localStorage.token) setToken(localStorage.token);

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ task: value });
    try {
      const res = await axios.put(
        `/api/todo/${todoId}`,
        body,
        options
      );

      dispatch({
        type: "UPDATED_TODO",
        payload: res.data,
      });

    } catch (err) {
      const errors = err.response.data.errors;
      if (!errors) {
      toast.error(err.response.data.message);
      } else {
        errors.map((error) => toast.error(error.msg));
      }
    }
  };

export const completeTodo =
  (todoId, value) =>
  async (dispatch) => {
    if (localStorage.token) setToken(localStorage.token);

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ completed: !value });
    try {
      const res = await axios.put(
        `/api/todo/complete/${todoId}`,
        body,
        options
      );

      dispatch({
        type: "COMPLETED_TODO",
        payload: res.data,
      });
      toast.info(`Marked task as complete`);

    } catch (err) {
      const errors = err.response.data.errors;
      if (!errors) {
      toast.error(err.response.data.message);
      } else {
        errors.map((error) => toast.error(error.msg));
      }
    }
  };

export const deleteTodo =
  ( todoId ) =>
  async (dispatch) => {
    if (localStorage.token) setToken(localStorage.token);

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.delete(
        `/api/todo/${todoId}`,
        options
      );

      dispatch({
        type: "DELETED_TODO",
        payload: res.data,
      });
      toast.info(`Deleted task successfully!`)

    } catch (err) {
      console.log(err)
      const errors = err.response.data.errors;
      if (!errors) {
      toast.error(err.response.data.message);
      } else {
        errors.map((error) => toast.error(error.msg));
      }
    }
  };

export const setTodos = (todos) => async (dispatch) => {
  if (localStorage.token) setToken(localStorage.token);
  console.log(todos)
  try {
    dispatch({
      type: "SET_ORDER",
      payload: todos
    })
  } catch (err) {
    const errors = err.response.data.errors;
    if (!errors) {
    toast.error(err.response.data.message);
    } else {
      errors.map((error) => toast.error(error.msg));
    }
  }
}
