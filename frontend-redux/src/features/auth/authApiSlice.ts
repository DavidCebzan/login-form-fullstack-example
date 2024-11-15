import { apiSlice } from "../../app/api/apiSlice";

type AuthApiResponse = {
  roles: number[];
  accessToken: string;
};

type AuthApiInput = {
  user: string;
  pwd: string;
};

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthApiResponse, AuthApiInput>({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
