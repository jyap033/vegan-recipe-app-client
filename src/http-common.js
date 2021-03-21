import axios from "axios";

export default axios.create({
  baseURL: "https://vegan-recipe-app.herokuapp.com/api",

  headers: {
    "Content-type": "application/json",
    withCredentials: false,
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }}
});