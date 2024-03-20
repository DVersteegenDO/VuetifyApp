import axios from "axios";

const baseDomain = "http://192.168.56.56";
const baseURL = `${baseDomain}/api`;

export default axios.create({
    baseURL
});