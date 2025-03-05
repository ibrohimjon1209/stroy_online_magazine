import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

const MapPage = ({ setSelectedLocation, set_active, active }) => {
  const [position, setPosition] = useState([40.7836, 72.3501]);
  const [address, setAddress] = useState(`Koordinata: ${position[0].toFixed(5)}, ${position[1].toFixed(5)}`);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        setSelectedLocation({ lat, lng });

        setAddress(`Koordinata: ${lat.toFixed(5)}, ${lng.toFixed(5)}`);
      },
    });

    return (
      <Marker position={position} icon={customIcon}>
        <Popup>
          <span className="font-bold text-blue-600">📍 Shu yerdan olib ketaman!</span>
        </Popup>
      </Marker>
    );
  }

  return (
    <div className={`${active === "map" ? "block" : "hidden"} relative max-w-[100%] h-[86vh] mb-2 mx-auto mt-6 border border-gray-300 rounded-lg shadow-lg`}>
      <MapContainer
        center={position}
        zoom={13}
        className="w-full h-full rounded-lg overflow-hidden z-0"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <LocationMarker />
      </MapContainer>

      <div className="absolute bottom-6 right-6 bg-white p-4 shadow-lg rounded-lg w-64 z-10 border border-gray-300">
        <p className="text-gray-800 text-sm">{address}</p>
        <button className="hover:scale-[102%] active:scale-[99%] duration-300 cursor-pointer mt-2 w-full bg-yellow-400 text-black py-2 rounded-lg font-bold">
          Bu yerdan olaman
        </button>
      </div>
    </div>
  );
};

export default MapPage;
