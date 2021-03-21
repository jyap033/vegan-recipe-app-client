import axios from "axios";

export default axios.create({
  baseURL: "https://vegan-recipe-app.herokuapp.com/api",
  
  headers: {
    "Content-type": "application/json"
  }
});