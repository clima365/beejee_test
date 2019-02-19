const FormData = require("form-data");
const md5 = require("blueimp-md5");

const BASE_URL = "https://uxcandy.com/~shapoval/test-task-backend";

export const getTodos = async (page = 1, sortFilter = "id") => {
  const url = `${BASE_URL}/?developer=kirill_clim&page=${page}&sort_field=${sortFilter}`;
  try {
    const res = await fetch(url, {
      method: "GET"
    });

    const data = await res.text();
    const parsedData = JSON.parse(data);
    return parsedData.message;
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const addTodo = async ({ text, email, username }) => {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("text", text);

    const res = await fetch(`${BASE_URL}/create?developer=kirill_clim`, {
      method: "POST",
      body: formData
    });

    const data = await res.text();
    return data;
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const editTodo = async ({ id, text, status }) => {
  try {
    const params = [];
    text && params.push(["text", text]);
    typeof status === "number" && params.push(["status", status]);
    params.sort(function(a, b) {
      return a[1] - b[1];
    });
    params.push(["token", "beejee"]);
    const encodedParams = params.map((item, i) => {
      return `${encodeURIComponent(item[0])}=${encodeURIComponent(item[1])}`;
    });
    const hashString = md5(encodedParams.join("&"));
    params.push(["signature", hashString]);
    const formData = new FormData();
    params.forEach(item => {
      formData.append(item[0], item[1]);
    });
    const res = await fetch(`${BASE_URL}/edit/${id}?developer=kirill_clim`, {
      method: "POST",
      body: formData
    });

    const data = await res.text();
    return data;
  } catch (err) {
    console.log("ERROR", err);
  }
};
