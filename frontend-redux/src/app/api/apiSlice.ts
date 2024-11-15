/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  resetCredentials,
  setCredentials,
} from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  //send back out http only secure cookie with each request
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    // send the auth token with every request
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions = {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  // 403 forbidden if we send an access token that is expired;
  if (
    result?.error?.status === "PARSING_ERROR" &&
    result.error.originalStatus === 403
  ) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);

    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = (api.getState() as RootState).auth.user;

      const typedResponse = refreshResult.data as {
        accessToken: string;
        roles: number[];
      };

      //store the new token
      api.dispatch(
        setCredentials({ user: user, token: typedResponse.accessToken })
      );
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(resetCredentials());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
