import Axios from "axios";
import util from "util";

const serverUrl = "https://huqeyhi95c.execute-api.ap-northeast-2.amazonaws.com/prod";

const makeUrl = (url, params) => {
  var result = serverUrl + url;
  if (params === null) return result;
  params.forEach((param) => {
    result = util.format(result, param);
  });
  return result;
};

const httpExec = (method, url, data) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: method,
      url: url,
      data: data,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.message.includes("401")) {
          alert("로그인이 만료되었습니다. 다시 로그인해주세요");
        }
        reject(error);
      });
  });
};

const httpGet = (url, params, data) => {
  return httpExec("GET", makeUrl(url, params), data);
};

const httpPut = (url, params, data) => {
  return httpExec("PUT", makeUrl(url, params), data);
};

const httpPost = (url, params, data) => {
  return httpExec("POST", makeUrl(url, params), data);
};

const httpUrl = {
};

export {
  serverUrl,
  httpExec,
  makeUrl,
  httpGet,
  httpUrl,
  httpPut,
  httpPost,
};
