import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blogObject, config);
  return response.data;
};

const update = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/${blogObject.id}`,
    blogObject,
    config
  );
  return response.data;
};

const comment = async (blogObject) => {
  const response = await axios.post(
    `${baseUrl}/${blogObject.id}/comments`,
    blogObject
  );
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.data;
};

export default { getAll, setToken, create, update, comment, remove };
