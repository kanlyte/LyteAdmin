import axios from "axios";

// const url = "http://127.0.0.1:8000"; //local
const url = "https://api.lyte.kanlyte.com"; //cloud

export default class FormsApi {
  //post requests
  async post(i, data) {
    try {
      const res = await axios.post(`${url}${i}`, data);
      return res.data;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }

  //get methods
  async get(i) {
    try {
      const res = await axios.get(`${url}${i}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }

  async put(i, data) {
    try {
      const res = await axios.put(`${url}${i}`, data);
      return res.data;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  }

  //delete requests
  async deleteItem(i) {
    try {
      const res = await axios.delete(`${url}${i}`);
      return res.data;
    } catch (error) {
      return "Error";
    }
  }
}
