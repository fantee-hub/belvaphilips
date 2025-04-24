import httpService from "./axios";

const contactusUrl = "/contact";

export const contactUs = async (data: any) => {
  return httpService.post(contactusUrl, data);
};
