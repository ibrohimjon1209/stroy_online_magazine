import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Navigate } from "react-router-dom";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

const FlyToOnClick = ({ position }) => {
  const map = useMap();
  map.flyTo(position, 13);
  return null;
};

const MapPage = ({
  active,
  set_active,
  addresses_list,
  set_address_inform,
  set_is_delivery,
}) => {
  const lang = localStorage.getItem("lang");
  const defaultPosition = [40.7836, 72.3501];

  const [selectedAddress, setSelectedAddress] = useState(null);

  const getAddressByLang = (item, lang) => {
    if (lang === "ru") return item.address_ru;
    if (lang === "en") return item.address_en;
    return item.address_uz;
  };

  const getButtonText = (lang) => {
    if (lang === "ru") return "Выбрать это место";
    if (lang === "en") return "Select this place";
    return "Bu yerdan olaman";
  };

  return (
    <div
      className={`${
        active === "map" ? "block" : "hidden"
      } relative max-w-[100%] h-[90vh] sm:h-[86vh] -mb-[200px] sm:mb-2 mx-auto mt-0 sm:mt-6 border border-gray-300 rounded-lg shadow-lg`}
    >
      <MapContainer
        center={defaultPosition}
        zoom={13}
        className="z-0 w-full h-full overflow-hidden rounded-lg"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {addresses_list
          ?.filter((item) => item.latitude && item.longitude)
          .map((item) => {
            const pos = [parseFloat(item.latitude), parseFloat(item.longitude)];

            return (
              <Marker
                key={item.id}
                position={pos}
                icon={customIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedAddress(item);
                  },
                }}
              >
                <Popup>
                  <span className="font-bold text-blue-600">
                    📍 {getAddressByLang(item, lang)}
                  </span>
                </Popup>
                {selectedAddress?.id === item.id && (
                  <FlyToOnClick position={pos} />
                )}
              </Marker>
            );
          })}
      </MapContainer>

      <div className="absolute z-10 p-4 bg-white border border-gray-300 rounded-lg shadow-lg w-72 sm:w-64 bottom-6 right-6">
        {selectedAddress ? (
          <>
            <p className="text-sm text-gray-800">
              <strong>
                {lang == "uz"
                  ? "Manzil:"
                  : lang == "en"
                  ? "Address:"
                  : lang == "ru"
                  ? "Адрес:"
                  : "Manzil:"}
              </strong>{" "}
              {getAddressByLang(selectedAddress, lang)}
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-800">
            {lang == "uz"
              ? "Marker ustiga bosing, ma’lumot chiqadi."
              : lang == "en"
              ? "Click on the marker to see details."
              : lang == "ru"
              ? "Нажмите на маркер, чтобы увидеть детали."
              : "Marker ustiga bosing, ma’lumot chiqadi."}
          </p>
        )}

        <button
          onClick={() => {
            if (selectedAddress) {
              set_address_inform(selectedAddress);
              set_is_delivery(false);
              set_active("address");
            }
          }}
          className={`hover:scale-[102%] active:scale-[99%] duration-300 mt-2 w-full ${
            selectedAddress
              ? "bg-yellow-400 text-black cursor-pointer"
              : "bg-yellow-200 text-black/60 cursor-not-allowed"
          } py-2 rounded-lg font-bold`}
        >
          {getButtonText(lang)}
        </button>
      </div>
    </div>
  );
};

export default MapPage;
