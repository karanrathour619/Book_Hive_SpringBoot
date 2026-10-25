import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/books`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const booksApi2 = createApi({
  reducerPath: "bookApi",
  baseQuery,
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    fetchAllBooks: builder.query({
      query: () => "",
      providesTags: ["Books"],
    }),

    fetchBookById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),

    // ✅ Modified: supports FormData for image upload
    addBook: builder.mutation({
      query: (formData) => ({
        url: `/create-book`,
        method: "POST",
        body: formData, // can be FormData or JSON
      }),
      invalidatesTags: ["Books"],
    }),

    // ✅ Modified: remove fixed JSON headers → allow FormData for updates too
    updateBook: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: formData, // works for JSON or FormData
      }),
      invalidatesTags: ["Books"],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useFetchAllBooksQuery,
  useFetchBookByIdQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = booksApi2;

export default booksApi2;
