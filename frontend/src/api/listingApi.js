import api from "./apiClient";

export const getMyListings = async () => {
  const response = await api.get("/listings/my");
  return response.data.data;
};

export const getAllListings = async () => {
  const response = await api.get("/listings");
  return response.data.data;
};

export const getListingById = async (id) => {
  const response = await api.get(`/listings/${id}`);
  return response.data.data;
};

export const deleteListing = async (id) => {
  const response = await api.delete(`/listings/${id}`);
  return response.data;
};

export const createListing = async (formData) => {
  const response = await api.post(
    "/listings",
    formData,
    {
      headers:{
        "Content-Type":"multipart/form-data",
      },
    }
  );

  return response.data;
};