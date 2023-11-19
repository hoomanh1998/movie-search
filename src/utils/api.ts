import { API_KEY } from "./constant";

export const createURL = (url: string, params?: object): string => {
  return `${url}?${new URLSearchParams({
    apikey: API_KEY,
    ...params,
  }).toString()}`;
};

export const getData = async (url: string, params?: object) => {
  try {
    const result = await fetch(createURL(url, params)).then((res) =>
      res.json()
    );
    if (result.Response === "False") {
      throw new Error(result.Error);
    } else {
      return result;
    }
  } catch (error) {
    throw error;
  }
};

export const postData = async (url: string, data: object) => {
  try {
    const result = await fetch(createURL(url), {
      method: "POST",
      body: JSON.stringify(data),
    });
    return result.json();
  } catch (error) {
    throw error;
  }
};
