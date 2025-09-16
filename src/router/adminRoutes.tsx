export const adminRoutes = [
  {
    title:"Dashboard",
    items:[
        {
            title:"Analytics",
            url:"/dashboard/analytics",
            Component:<div>Analytics Page</div>
        }
    ]
  },{
    title:"Management",
    items:[
        {
            title:"Users",
            url:"/dashboard/users",
            Component:<div>Users Page</div>
        },
        {
            title:"Drivers",
            url:"/dashboard/drivers",
            Component:<div>Drivers Page</div>
        },
        {
            title:"Rides",
            url:"/dashboard/rides",
            Component:<div>Rides Page</div>
        },
        {
            title:"Payments",
            url:"/dashboard/payments",
            Component:<div>Payments Page</div>
        }
    ]
  }
]