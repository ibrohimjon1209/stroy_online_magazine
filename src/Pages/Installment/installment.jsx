"use client"

import { useState } from "react"

const Installment = () => {
  const [formData, setFormData] = useState({
    pinfl: "",
    birth_date: "",
    pass_data: "",
    phone: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (error) setError("")
  }

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token") || localStorage.getItem("refreshToken")
      if (!refreshToken) {
        throw new Error("No refresh token found")
      }

      const response = await fetch("https://backkk.stroybazan1.uz/api/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem("access_token", data.access)
        return data.access
      } else {
        throw new Error("Token refresh failed")
      }
    } catch (error) {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      throw error
    }
  }

  const handleSubmit = async () => {
    if (!formData.pinfl || !formData.birth_date || !formData.pass_data || !formData.phone) {
      setError("Barcha maydonlarni to'ldiring")
      return
    }

    let accessToken = null
    try {
      accessToken = localStorage.getItem("access_token") || localStorage.getItem("accessToken")
    } catch (err) {
      console.error("localStorage error:", err)
    }

    if (!accessToken) {
      setError("Tizimga kirish kerak. Iltimos, avval ro'yxatdan o'ting.")
      return
    }

    setIsLoading(true)
    setError("")

    const makeApiCall = async (token) => {
      return await fetch("https://backkk.stroybazan1.uz/pay/api/goldhouse/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
    }

    try {
      let response = await makeApiCall(accessToken)

      if (response.status === 401) {
        try {
          const newToken = await refreshAccessToken()
          response = await makeApiCall(newToken)
        } catch (refreshError) {
          setError("Avtorizatsiya muddati tugagan. Iltimos, qaytadan tizimga kiring.")
          return
        }
      }

      if (response.ok) {
        const result = await response.json()
        setShowSuccessModal(true)
        setFormData({
          pinfl: "",
          birth_date: "",
          pass_data: "",
          phone: "",
        })
      } else {
        const errorText = await response.text()

        if (response.status === 401) {
          setError("Avtorizatsiya xatosi. Iltimos, qaytadan tizimga kiring.")
        } else if (response.status === 400) {
          setError("Ma'lumotlar noto'g'ri formatda.")
        } else {
          setError(`Server xatosi: ${response.status}`)
        }
      }
    } catch (error) {
      setError("Tarmoq xatosi. Internetga ulanishni tekshiring.")
    } finally {
      setIsLoading(false)
    }
  }

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
        {/* Header */}
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
            Passport ma'lumotlari
          </h1>
        </div>

        {/* Form */}
        <div
          style={{ maxWidth: "400px", margin: "48px auto 0", display: "flex", flexDirection: "column", gap: "24px" }}
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
            <label style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>Telefon raqami</label>
            <input
              type="tel"
              placeholder="Telefon raqamingizni kiriting"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              style={{
                height: "48px",
                padding: "12px 16px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
              }}
            />
          </div>

          {/* Passport Series and Number */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>
              Passport seriya va raqam (ID)
            </label>
            <input
              type="text"
              placeholder="Passport ma'lumotlarini kiriting"
              value={formData.pass_data}
              onChange={(e) => handleInputChange("pass_data", e.target.value)}
              style={{
                height: "48px",
                padding: "12px 16px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
              }}
            />
          </div>

          {/* Birth Date */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>Tug'ilgan kun</label>
            <input
              type="date"
              value={formData.birth_date}
              onChange={(e) => handleInputChange("birth_date", e.target.value)}
              style={{
                height: "48px",
                padding: "12px 16px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
              }}
            />
          </div>

          {/* PINFL */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>PINFL</label>
            <input
              type="text"
              placeholder="PINFL raqamini kiriting"
              value={formData.pinfl}
              onChange={(e) => handleInputChange("pinfl", e.target.value)}
              style={{
                height: "48px",
                padding: "12px 16px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "16px",
                outline: "none",
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            style={{
              width: "100%",
              height: "48px",
              backgroundColor: "#FFD700",
              color: "#000",
              fontWeight: "500",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              marginTop: "32px",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? "Yuklanmoqda..." : "Davom etish"}
          </button>
        </div>

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
              <h2 style={{ color: "#16a34a", marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>
                Muvaffaqiyatli yaratildi!
              </h2>
              <p style={{ color: "#6b7280", marginBottom: "24px" }}>Ma'lumotlaringiz muvaffaqiyatli saqlandi.</p>
              <button
                onClick={() => setShowSuccessModal(false)}
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
                Yopish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Installment
