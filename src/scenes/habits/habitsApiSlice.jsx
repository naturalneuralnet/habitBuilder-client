import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

// import api slice
import { apiSlice } from "state/apiSlice";

// enitity adapter to create normalized state, an array of ids and enitities.
const habitsAdapter = createEntityAdapter({});

const initialState = habitsAdapter.getInitialState();

// inject the endpoint into the api slice
//Adapted from Dave Grey's Tutorial: https://github.com/gitdagray/mern_stack_course
export const habitsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /// already got the base query inside the api
    getHabits: builder.query({
      query: ({ id }) => ({
        url: `/habits/${id}`,
        params: id,
      }),
      /// validate the status becuase their api is tricky
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      /// only in developlment, or 60s in prod.
      /// takes the Habit._id and transforms it to Habit.id so it works with
      // the redux toolkit enitity adapter and mongo db's convention of referring to the id as _id
      /// so we can use the normalized data
      transformResponse: (responseData) => {
        const loadedhabits = responseData.map((habit) => {
          habit.id = habit._id;
          console.log(habit);
          return habit;
        });
        console.log(loadedhabits);
        /// sets all of the habits using the habits adapter. so the data is normalized
        return habitsAdapter.setAll(initialState, loadedhabits);
      },
      providesTags: (result, error, arg) => {
        // you might get a result that doesn't have ids
        // this checks if it has ids and if it doesnt it will reurn the else
        // which is just the Habit and the id List
        console.log(result);
        if (result?.ids) {
          return [
            { type: "Habit", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Habit", id })),
          ];
        } else return [{ type: "Habit", id: "LIST" }];
      },
    }),
    getAllHabits: builder.query({
      query: () => `/habits/all`,
      /// validate the status becuase their api is tricky
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      /// only in developlment, or 60s in prod.
      /// takes the Habit._id and transforms it to Habit.id so it works with
      // the redux toolkit enitity adapter and mongo db's convention of referring to the id as _id
      /// so we can use the normalized data
      transformResponse: (responseData) => {
        const loadedhabits = responseData.map((habit) => {
          habit.id = habit._id;
          //console.log(habit);
          return habit;
        });
        //console.log(loadedhabits);
        /// sets all of the habits using the habits adapter. so the data is normalized
        return habitsAdapter.setAll(initialState, loadedhabits);
      },
      providesTags: (result, error, arg) => {
        // you might get a result that doesn't have ids
        // this checks if it has ids and if it doesnt it will reurn the else
        // which is just the Habit and the id List
        //console.log(result);
        if (result?.ids) {
          return [
            { type: "Habit", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Habit", id })),
          ];
        } else return [{ type: "Habit", id: "LIST" }];
      },
    }),
    // builder.mutation
    // using the post method
    addNewHabit: builder.mutation({
      query: (initialHabitData) => ({
        url: "/habits/new",
        method: "POST",
        body: {
          ...initialHabitData,
        },
      }),
      /// forces the cache to update, invalidates Habit list so it has to be updated
      invalidatesTags: [{ type: "Habit", id: "LIST" }],
    }),
    // using the patch method
    // specify the id of the Habit to invalidate so it focesd to update
    // we had the list and id in the getusesr provides tags
    updateHabit: builder.mutation({
      query: (initialHabitData) => ({
        url: "/habits/update",
        method: "PATCH",
        body: {
          ...initialHabitData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Habit", id: arg.id }],
    }),
    /// just pass in the id to delete
    // invalidating the deleted Habit
    deleteHabit: builder.mutation({
      query: ({ id }) => ({
        url: `/habits/delete`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Habit", id: arg.id }],
    }),
  }),
});

/// exports the hook for us to use
export const {
  useGetAllHabitsQuery,
  useAddNewHabitMutation,
  useUpdateHabitMutation,
  useDeleteHabitMutation,
} = habitsApiSlice;

// returns the query result object, by calling the habitspislice, enpoints, gethabits hook and the select mehtod on that hook

export const selectHabitsResult =
  habitsApiSlice.endpoints.getAllHabits.select();

// creates memoized selector
// pass in selecthabitsResult from above and selects the data part
const selectHabitsData = createSelector(
  selectHabitsResult,
  (habitsResult) => habitsResult.data // normalized state object with ids & entities
);

// this is not exported

//another memoized selector

//getSelectors creates these selectors and we rename them with aliases using destructuring
/// renameing them to apply to habits.
export const {
  selectAll: selectAllHabits,
  selectById: selectHabitById,
  selectIds: selectHabitIds,
  // Pass in a selector that returns the habits slice of state
  // we habits getSlecteros on the habitsAdapter to get the habits data with the memoized selector, if its null it returns the initial state
} = habitsAdapter.getSelectors(
  (state) => selectHabitsData(state) ?? initialState
);
