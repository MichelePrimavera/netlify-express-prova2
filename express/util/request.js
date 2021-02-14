import axios from 'axios';

const privateRequest = async (path, method = 'GET', data = {}, header = {}, overwritePath = false) => {
  /*const url = overwritePath ? path : `${PRIVATE_API_PATH}${path}`;*/
  /*const token = await storage.get(STORAGE_TOKEN_KEY);*/
  /*const mergedHeader = Object.assign({}, { Authorization: `Bearer ${token}` }, header);*/
  return basicRequest(path, method, data);
};

const basicRequest = (url, method, data) => {
  const requestParams = {
    method,
    url,
    data,
  };
  return axios(requestParams);
};

export {
  privateRequest,
}
