import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    driverRegister: builder.mutation({
      query: (body) => ({
        url: "/drivers/create",
        method: "POST",
        data: body,
        credentials: "include",
      }),
      invalidatesTags: ["DRIVER"],
    }),
    // getDriverById: builder.mutation({
    //   query: (body) => {
    //     return {
    //       url: `/users/update/rider/me`,
    //       method: "PATCH",
    //       data: body,
    //       credentials: "include",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     };
    //   },
    // }),
    getEarnings: builder.query({
      query: () => ({
        url: "/drivers/earnings",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["DRIVER"],
    }),
    changeAvailablity: builder.mutation({
      query: () => ({
        url: "/drivers/availablity",
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["DRIVER"],
    }),
    updateDriver: builder.mutation({
      query: (body) => ({
        url: `/drivers/update`,
        method: "PATCH",
        data:body,
        credentials: "include",
         headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["DRIVER"],
    }),
    getDrivers: builder.query({
      query: () => ({
        url: "/drivers",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["DRIVER"],
    }),
  
    getDriverById: builder.query({
      query: (id) => {
        console.log("driver id in api", id);
        return {
          url: `/drivers/${id}`,
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      providesTags: ["DRIVER"],
    }),

    approveDriver: builder.mutation({
      query: (id) => ({
        url: `/drivers/approve/${id}`,
        method: "PATCH",
        body: {},
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["DRIVER"],
    }),
    suspandDriver: builder.mutation({
      query: (id) => ({
        url: `/drivers/suspend/${id}`,
        method: "PATCH",
        body: {},
        credentials: "include",
      }),
      invalidatesTags: ["DRIVER"],
    }),
    // getMe:builder.query({
    //     query: () => ({
    //         url: "/users/me",
    //         method: "GET",
    //         credentials: "include"
    //     }),
    //     providesTags: ["USER"],
    // })
  }),
});

export const {
  useDriverRegisterMutation,
  useGetDriversQuery,
  useGetEarningsQuery,
  useApproveDriverMutation,
  useSuspandDriverMutation,
  useGetDriverByIdQuery,
  useChangeAvailablityMutation,
  useUpdateDriverMutation
} = driverApi;
