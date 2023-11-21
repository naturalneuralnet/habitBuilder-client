import { apiSlice } from "../../state/apiSlice";

import { logOut, setCredentials } from "./authSlice";

// Adapted from Dave Grey's Tutorial: https://github.com/gitdagray/mern_stack_course
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",

        method: "POST",

        body: { ...credentials },
      }),
    }),

    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",

        method: "GET",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(logOut());

          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),

    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",

        method: "GET",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const { accessToken } = data;

          dispatch(setCredentials({ accessToken }));
        } catch (err) {}
      },
    }),

    signup: builder.mutation({
      /// takes in the new users credentials and signs them up
      query: (credentials) => ({
        url: "/auth/signup",

        method: "POST",

        body: { ...credentials },
      }),
    }),

    verify: builder.mutation({
      /// takes in the new users credentials and signs them up
      query: (confirmationCode) => ({
        url: `/auth/verify/${confirmationCode}`,

        method: "POST",
        body: { ...confirmationCode },
      }),
    }),

    guest: builder.mutation({
      query: (credentials) => ({
        url: "/auth/guest",

        method: "POST",

        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useSendLogoutMutation,
  useSignupMutation,
  useVerifyMutation,
  useGuestMutation,
} = authApiSlice;
