import api from "./api";

export const getOrderList = (page = 1) =>
  api.get(`/api/orders?page=${page - 1}`).then((response) => response.data);

export const getOrder = (id) =>
  api.get(`/api/orders/${id}`).then((response) => response.data);

export const createOrder = (data) =>
  api.post("/api/orders", data).then((response) => response.data);

export const updateOrder = (id, data) =>
  api.put(`/api/orders/${id}`, data).then((response) => response.data);

export const deleteOrder = (id) =>
  api.delete(`/api/orders/${id}`).then((response) => response.data);
