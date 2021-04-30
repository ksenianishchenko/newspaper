import axios from "axios";

export default axios.create({
  baseURL: `https://peaceful-sands-24474.herokuapp.com/`
});

//export default axios.create({
  //baseURL: `http://localhost:3000/`
//});