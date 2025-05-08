import httpService from "./axios";

const contactusUrl = "/contact";

/** ADMIN */
const adminLoginUrl = "/admin/login";
const getAdminUserUrl = "/admin/get_users";
const createPostUrl = "/posts";

/** General url */
const getAllPostsUrl = "/posts";
const getAllDraftsUrl = "/posts/drafts";
const getPostByIdUrl = "/posts";
const deletePostUrl = "/posts";

/** ORDERS */
const getOrdersUrl = "/orders";
const getOrdersByUserUrl = "/orders/user";

export const contactUs = async (data: any) => {
  return httpService.post(contactusUrl, data);
};

/** ADMIN */

export const adminLogin = async (data: any) => {
  return httpService.post(adminLoginUrl, data);
};

export const getAdminUser = async (
  page: string | number,
  limit: string | number
) => {
  return httpService.get(getAdminUserUrl, { params: { page, limit } });
};

export const createPost = async (data: any) => {
  return httpService.post(createPostUrl, data);
};

export const deletePost = async (id: string | number) => {
  return httpService.delete(`${deletePostUrl}/${id}`);
};

export const getAllPosts = async (
  page: string | number,
  limit: string | number
) => {
  return httpService.get(getAllPostsUrl, { params: { page, limit } });
};

export const getAllDrafts = async (
  page: string | number,
  limit: string | number
) => {
  return httpService.get(getAllDraftsUrl, { params: { page, limit } });
};

export const getPostById = async (id: string | number) => {
  return httpService.get(`${getPostByIdUrl}/${id}`);
};

/** ORDERS */
export const getOrders = async (
  page: string | number,
  limit: string | number
) => {
  return httpService.get(getOrdersUrl, { params: { page, limit } });
};

export const getOrdersByStatus = async (
  page: string | number,
  limit: string | number,
  status: string
) => {
  return httpService.get(getOrdersUrl, {
    params: { page, limit, status },
  });
};

export const createOrder = async (data: any) => {
  return httpService.post(getOrdersUrl, data);
};

export const getOrdersByUser = async (userId: string | number) => {
  return httpService.get(`${getOrdersByUserUrl}/${userId}`);
};

export const getOrdersById = async (id: string | number) => {
  return httpService.get(`${getOrdersUrl}/${id}`);
};

export const upDateStatusOfOrder = async (id: string | number, data: any) => {
  return httpService.put(`${getOrdersUrl}/${id}/status`, data);
};
