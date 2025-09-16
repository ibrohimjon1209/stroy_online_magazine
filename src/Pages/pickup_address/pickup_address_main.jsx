"use client";

import { ChevronLeft, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  const lang = localStorage.getItem("lang") || "uz";
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.id === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="w-full h-[70px] px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[18px]">
          {selectedOption ? selectedOption[`name_${lang}`] : placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-[300px] overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.id}
              className={`px-4 py-4 cursor-pointer hover:bg-gray-100 text-[18px] ${
                option.id === value ? "bg-gray-100" : ""
              }`}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
            >
              {option[`name_${lang}`]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function RegionSelectionForm({ set_address_inform, set_is_pickup }) {
  const lang = localStorage.getItem("lang") || "uz";
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [street, setStreet] = useState("");

  const [delivery_address, setDeliveryAddress] = useState({
    region: "",
    city: "",
    street: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const regionRes = await axios.get(
          "https://backkk.stroybazan1.uz/api/api/regions/"
        );
        const cityRes = await axios.get(
          "https://backkk.stroybazan1.uz/api/api/cities/"
        );
        setRegions(regionRes.data);
        setCities(cityRes.data);
      } catch (err) {
        console.error("Ma'lumotlarni yuklashda xatolik:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    try {
      // Load region from localStorage
      const storedRegion = localStorage.getItem("region");
      if (storedRegion) {
        const parsedRegion = JSON.parse(storedRegion);
        if (
          parsedRegion &&
          typeof parsedRegion === "object" &&
          parsedRegion.id
        ) {
          setSelectedRegion(parsedRegion.id);
          const filtered = cities.filter(
            (city) => city.region === parsedRegion.id
          );
          setFilteredCities(filtered);
        } else {
          console.error("Stored region does not have an 'id' property");
          setSelectedRegion(null);
        }
      }

      // Load city from localStorage
      const storedCity = localStorage.getItem("city");
      if (storedCity) {
        const parsedCity = JSON.parse(storedCity);
        if (parsedCity && typeof parsedCity === "object" && parsedCity.id) {
          setSelectedCity(parsedCity.id);
        } else {
          console.error("Stored city does not have an 'id' property");
          setSelectedCity(null);
        }
      }

      // Load street from localStorage
      const storedStreet = localStorage.getItem("street");
      if (storedStreet) {
        setStreet(storedStreet);
      }
    } catch (error) {
      console.error("Failed to parse data from localStorage:", error);
      setSelectedRegion(null);
      setSelectedCity(null);
      setStreet("");
    }
  }, [cities]);

  const handleRegionChange = (regionId) => {
    setSelectedRegion(regionId);
    const filtered = cities.filter((city) => city.region === regionId);
    setFilteredCities(filtered);
    const selectedRegionObj = regions.find((item) => item.id === regionId);
    localStorage.setItem("region", JSON.stringify(selectedRegionObj));
    setSelectedCity(null); // Reset city
    localStorage.removeItem("city"); // Clear city from localStorage
  };

  const handleCityChange = (cityId) => {
    setSelectedCity(cityId);
    const selectedCityObj = cities.find((item) => item.id === cityId);
    localStorage.setItem("city", JSON.stringify(selectedCityObj));
  };

  const handleStreetChange = (e) => {
    const newStreet = e.target.value;
    setStreet(newStreet);
    localStorage.setItem("street", newStreet);
  };

  const handleContinue = () => {
    const regionObj = regions.find((r) => r.id === selectedRegion);
    const cityObj = filteredCities.find((c) => c.id === selectedCity);

    setDeliveryAddress({
      region: regionObj?.[`name_${lang}`] || "",
      city: cityObj?.[`name_${lang}`] || "",
      street: street,
    });

    if (!regionObj?.name_uz || !cityObj?.name_uz || !street) {
      alert(
        !regionObj?.name_uz
          ? lang === "uz"
            ? "Viloyat tanlanmagan"
            : lang === "ru"
            ? "Регион не выбран"
            : "Region not selected"
          : !cityObj?.name_uz
          ? lang === "uz"
            ? "Shahar yoki tuman tanlanmagan"
            : lang === "ru"
            ? "Город или район не выбран"
            : "City or district not selected"
          : lang === "uz"
          ? "Ko‘cha kiritilmagan"
          : lang === "ru"
          ? "Улица не введена"
          : "Street not entered"
      );
      return;
    }

    set_address_inform({
      address_uz: `${regionObj?.name_uz}, ${cityObj?.name_uz}, ${street}`,
      address_ru: `${regionObj?.name_ru}, ${cityObj?.name_ru}, ${street}`,
      address_en: `${regionObj?.name_en}, ${cityObj?.name_en}, ${street}`,
    });

    set_is_pickup(false);
    localStorage.setItem(
      "pickup_address",
      JSON.stringify({
        address_uz: `${regionObj?.name_uz}, ${cityObj?.name_uz}, ${street}`,
        address_ru: `${regionObj?.name_ru}, ${cityObj?.name_ru}, ${street}`,
        address_en: `${regionObj?.name_en}, ${cityObj?.name_en}, ${street}`,
      })
    );
  };

  return (
    <div className="space-y-[50px] w-[450px]">
      <div className="flex flex-col space-y-4">
        <label className="font-inter font-[500] text-[24px] leading-[22px] text-black">
          {lang === "uz" ? "Viloyat" : lang === "ru" ? "Регион" : "Region"}
        </label>
        <CustomDropdown
          options={regions}
          value={selectedRegion}
          onChange={handleRegionChange}
          placeholder={
            lang === "uz"
              ? "Viloyat tanlang"
              : lang === "ru"
              ? "Выберите регион"
              : "Select region"
          }
        />
      </div>

      <div className="flex flex-col space-y-4">
        <label className="font-inter font-[500] text-[24px] leading-[22px] text-black">
          {lang === "uz"
            ? "Shahar / Tuman"
            : lang === "ru"
            ? "Город / Район"
            : "City / District"}
        </label>
        <CustomDropdown
          options={filteredCities}
          value={selectedCity}
          onChange={handleCityChange}
          placeholder={
            lang === "uz"
              ? "Shahar yoki tuman tanlang"
              : lang === "ru"
              ? "Выберите город или район"
              : "Select city or district"
          }
        />
      </div>

      <div className="flex flex-col space-y-4">
        <label className="font-inter font-[500] text-[24px] leading-[22px] text-black">
          {lang === "uz" ? "Ko’cha" : lang === "ru" ? "Улица" : "Street"}
        </label>
        <input
          value={street}
          onChange={handleStreetChange}
          placeholder={
            lang === "uz"
              ? "Ko’chani kiriting"
              : lang === "ru"
              ? "Введите улицу"
              : "Enter your street"
          }
          className="w-full h-[70px] px-4 flex items-center bg-gray-100 border border-gray-200 rounded text-[18px]"
        />
      </div>

      <button
        className="w-full mt-[30px] h-[65px] sm:h-[60px] font-inter font-[500] text-[25px] sm:text-[28px] leading-[22px] text-black cursor-pointer bg-[#FFDF02] rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 transition-colors"
        onClick={handleContinue}
      >
        {lang === "uz"
          ? "Davom etish"
          : lang === "ru"
          ? "Продолжить"
          : "Continue"}
      </button>
    </div>
  );
}

const Pickup_address_main = ({
  is_pickup,
  set_is_pickup,
  set_address_inform,
}) => {
  const lang = localStorage.getItem("lang") || "uz";
  return (
    <div
      className={`w-full ${
        is_pickup ? "flex" : "hidden"
      } items-center justify-center flex-col sm:mb-[84px]`}
    >
      <div className="flex justify-center top-[5px] w-full h-[65px] sm:h-[80px] fixed z-50">
        <div className="bg-[#DCC38B] flex items-center gap-[10px] w-[1450px] rounded-[15px] h-full font-inter font-[600] text-[17px] sm:text-[20px] leading-[22px] text-black pl-[13px] sm:pl-[50px]">
          <div onClick={() => set_is_pickup(false)}>
            <ChevronLeft className="scale-110 sm:scale-100 sm:w-[35px] sm:h-[35px] mt-0 sm:mt-[2px] cursor-pointer" />
          </div>
          <p>
            {lang === "uz"
              ? "Yetkazib berish manzili"
              : lang === "ru"
              ? "Адрес доставки"
              : "Delivery address"}
          </p>
        </div>
      </div>
      <div className="sm:mt-[130px] scale-[72%] sm:scale-100">
        <RegionSelectionForm
          set_address_inform={set_address_inform}
          set_is_pickup={set_is_pickup}
        />
      </div>
    </div>
  );
};

export default Pickup_address_main;
