import { apiRequest } from './apiRequest';

export const singlePageLoader = async ({ request, params }) => {
  const { data } = await apiRequest(`/posts/${params.id}`);

  return data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split('?')[1];

  const { data } = await apiRequest(`/posts?${query}`);

  return data;
};
