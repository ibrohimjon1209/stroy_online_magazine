"use client"

import { ChevronLeft, ChevronDown } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const regions = [
  { id: 1, name: "Andijon" },
  { id: 2, name: "Toshkent" },
  { id: 3, name: "Samarqand" },
  { id: 4, name: "Buxoro" },
  { id: 5, name: "Namangan" },
]

const cities = {
  1: [
    { id: 1, name: "Andijon Shahar" },
    { id: 2, name: "Asaka" },
    { id: 3, name: "Shahrixon" },
  ],
  2: [
    { id: 4, name: "Toshkent Shahar" },
    { id: 5, name: "Chirchiq" },
    { id: 6, name: "Bekobod" },
  ],
  3: [
    { id: 7, name: "Samarqand Shahar" },
    { id: 8, name: "Urgut" },
  ],
  4: [
    { id: 9, name: "Buxoro Shahar" },
    { id: 10, name: "Kogon" },
  ],
  5: [
    { id: 11, name: "Namangan Shahar" },
    { id: 12, name: "Chust" },
  ],
}

// Custom dropdown component
const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const selectedOption = options.find((option) => option.id.toString() === value)

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown trigger */}
      <div
        className="w-full h-[70px] px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[18px]">{selectedOption ? selectedOption.name : placeholder}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-[300px] overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.id}
              className={`px-4 py-4 cursor-pointer hover:bg-gray-100 text-[18px] ${
                option.id.toString() === value ? "bg-gray-100" : ""
              }`}
              onClick={() => {
                onChange(option.id.toString())
                setIsOpen(false)
              }}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function RegionSelectionForm() {
  const [selectedRegion, setSelectedRegion] = useState("1")
  const [selectedCity, setSelectedCity] = useState("1")

  const handleRegionChange = (regionId) => {
    setSelectedRegion(regionId)

    if (cities[Number.parseInt(regionId)]?.length > 0) {
      setSelectedCity(cities[Number.parseInt(regionId)][0].id.toString())
    }
  }

  const handleCityChange = (cityId) => {
    setSelectedCity(cityId)
  }

  const handleContinue = () => {
    const region = regions.find((r) => r.id.toString() === selectedRegion)
    const city = cities[Number.parseInt(selectedRegion)]?.find((c) => c.id.toString() === selectedCity)

    alert(`Selected: ${region?.name}, ${city?.name}`)
  }

  return (
    <div className="space-y-[50px] w-[450px]">
      <div className="space-y-2">
        <label className="font-inter font-[500] text-[24px] leading-[22px] text-black">Viloyat</label>
        <CustomDropdown
          options={regions}
          value={selectedRegion}
          onChange={handleRegionChange}
          placeholder="Viloyat tanlang"
        />
      </div>

      <div className="space-y-2">
        <label className="font-inter font-[500] text-[24px] leading-[22px] text-black">Shahar / Tuman</label>
        <CustomDropdown
          options={cities[Number.parseInt(selectedRegion)] || []}
          value={selectedCity}
          onChange={handleCityChange}
          placeholder="Shahar yoki tuman tanlang"
        />
      </div>

      <div className="pt-2">
        <div className="w-full h-[70px] px-4 flex items-center bg-gray-100 border border-gray-200 rounded text-[18px]">
          {cities[Number.parseInt(selectedRegion)]?.find((c) => c.id.toString() === selectedCity)?.name || ""}
        </div>
      </div>

      <button
        className="w-full mt-[30px] h-[60px] font-inter font-[500] text-[28px] leading-[22px] text-black cursor-pointer bg-[#FFDF02] rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 transition-colors"
        onClick={handleContinue}
      >
        Davom etish
      </button>
    </div>
  )
}

const Pickup_address_main = ({ is_pickup, set_is_pickup }) => {

  return (
    <div className={`w-full ${is_pickup ? "flex" : "hidden"} items-center justify-center flex-col mb-[84px]`}>
      <div className="sticky w-full h-[80px] fixed top-0 z-50">
        <div className="bg-[#DCC38B] flex items-center gap-[10px] w-full h-full font-inter font-[600] text-[20px] leading-[22px] text-black pl-[50px]">
          <div onClick={()=>set_is_pickup(false)}>
            <ChevronLeft className="w-[35px] h-[35px] mt-[2px] cursor-pointer" />
          </div>
          <p>Yetkazib berish manzili</p>
        </div>
      </div>
      <div className="mt-[130px]">
        <RegionSelectionForm />
      </div>
    </div>
  )
}

export default Pickup_address_main

