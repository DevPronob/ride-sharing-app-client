import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        data: body,
        credentials: "include"
      }),
      invalidatesTags: ["USER"],
      
    }),
     login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        data: body,
        credentials: "include"
      }),
      invalidatesTags: ["USER"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    getMe:builder.query({
        query: () => ({
            url: "/users/me",
            method: "GET",
            credentials: "include"
        }),
        providesTags: ["USER"],
    })
      
  }),
});

export const { useRegisterMutation,useLoginMutation,useGetMeQuery,useLogoutMutation } = authApi;