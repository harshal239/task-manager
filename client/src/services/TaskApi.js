import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TaskApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://task-manager-mern-drivesales.herokuapp.com/api/v1/tasks",
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    tasks: builder.query({
      query: () => "/",
      providesTags: ["Task"],
    }),
    task: builder.query({
      query: (id) => `/${id}`,
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: "/",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...task }) => ({
        url: `/${id}`,
        method: "PUT",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useTasksQuery,
  useTaskQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = TaskApi;
