export const ADD_TODO_ASYNC = "ADD_TODO_ASYNC";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const EDIT_TODO_ASYNC = "EDIT_TODO_ASYNC";
export const GET_LIST = "GET_LIST";
export const GET_LIST_ASYNC = "GET_LIST_ASYNC";

export const sortFilters = {
  id: "id",
  email: "email",
  username: "username",
  status: "status"
};

export const addTodo = ({ text, email, username }) => {
  return { type: ADD_TODO_ASYNC, text, username, email };
};

export const toggleTodo = ({ id, status }) => {
  return { type: TOGGLE_TODO, id, status };
};

export const editTodo = ({ id, text, status }) => {
  return { type: EDIT_TODO_ASYNC, id, text, status };
};

export const getList = ({ page = 1, sortFilter = sortFilters.id }) => {
  return { type: GET_LIST_ASYNC, page, sortFilter };
};
