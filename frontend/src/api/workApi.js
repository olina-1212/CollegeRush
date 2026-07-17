import api from "./apiClient";


export const createWorkPost = async (data) => {
  const res = await api.post(
    "/workposts",
    data
  );

  return res.data;
};


export const getWorkPosts = async () => {
  const res = await api.get(
    "/workposts"
  );

  return res.data;
};


export const deleteWorkPost = async (id) => {
  const res = await api.delete(
    `/workposts/${id}`
  );

  return res.data;
};