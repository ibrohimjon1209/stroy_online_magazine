"use client";

import { useEffect, useState } from "react";

const Installment = () => {
  const [formData, setFormData] = useState({
    pinfl: "",
    birth_date: "",
    pass_data: "",
    phone: "998",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState("");
  const lang = localStorage.getItem("lang");
  const [fieldErrors, setFieldErrors] = useState({
    phone: "",
    pass_data: "",
    pinfl: "",
    birth_date: "",
  });

  const translations = {
    phone: {
      uz: "Telefon raqam",
      en: "Phone number",
      ru: "Номер телефона",
    },
    passport: {
      uz: "Passport seriya va raqam (ID)",
      en: "Passport series and number (ID)",
      ru: "Серия и номер паспорта (ID)",
    },
    birth_date: {
      uz: "Tug'ilgan kun",
      en: "Date of birth",
      ru: "Дата рождения",
    },
    pinfl: {
      uz: "PINFL",
      en: "PINFL",
      ru: "ПИНФЛ",
    },
    continue: {
      uz: "Davom etish",
      en: "Continue",
      ru: "Продолжить",
    },
    format: {
      uz: "Format: oy/kun/yil (masalan: 01/21/2000)",
      en: "Format: mm/dd/yyyy (e.g. 01/21/2000)",
      ru: "Формат: мм/дд/гггг (например: 01/21/2000)",
    },
    success: {
      uz: "Muvaffaqiyatli yaratildi!",
      en: "Successfully created!",
      ru: "Успешно создано!",
    },
    success_desc: {
      uz: "Ma'lumotlaringiz muvaffaqiyatli saqlandi. Tez orada operator siz bilan bog'lanadi.",
      en: "Your information has been saved successfully. We will contact you soon.",
      ru: "Ваши данные успешно сохранены. Мы скоро свяжемся с вами.",
    },
    close: {
      uz: "Yopish",
      en: "Close",
      ru: "Закрыть",
    },
  };

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/[^\d]/g, "");
    if (!cleanPhone.startsWith("998")) {
      return "Telefon raqami 998 dan boshlanishi kerak";
    }
    if (cleanPhone.length !== 12) {
      return "Telefon raqamining farmati to'g'ri kelmaydi";
    }
    return "";
  };

  const validatePassport = (passport) => {
    const passportRegex = /^[A-Z]{2}\d{7}$/;
    if (!passportRegex.test(passport.toUpperCase())) {
      return "Passport seriyasi 2 ta harf va 7 ta raqamdan iborat bo'lishi kerak (masalan: AB1234567)";
    }
    return "";
  };

  const validatePinfl = (pinfl) => {
    const cleanPinfl = pinfl.replace(/[^\d]/g, "");
    if (cleanPinfl.length !== 14) {
      return "PINFL 14 ta raqamdan iborat bo'lishi kerak";
    }
    return "";
  };

  const validateAge = (birthDate) => {
    if (!birthDate) return "Tug'ilgan kunni kiriting";

    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    if (age < 16) {
      return "Yosh 16 dan kichik bo'lmasligi kerak";
    }
    return "";
  };

  const formatDateToDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const parseDateFromDisplay = (displayDate) => {
    if (!displayDate) return "";
    const parts = displayDate.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return displayDate;
  };

  const handleInputChange = (field, value) => {
    let processedValue = value;
    let fieldError = "";

    switch (field) {
      case "phone":
        if (processedValue.length === 3) {
          fieldError = validatePhone(processedValue);
          processedValue = "998";
          break;
        }
        // Only allow digits and format as +998XXXXXXXXX
        processedValue = value.replace(/[^\d]/g, "");
        if (processedValue.length > 12) {
          processedValue = processedValue.slice(0, 12);
        }
        if (processedValue && !processedValue.startsWith("998")) {
          processedValue = "998" + processedValue.replace(/^998/, "");
        }
        fieldError = validatePhone(processedValue);
        break;

      case "pass_data":
        // Format passport as uppercase letters and numbers only
        processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
        if (processedValue.length > 9) {
          processedValue = processedValue.slice(0, 9);
        }
        fieldError = validatePassport(processedValue);
        break;

      case "pinfl":
        // Only allow digits, max 14
        processedValue = value.replace(/[^\d]/g, "");
        if (processedValue.length > 14) {
          processedValue = processedValue.slice(0, 14);
        }
        fieldError = validatePinfl(processedValue);
        break;

      case "birth_date":
        if (value.includes("/")) {
          // User typed in dd/mm/yyyy format
          processedValue = parseDateFromDisplay(value);
        } else {
          // Date picker returned YYYY-MM-DD format
          processedValue = value;
        }
        fieldError = validateAge(processedValue);
        break;
    }

    setFormData((prev) => ({
      ...prev,
      [field]: processedValue,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [field]: fieldError,
    }));

    if (error) setError("");
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken =
        localStorage.getItem("refresh_token") ||
        localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token found");
      }

      const response = await fetch(
        "https://backkk.stroybazan1.uz/api/api/token/refresh/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: refreshToken,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access);
        return data.access;
      } else {
        throw new Error("Token refresh failed");
      }
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      throw error;
    }
  };

  const handleSubmit = async () => {
    const phoneError = validatePhone(formData.phone);
    const passportError = validatePassport(formData.pass_data);
    const pinflError = validatePinfl(formData.pinfl);
    const ageError = validateAge(formData.birth_date);

    const newFieldErrors = {
      phone: phoneError,
      pass_data: passportError,
      pinfl: pinflError,
      birth_date: ageError,
    };

    setFieldErrors(newFieldErrors);

    if (phoneError || passportError || pinflError || ageError) {
      setError("Iltimos, barcha maydonlarni to'g'ri to'ldiring");
      return;
    }

    if (
      !formData.pinfl ||
      !formData.birth_date ||
      !formData.pass_data ||
      !formData.phone
    ) {
      setError("Barcha maydonlarni to'ldiring");
      return;
    }

    let accessToken = null;
    try {
      accessToken =
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken");
    } catch (err) {
      console.error("localStorage error:", err);
    }

    if (!accessToken) {
      setError("Tizimga kirish kerak. Iltimos, avval ro'yxatdan o'ting.");
      return;
    }

    setIsLoading(true);
    setError("");

    const makeApiCall = async (token) => {
      return await fetch(
        "https://backkk.stroybazan1.uz/pay/api/goldhouse/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
    };

    try {
      let response = await makeApiCall(accessToken);

      if (response.status === 401) {
        try {
          const newToken = await refreshAccessToken();
          response = await makeApiCall(newToken);
        } catch (refreshError) {
          setError(
            "Avtorizatsiya muddati tugagan. Iltimos, qaytadan tizimga kiring."
          );
          return;
        }
      }

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setShowSuccessModal(true);
        setFormData({
          pinfl: "",
          birth_date: "",
          pass_data: "",
          phone: "",
        });
      } else {
        const errorText = await response.text();

        if (response.status === 401) {
          setError("Avtorizatsiya xatosi. Iltimos, qaytadan tizimga kiring.");
        } else if (response.status === 400) {
          setError("Ma'lumotlar noto'g'ri formatda.");
        } else {
          setError(`Server xatosi: ${response.status}`);
        }
      }
    } catch (error) {
      setError("Tarmoq xatosi. Internetga ulanishni tekshiring.");
    } finally {
      setIsLoading(false);
    }
  };

  // Form validatsiyasi
  const isFormValid =
    formData.phone &&
    formData.pass_data &&
    formData.pinfl &&
    formData.birth_date &&
    !fieldErrors.phone &&
    !fieldErrors.pass_data &&
    !fieldErrors.pinfl &&
    !fieldErrors.birth_date;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f9fafb",
        padding: "20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1440px" }}>
        <div
          style={{
            width: "100%",
            height: "82px",
            backgroundColor: "#DCC38B",
            borderRadius: "15px",
            marginTop: "5px",
            display: "flex",
            alignItems: "center",
            paddingLeft: "77px",
          }}
        >
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: "600",
              fontSize: "20px",
              lineHeight: "22px",
              color: "#000000",
              margin: 0,
            }}
          >
            {lang == "uz"
              ? "Passport ma'lumotlari"
              : lang == "en"
              ? "Passport information"
              : lang == "ru"
              ? "Паспортные данные"
              : "Passport ma'lumotlari"}
          </h1>
        </div>

        {/* Form */}
        <div
          style={{
            maxWidth: "400px",
            margin: "48px auto 0",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {error && (
            <div
              style={{
                padding: "12px 16px",
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                color: "#dc2626",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          {/* Phone Number */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}
            >
              {translations.phone[lang] || translations.phone.uz}
            </label>
            <input
              type="tel"
              placeholder="+998901234567"
              value={formData.phone ? `+${formData.phone}` : ""}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              style={{
                height: "48px",
                padding: "12px 16px",
                border: `1px solid ${
                  fieldErrors.phone ? "#ef4444" : "#d1d5db"
                }`,
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
              }}
            />
            {fieldErrors.phone && (
              <span style={{ fontSize: "12px", color: "#ef4444" }}>
                {fieldErrors.phone}
              </span>
            )}
          </div>

          {/* Passport Series and Number */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}
            >
              {translations.passport[lang] || translations.passport.uz}
            </label>
            <input
              type="text"
              placeholder="AB1234567"
              value={formData.pass_data}
              onChange={(e) => handleInputChange("pass_data", e.target.value)}
              style={{
                height: "48px",
                padding: "12px 16px",
                border: `1px solid ${
                  fieldErrors.pass_data ? "#ef4444" : "#d1d5db"
                }`,
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
              }}
            />
            {fieldErrors.pass_data && (
              <span style={{ fontSize: "12px", color: "#ef4444" }}>
                {fieldErrors.pass_data}
              </span>
            )}
          </div>

          {/* Birth Date */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}
            >
              {translations.birth_date[lang] || translations.birth_date.uz}
            </label>
            <input
              type="date"
              value={formData.birth_date}
              onChange={(e) => handleInputChange("birth_date", e.target.value)}
              onBlur={(e) => {
                // Format display when user leaves the field
                if (e.target.value) {
                  const formatted = formatDateToDisplay(e.target.value);
                  e.target.setAttribute("data-display", formatted);
                }
              }}
              placeholder="mm/dd/yyyy"
              style={{
                height: "48px",
                padding: "12px 16px",
                border: `1px solid ${
                  fieldErrors.birth_date ? "#ef4444" : "#d1d5db"
                }`,
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
              }}
            />
            {fieldErrors.birth_date && (
              <span style={{ fontSize: "12px", color: "#ef4444" }}>
                {fieldErrors.birth_date}
              </span>
            )}
            <span style={{ fontSize: "12px", color: "#6b7280" }}>
              {translations.format[lang] || translations.format.uz}
            </span>
          </div>

          {/* PINFL */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}
            >
              {translations.pinfl[lang] || translations.pinfl.uz}
            </label>
            <input
              type="text"
              placeholder="12345678901234"
              value={formData.pinfl}
              onChange={(e) => handleInputChange("pinfl", e.target.value)}
              style={{
                height: "48px",
                padding: "12px 16px",
                border: `1px solid ${
                  fieldErrors.pinfl ? "#ef4444" : "#d1d5db"
                }`,
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
              }}
            />
            {fieldErrors.pinfl && (
              <span style={{ fontSize: "12px", color: "#ef4444" }}>
                {fieldErrors.pinfl}
              </span>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading || !isFormValid}
            style={{
              width: "100%",
              height: "48px",
              backgroundColor: "#FFD700",
              color: "#000",
              fontWeight: "500",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              cursor: isLoading || !isFormValid ? "not-allowed" : "pointer",
              marginTop: "32px",
              opacity: isLoading || !isFormValid ? 0.7 : 1,
            }}
          >
            {isLoading
              ? "Yuklanmoqda..."
              : translations.continue[lang] || translations.continue.uz}
          </button>
        </div>

        {/* Error Modal */}
        {error && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "32px",
                borderRadius: "12px",
                maxWidth: "400px",
                width: "90%",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  color: "#dc2626",
                  marginBottom: "16px",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                {lang === "uz"
                  ? "Xatolik yuz berdi"
                  : lang === "en"
                  ? "An error occurred"
                  : lang === "ru"
                  ? "Произошла ошибка"
                  : "Xatolik yuz berdi"}
              </h2>
              <p style={{ color: "#6b7280", marginBottom: "24px" }}>
                {error}
              </p>
              <button
                onClick={() => setError("")}
                style={{
                  width: "100%",
                  height: "40px",
                  backgroundColor: "#FFD700",
                  color: "#000",
                  fontWeight: "500",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {lang === "uz"
                  ? "Yopish"
                  : lang === "en"
                  ? "Close"
                  : lang === "ru"
                  ? "Закрыть"
                  : "Yopish"}
              </button>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "32px",
                borderRadius: "12px",
                maxWidth: "400px",
                width: "90%",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  color: "#16a34a",
                  marginBottom: "16px",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                {translations.success[lang] || translations.success.uz}
              </h2>
              <p style={{ color: "#6b7280", marginBottom: "24px" }}>
                {translations.success_desc[lang] ||
                  translations.success_desc.uz}
              </p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  window.location.href = "/";
                }}
                style={{
                  width: "100%",
                  height: "40px",
                  backgroundColor: "#FFD700",
                  color: "#000",
                  fontWeight: "500",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {translations.close[lang] || translations.close.uz}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Installment;
