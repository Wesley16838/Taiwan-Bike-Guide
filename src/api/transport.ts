import axios from "axios";
export default axios.create({
    baseURL: 'https://tdx.transportdata.tw/api/basic/v2',
    responseType: "json",
  });
    