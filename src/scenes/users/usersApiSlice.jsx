import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
// import api slice
import { apiSlice } from "state/apiSlice";

// enitity adapter to create normalized state, an array of ids and enitities.
const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

// inject the endpoint into the api slice
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /// already got the base query inside the api
    getUsers: builder.query({
      query: () => "/users/all",
      /// validate the status becuase their api is tricky
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      /// only in developlment, or 60s in prod.
      /// takes the user._id and transforms it to user.id so it works with
      // the redux toolkit enitity adapter and mongo db's convention of referring to the id as _id
      /// so we can use the normalized data
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        /// sets all of the users using the users adapter. so the data is normalized
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        // you might get a result that doesn't have ids
        // this checks if it has ids and if it doesnt it will reurn the else
        // which is just the user and the id List
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
  }),
});

/// exports the hook for us to use
export const { useGetUsersQuery } = usersApiSlice;

// returns the query result object, by calling the userspislice, enpoints, getusers hook and the select mehtod on that hook
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// creates memoized selector
// pass in selectUsersResult from above and selects the data part
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
);
// this is not exported

//getSelectors creates these selectors and we rename them with aliases using destructuring
/// renameing them to apply to users.
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the users slice of state
  // we users getSlecteros on the usersAdapter to get the users data with the memoized selector, if its null it returns the initial state
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
