import axios from "axios";

const baseURL = process.env.NODE_ENV === "production"
    ? "https://billok.co/api/"
    : "http://127.0.0.1:3000/api/"

export default axios.create({
    baseURL,
});
