import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query/react';

const BASE_URL = 'https://wellcoach.ddns.net/api';

type TError = {
  data: {
    detail: string;
    code: string;
  };
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = window.localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `JWT ${token}`);
    }
    return headers;
  },
});
const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && (result.error as TError)?.data?.code === 'token_not_valid') {
    console.log('token is not valid');
    const refreshToken = window.localStorage.getItem('refreshToken');
    const { data } = await baseQuery(
      { url: 'auth/jwt/refresh', method: 'POST', body: { refresh: refreshToken } },
      api,
      extraOptions,
    );
    if (data) {
      console.log('new', data);
      window.localStorage.setItem('accessToken', (data as TRefreshResponse).access);
      result = await baseQuery(args, api, extraOptions);
    } else {
      window.localStorage.removeItem('refreshToken');
      window.localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
  }
  return result;
};

export const combinedApi = createApi({
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['dietPlan', 'dietPlanList', 'trainingPlan', 'trainingPlanList'],
  endpoints: () => ({}),
});
