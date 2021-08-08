const initialState = {
  todos: [],
  task: '',
  completed: false,
  isLoading: true
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload.data.todos,
        isLoading: action.payload.data.todos ? false : true
      };
    case "CREATED_TODO":
      return {
        ...state,
        task: action.payload.data.todo.task
      };
    case "UPDATED_TODO":
      return {
        ...state,
      };
    case "COMPLETED_TODO":
      return {
        ...state,
      };
    case "DELETED_TODO":
      return {
        ...state,
      };
    case "SET_ORDER": 
      return {
        ...state,
        todos: action.payload
      }
    default:
      return state;
  }
};

export default userReducer;
