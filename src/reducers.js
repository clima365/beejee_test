import { sortFilters } from "./actions";

const initialState = {
  sortFilter: sortFilters.id,
  todos: [],
  page: 1,
  pagesCount: 1
};

export const todos = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST":
      return {
        sortFilter: action.sortFilter,
        page: action.page,
        todos: action.todos,
        pagesCount: action.pagesCount
      };
    default:
      return state;
  }
};
