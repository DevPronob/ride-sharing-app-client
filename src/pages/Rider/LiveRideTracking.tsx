import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import io, { Socket } from "socket.io-client";
import { useGetActiveRideQuery } from "@/redux/features/ride/ride.api";

const carIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
});

interface Location {
  lat: number;
  lng: number;
}

// Helper component to recenter map when driver moves
function Recenter({ location }: { location: Location }) {
  const map = useMap();
  useEffect(() => {
    map.setView([location.lat, location.lng], 15);
  }, [location, map]);
  return null;
}

export default function LiveRideTracking() {
  const { data } = useGetActiveRideQuery(undefined);
  const rideId = data?.data?._id;
  const [driverLocation, setDriverLocation] = useState<Location | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  // connect socket once
  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // join ride room + listen to events
  useEffect(() => {
    if (!rideId || !socket) return;

    // ✅ matches backend
    socket.emit("joinRoom", rideId);

    // ✅ matches backend
    socket.on("driverLocationUpdate", (location: Location) => {
      console.log("Driver location update:", location);
      setDriverLocation(location);
    });

    // ✅ matches backend
    socket.on("rideEnded", (msg) => {
      alert(msg.message);
      setDriverLocation(null);
    });

    return () => {
      socket.off("driverLocationUpdate");
      socket.off("rideEnded");
    };
  }, [rideId, socket]);

  if (!driverLocation) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        Waiting for driver location...
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] rounded-xl shadow-lg overflow-hidden">
      <MapContainer
        center={[driverLocation.lat, driverLocation.lng]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker icon={carIcon} position={[driverLocation.lat, driverLocation.lng]} />
        <Recenter location={driverLocation} />
      </MapContainer>
    </div>
  );
}
