/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { io, type Socket } from "socket.io-client";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useGetActiveRidesByDriverQuery } from "@/redux/features/ride/ride.api";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet icons
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

interface Location {
  lat: number;
  lng: number;
}

const DriverTracking = () => {
  const { data } = useGetActiveRidesByDriverQuery(undefined);
  const rideId = data?.data?._id;

  const [location, setLocation] = useState<Location | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // Initialize socket and join ride room
  useEffect(() => {
    if (!rideId) return;

    const socket = io("http://localhost:5000", {
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
      socket.emit("joiedRoom", rideId);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });

    socket.on("rideEnded", (data) => {
      alert(data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [rideId]);

  // Send driver location periodically
  useEffect(() => {
    if (!rideId || !socketRef.current) return;

    const sendLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setLocation(loc);
            socketRef.current?.emit("sendDriverLocation", rideId, loc);
          },
          (err) => console.error("Geolocation error:", err),
          { enableHighAccuracy: true }
        );
      }
    };

    sendLocation();
    const interval = setInterval(sendLocation, 3000);

    return () => clearInterval(interval);
  }, [rideId]);

  const handleEndRide = () => {
    socketRef.current?.emit("endRide", rideId);
  };

  return (
    <div className="h-screen w-full flex flex-col relative z-10">
      <div className="flex-1">
        {location ? (
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[location.lat, location.lng]} />
          </MapContainer>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            Loading map...
          </div>
        )}
      </div>
      <button
        onClick={handleEndRide}
        className="p-3 bg-red-500 text-white font-bold"
      >
        End Ride
      </button>
    </div>
  );
};

export default DriverTracking;
