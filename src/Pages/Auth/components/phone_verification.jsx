import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { verify } from "../../../Services/auth/verify";
import { login } from "../../../Services/auth/login";
import { register } from "../../../Services/auth/register";

export default function PhoneVerification({
  phoneNumber,
  method,
  set_is_found,
  setUserSignIn,
}) {
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (verificationCode.join("").length === 6) {
      handleSubmit();
    }
  }, [verificationCode]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1);
    if (value && !/^[0-9]$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    setErrorMessage("");

    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^[0-9]+$/.test(pastedData)) return;

    const newCode = [...pastedData.split(""), "", "", "", "", ""].slice(0, 6);
    setVerificationCode(newCode);
    inputRefs.current[newCode.findIndex((c) => !c) || 5]?.focus();
  };

  const resetTimer = async () => {
    setErrorMessage("");

    try {
      if (method === "register") await register(phoneNumber);
      else await login(phoneNumber);  
      setTimer(59);
    } catch (error) {
      setErrorMessage("Kod qayta yuborilmadi. Iltimos, qayta urinib ko‘ring.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const code = verificationCode.join("");
    if (code.length !== 6) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await verify(phoneNumber, code, method);
      if (res.access && res.refresh) {
        localStorage.setItem("accessToken", res.access);
        localStorage.setItem("refreshToken", res.refresh);
        localStorage.setItem("userId", res.id);
        setUserSignIn(true);
        set_is_found(true);
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("Noto‘g‘ri kod! Qayta urining.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "1rem",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "1.5rem",
          backgroundColor: "white",
          borderRadius: "0.5rem",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          {errorMessage && (
            <div className="text-red-500 font-medium mb-2">{errorMessage}</div>
          )}
          <p style={{ color: "#4B5563", marginBottom: "0.25rem" }}>
            Biz quyidagi telefon raqamiga sms yubordik:
          </p>
          <p style={{ fontWeight: "500" }}>{phoneNumber}</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          {verificationCode.map((code, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="number"
              value={code}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={`w-10 h-12 text-center text-xl font-bold border-2 rounded-lg outline-none transition ${
                errorMessage
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
              autoFocus={index === 0}
            />
          ))}
        </div>

        <div
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            fontSize: "0.875rem",
            color: "#4B5563",
          }}
        >
          {timer > 0 ? (
            <p>Kodni qayta yuborish: 00:{timer < 10 ? `0${timer}` : timer}</p>
          ) : (
            <button
              onClick={resetTimer}
              style={{
                color: "#3B82F6",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Kodni qayta yuborish
            </button>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={verificationCode.join("").length !== 6 || isLoading}
          className={`w-full flex justify-center rounded-lg items-center h-13 font-medium transition ${
            verificationCode.join("").length === 6
              ? "bg-yellow-400 text-black"
              : "bg-yellow-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <svg
              className="size-7 animate-spin text-black"
              fill="none"
              viewBox="0 0 32 32"
            >
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            "Kirish"
          )}
        </button>
      </div>
    </div>
  );
}