import {
  GET_TODOS_FROM_LOCALSTORAGE,
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  CLEAR_TODO,
} from "../actionTypes";

let todoId = 0;

const initialState = {
  todos: [],
};

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS_FROM_LOCALSTORAGE: {
      return {
        todos: action.payload.todos,
      };
    }
    case ADD_TODO: {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: todoId++,
            name: action.payload.name,
            completed: false,
          },
        ],
      };
    }
    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }
    case TOGGLE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }
          return todo;
        }),
      };
    }
    case CLEAR_TODO: {
      return {
        todos: [],
      };
    }
    default: {
      return state;
    }
  }
}
