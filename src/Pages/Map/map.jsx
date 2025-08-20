"use client"

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
})

const FlyToOnClick = ({ position }) => {
  const map = useMap()
  map.flyTo(position, 15) // Increased zoom level for better focus
  return null
}

const OptimizedMapPage = ({ active, set_active, addresses_list, set_address_inform, set_is_delivery }) => {
  const lang = localStorage.getItem("lang")
  const defaultPosition = [40.7836, 72.3501]

  const [selectedAddress, setSelectedAddress] = useState(null)
  const [initialPosition, setInitialPosition] = useState(defaultPosition)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [mapBounds, setMapBounds] = useState(null) // Added bounds for optimized loading

  useEffect(() => {
    if (addresses_list && addresses_list.length > 0) {
      const validAddresses = addresses_list.filter((item) => item.latitude && item.longitude)

      if (validAddresses.length > 0) {
        const latitudes = validAddresses.map((addr) => Number.parseFloat(addr.latitude))
        const longitudes = validAddresses.map((addr) => Number.parseFloat(addr.longitude))

        const minLat = Math.min(...latitudes)
        const maxLat = Math.max(...latitudes)
        const minLng = Math.min(...longitudes)
        const maxLng = Math.max(...longitudes)

        // Add small padding to bounds
        const padding = 0.01
        const bounds = [
          [minLat - padding, minLng - padding],
          [maxLat + padding, maxLng + padding],
        ]

        setMapBounds(bounds)

        const randomIndex = Math.floor(Math.random() * validAddresses.length)
        const randomAddress = validAddresses[randomIndex]
        setInitialPosition([Number.parseFloat(randomAddress.latitude), Number.parseFloat(randomAddress.longitude)])
        setSelectedAddress(randomAddress)
      }
    }
  }, [addresses_list])

  const getAddressByLang = (item, lang) => {
    if (lang === "ru") return item.address_ru
    if (lang === "en") return item.address_en
    return item.address_uz
  }

  const getButtonText = (lang) => {
    if (lang === "ru") return "Выбрать это место"
    if (lang === "en") return "Select this place"
    return "Bu yerdan olaman"
  }

  return (
    <div
      className={`${
        active === "map" ? "block" : "hidden"
      } relative max-w-[100%] h-[90vh] sm:h-[86vh] -mb-[200px] sm:mb-2 mx-auto mt-0 sm:mt-6 border border-gray-300 rounded-lg shadow-lg`}
    >
      <MapContainer
        center={initialPosition}
        zoom={14} // Increased default zoom
        bounds={mapBounds} // Use calculated bounds for focused loading
        className="z-0 w-full h-full overflow-hidden rounded-lg"
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => {
          map.on("load", () => setIsMapLoaded(true))
          if (mapBounds) {
            map.fitBounds(mapBounds, { padding: [20, 20] })
          }
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          maxZoom={18}
          minZoom={10} // Set minimum zoom to prevent loading too large area
        />

        {addresses_list
          ?.filter((item) => item.latitude && item.longitude)
          .map((item) => {
            const pos = [Number.parseFloat(item.latitude), Number.parseFloat(item.longitude)]

            return (
              <Marker
                key={item.id}
                position={pos}
                icon={customIcon}
                eventHandlers={{
                  click: () => {
                    setSelectedAddress(item)
                  },
                }}
              >
                <Popup>
                  <span className="font-bold text-blue-600">📍 {getAddressByLang(item, lang)}</span>
                </Popup>
                {selectedAddress?.id === item.id && <FlyToOnClick position={pos} />}
              </Marker>
            )
          })}
      </MapContainer>

      {!isMapLoaded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-yellow-400 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-4 text-sm text-gray-600 font-medium">
            {lang === "uz"
              ? "Xarita yuklanmoqda..."
              : lang === "en"
                ? "Loading map..."
                : lang === "ru"
                  ? "Загрузка карты..."
                  : "Xarita yuklanmoqda..."}
          </p>
        </div>
      )}

      <div className="absolute z-10 p-4 bg-white border border-gray-300 rounded-lg shadow-lg w-72 sm:w-64 bottom-6 right-6">
        {selectedAddress ? (
          <p className="text-sm text-gray-800">
            <strong>
              {lang == "uz" ? "Manzil:" : lang == "en" ? "Address:" : lang == "ru" ? "Адрес:" : "Manzil:"}
            </strong>{" "}
            {getAddressByLang(selectedAddress, lang)}
          </p>
        ) : (
          <p className="text-sm text-gray-800">
            {lang == "uz"
              ? "Marker ustiga bosing, ma'lumot chiqadi."
              : lang == "en"
                ? "Click on the marker to see details."
                : lang == "ru"
                  ? "Нажмите на маркер, чтобы увидеть детали."
                  : "Marker ustiga bosing, ma'lumot chiqadi."}
          </p>
        )}

        <button
          onClick={() => {
            if (selectedAddress) {
              set_address_inform(selectedAddress)
              set_is_delivery(false)
              set_active("address")
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
  )
}

export default OptimizedMapPage
