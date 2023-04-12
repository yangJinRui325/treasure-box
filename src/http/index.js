import axios from "axios";

let http = axios.create({
  // baseURL: "https://api.virapi.com/vir_github128d7dah9d253/treasure-box",
  headers: {
    "app-token": "$2a$10$bcRTC/KVsAMaHMFU1JHw4OdK1CuTaDL5hxMrlZ.g2Otx0.xVIpxqi",
  },
});
const baseURL = "https://api.virapi.com/vir_github128d7dah9d253/treasure-box";

http.interceptors.request.use(
  (config) => {
    console.log(config);
    if (!config.url.startsWith("/mock")) {
      config.url = baseURL + config.url;
    }
    return config;
  },
  (err) => {
    console.log(err);
  }
);

http.interceptors.response.use(
  (res) => {
    const response = res.data;
    const { code, data, message } = response;
    if (code === 200) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(message);
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default http;
