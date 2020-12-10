import {
  GET_TODOS_FROM_LOCALSTORAGE,
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  CLEAR_TODO,
  SET_FILTER,
} from "./actionTypes";

export const getTodosFromLocalStorage = (todos) => {
  return {
    type: GET_TODOS_FROM_LOCALSTORAGE,
    payload: {
      todos,
    },
  };
};

export const addTodo = (name) => {
  return {
    type: ADD_TODO,
    payload: {
      name,
    },
  };
};

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  };
};

export const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    payload: {
      id,
    },
  };
};

export const clearTodo = () => {
  return {
    type: CLEAR_TODO,
  };
};

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: {
    filter,
  },
});
