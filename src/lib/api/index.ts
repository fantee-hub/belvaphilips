import httpService from "./axios";

const contactusUrl = "/contact";

/** ADMIN */
const adminLoginUrl = "/admin/login";

export const contactUs = async (data: any) => {
  return httpService.post(contactusUrl, data);
};

/** ADMIN */

export const adminLogin = async (data: any) => {
  return httpService.post(adminLoginUrl, data);
};
