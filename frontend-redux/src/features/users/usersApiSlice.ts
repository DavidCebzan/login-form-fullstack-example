import { apiSlice } from "../../app/api/apiSlice";

type UsersApiResponse = {
  username: string;
  roles: number[];
  _id: string;
};

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersApiResponse[], void>({
      query: () => "/users",
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
