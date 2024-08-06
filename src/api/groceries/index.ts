import {axiosOrigin} from 'api/config/axios-instances';
import {ENDPOINTS} from 'api/endpoints';
import {AxiosResponse} from 'axios';
import {Grocery} from 'types/groceries';

export type GroceriesApiResponse = {
  data: Grocery[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
};

type GroceriesQuery = {
  page: unknown;
  per_page: unknown;
};

export const getGroceries = async ({
  page = 1,
  per_page = 10,
}: GroceriesQuery) => {
  const response: AxiosResponse<GroceriesApiResponse> = await axiosOrigin.get(
    `${ENDPOINTS.GROCERIES}?_page=${page}&_per_page=${per_page}`,
  );
  return response.data;
};

export const updateGrocery = async (data: Grocery) => {
  const response: AxiosResponse<GroceriesApiResponse> = await axiosOrigin.put(
    `${ENDPOINTS.GROCERIES}/${data.id}`,
    {
      ...data,
    },
  );
  return response.data;
};

export const addGrocery = async (data: Grocery) => {
  const response: AxiosResponse<GroceriesApiResponse> = await axiosOrigin.post(
    `${ENDPOINTS.GROCERIES}`,
    {
      ...data,
    },
  );
  return response.data;
};

export const deleteGrocery = async (groceryId: string) => {
  const response: AxiosResponse<GroceriesApiResponse> =
    await axiosOrigin.delete(`${ENDPOINTS.GROCERIES}/${groceryId}`);
  return response.data;
};
