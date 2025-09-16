/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
        credentials: "include"
      }),
      providesTags: ["USER"],
    }),
    blockUser:builder.mutation({
        query: (id) => ({
            url: `/users/block/${id}`,
            method: "PATCH",
            body:{},
            credentials: "include"
        }),
        invalidatesTags: ["USER"],
    }),
    unBlockUser:builder.mutation({
        query: (id) => ({
            url: `/users/unblock/${id}`,
            method: "PATCH",
            body:{},
            credentials: "include"
        }),
        invalidatesTags: ["USER"],
    }),
updateProfile: builder.mutation({
      query: (body: any) => {
        console.log(body)
       return {
         url: `/users/update/rider/me`,
        method: "PATCH",
        data:body,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
       }
      },
      invalidatesTags: ["USER"],
    }),
    deleteUser: builder.mutation({
  query: (id: string) => {
    console.log("delete user id in api", id);
    return {
      url: `/users/delete/${id}`,
      method: "DELETE",
      credentials: "include",
    };
  },
  invalidatesTags: ["USER"],
}),
adminProfileUpdate: builder.mutation({
  query: (body: any) => ({
    url: "/users/admin/update",
    method: "PATCH",
    data:body,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  invalidatesTags: ["USER"],
})
//      login: builder.mutation({
//       query: (body) => ({
//         url: "/auth/login",
//         method: "POST",
//         data: body,
//         credentials: "include"
//       }),
//     }),
//     logout: builder.mutation({
//       query: () => ({
//         url: "/auth/logout",
//         method: "POST",
//       }),
//       invalidatesTags: ["USER"],
//     }),
//     getMe:builder.query({
//         query: () => ({
//             url: "/users/me",
//             method: "GET",
//             credentials: "include"
//         }),
//         providesTags: ["USER"],
//     })
      
  }),
});

export const { useAllUsersQuery,useUpdateProfileMutation,useAdminProfileUpdateMutation,useBlockUserMutation,useUnBlockUserMutation,useDeleteUserMutation} = userApi;