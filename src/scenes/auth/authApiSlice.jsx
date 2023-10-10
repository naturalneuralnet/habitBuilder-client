import { apiSlice } from "../../state/apiSlice";

import { logOut, setCredentials } from "./authSlice"; /// then the apiSlice.util.resetApiState() to reset the api state to empty the token /// then you have the refresh mutation which calls /auth/refresh which gets the new access token and sets it as the new credential

// we inject these endpoints into apiSlice
// these reducers are mutations not querys
// the first one passes the credentials to /auth endpoint to login
// the send logout goes to the logout endpoint
/// inside logout the onQueryStarted called inside the mutations
/// accepts an arg, dispatch and qyeryfulfilled which lets you check if the query is fulfilled
/// its async so we can await for it
// const data would be the data recieved from the fulfilled query
/// keeps us from needing to import dispatch as its already there
/// dispatch the logout reducer from authSlice to logout

// Adapted from Dave Grey's Tutorial: https://github.com/gitdagray/mern_stack_course
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /// mutation its POST, passing in credentials

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",

        method: "POST",

        body: { ...credentials },
      }),
    }), /// send logout goes to the logout in backend

    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",

        method: "GET",
      }), /// onQueryStarted called inside the endponitn /// accepts an arg, dispathc and qyeryfulfilled which lets you check if the quey is fulfilled /// its async so we can await for it // const data would be the data recieved from the fulfilled query /// keeps us from needing to import dispatch as its already there

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          console.log(data); /// dispatch the logout reducer, sets token to null

          dispatch(logOut()); /// then the apiSlice . util to reset the api state

          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }), /// get's the refresh token includes the cookie when we send it

    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",

        method: "GET",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          console.log(data);

          const { accessToken } = data;

          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
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

      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;

      //     console.log(data);

      //     // const { accessToken } = data;

      //     // dispatch(setCredentials({ accessToken }));
      //   } catch (err) {
      //     console.log(err);
      //     return;
      //   }
      // },
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useSendLogoutMutation,
  useSignupMutation,
  useVerifyMutation,
} = authApiSlice;
