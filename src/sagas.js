import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  GET_LIST,
  GET_LIST_ASYNC,
  ADD_TODO_ASYNC,
  EDIT_TODO_ASYNC
} from "./actions";
import { getTodos, addTodo, editTodo } from "./api";

function* fetchListAsync({ page = 1, sortFilter = "id" }) {
  try {
    const data = yield getTodos(page, sortFilter);
    const pagesCount = Math.ceil(data.total_task_count / 3);
    yield put({
      type: GET_LIST,
      todos: data.tasks,
      page,
      sortFilter,
      pagesCount
    });
  } catch (err) {
    console.log("ERROR", err);
  }
}

function* addTodoAsync({ username, text, email, page = 1, sortFilter = "id" }) {
  try {
    yield addTodo({ username, text, email });
    const data = yield getTodos();
    const pagesCount = Math.ceil(data.total_task_count / 3);
    yield put({
      type: GET_LIST,
      todos: data.tasks,
      page,
      sortFilter,
      pagesCount
    });
  } catch (err) {
    console.log("ERROR", err);
  }
}

function* editTodoAsync({ id, text, status }) {
  try {
    yield editTodo({ id, text, status });
  } catch (err) {
    console.log("ERROR", err);
  }
}

function* mySaga() {
  yield takeEvery(GET_LIST_ASYNC, fetchListAsync);
  yield takeEvery(ADD_TODO_ASYNC, addTodoAsync);
  yield takeEvery(EDIT_TODO_ASYNC, editTodoAsync);
}

export default mySaga;
