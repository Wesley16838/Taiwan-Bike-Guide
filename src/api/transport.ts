import axios from "axios";
import { getAuthorizationHeader } from './helper'
export default axios.create({
    baseURL: 'https://ptx.transportdata.tw/MOTC/v2',
    responseType: "json",
    headers: getAuthorizationHeader()
  });
    