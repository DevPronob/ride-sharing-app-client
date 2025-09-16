import { baseApi } from "@/redux/baseApi";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🚖 Create a Ride Request
    rideRequest: builder.mutation({
  query: (body) => {
    return {
     url: "/rides/request",
    method: "POST",
   data: body,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    };
  },
  invalidatesTags: ["RIDE"],
}),

    acceptRide: builder.mutation({
      query: (id) => ({
        url: `/rides/${id}/accept`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["RIDE"],
    }),

     rideHistoryByDriver: builder.query({
  query: (params = {}) => ({
    url: "/rides/driver/history",
    method: "GET",
    params,           // Axios handles query string automatically
    withCredentials: true,
    headers: {
    "Content-Type": "application/json",
  },
     // for cookies/session
  }),
  providesTags: ["RIDE"],
}),
     getRideAnalytics: builder.query({
  query: (params = {}) => ({
    url: "/rides/analytics",
    method: "GET",
    params,           // Axios handles query string automatically
    withCredentials: true,
    headers: {
    "Content-Type": "application/json",
  },
     // for cookies/session
  }),
  providesTags: ["RIDE"],
}),
     rideHistoryByRider: builder.query({
  query: (params = {}) => ({
    url: "/rides/history/rider",
    method: "GET",
    params,           // Axios handles query string automatically
    withCredentials: true,
    headers: {
    "Content-Type": "application/json",
  },
     // for cookies/session
  }),
  providesTags: ["RIDE"],
}),

getActiveRidesByDriver: builder.query({
  query: (params = {}) => ({
    url: "/rides/driver/active",
    method: "GET",
    params,           // Axios handles query string automatically
    withCredentials: true,
    headers: {
    "Content-Type": "application/json",
  },
     // for cookies/session
  }),
  providesTags: ["RIDE"],
}),

changeStatus: builder.mutation({
  query: ({ id, body }) => ({
    url: `/rides/${id}/status`,
    method: "PATCH", // or PUT, if your backend expects that
    data: body,      // axios uses 'data' instead of 'body'
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  invalidatesTags: ["RIDE"],
}),

getActiveRide :builder.query({
  query: (params = {}) => ({
    url: "/rides/rider-active-ride",
    method: "GET",
    params,           // Axios handles query string automatically
    withCredentials: true,
    headers: {
    "Content-Type": "application/json",
  },
     // for cookies/session
  }),
  providesTags: ["RIDE"],
}),


    // 📜 Get All Rides with Filters
    getAllRides: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        return {
          url: `/rides?${queryParams}`,
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      providesTags: ["RIDE"],
    }),
  }),
});

export const {
  useRideRequestMutation,
  useGetAllRidesQuery,
  useAcceptRideMutation,
  useRideHistoryByDriverQuery,
  useGetActiveRidesByDriverQuery,
  useChangeStatusMutation,
  useRideHistoryByRiderQuery,
  useGetRideAnalyticsQuery,
  useGetActiveRideQuery 
} = rideApi;
