import httpService from "./axios";

const contactusUrl = "/contact";

/** ADMIN */
const adminLoginUrl = "/admin/login";
const getAdminUserUrl = "/admin/get_users";
const createPostUrl = "/admin/posts";

/** General url */
const getAllPostsUrl = "/posts";
const getAllDraftsUrl = "/posts/drafts";
const getPostByIdUrl = "/posts";

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
