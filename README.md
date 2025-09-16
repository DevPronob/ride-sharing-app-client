# 🚖 Ride Booking System – Frontend

A fully responsive, role-based frontend for the Ride Booking Platform (like Uber/Pathao), built with **React, Redux Toolkit, and RTK Query**.  
It connects to the backend API for Riders, Drivers, and Admins with tailored dashboards and smooth UI/UX.

---

## 🔹 Features

### Public Pages
- Landing/Homepage with Hero, How It Works, Features, Testimonials, FAQ, Contact
- About Us & Service Overview

### Authentication
- JWT-based login & registration (Rider/Driver/Admin)
- Persistent login state  
- Blocked/Suspended users redirected to status page  
- Logout functionality  

### Rider Dashboard
- Request ride with pickup & destination  
- Cancel ride (if not accepted)  
- Live ride tracking (map + driver details)  
- Ride history with filters  
- Profile management (edit info, change password)  

### Driver Dashboard
- Online/Offline availability toggle  
- Accept/Reject incoming ride requests  
- Manage active rides (status updates: Accepted → Picked Up → Completed)  
- Earnings dashboard with charts  
- Ride history with filters  
- Profile & vehicle details management  

### Admin Dashboard
- Approve/suspend drivers  
- Block/unblock users  
- View all rides with search & filters  
- Analytics dashboard with charts (revenue, ride volume, activity)  

### Enhancements
- Responsive design (mobile-first, tablet, desktop)  
- Charts via **recharts**  
- Notifications via **react-hot-toast**  
- SOS/Emergency button during rides (share live location via SMS/WhatsApp/Email)  
- Skeleton loaders & lazy loading for performance  

---

## 🔹 Tech Stack

- **React + TypeScript**  
- **Redux Toolkit + RTK Query** (state & API management)  
- **Tailwind CSS** (styling)  
- **Recharts** (data visualization)  
- **React-Hot-Toast** (notifications)  
- **Leaflet / Geolocation API** (maps & tracking)  

---

## 🔹 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/your-username/ride-booking-frontend.git
cd ride-booking-frontend

# Install dependencies
npm install

# Start development server
npm run dev
