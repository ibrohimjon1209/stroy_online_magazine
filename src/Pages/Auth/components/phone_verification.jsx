import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation
import { verify } from "../../../Services/auth/verify";

export default function PhoneVerification({ phoneNumber, method, set_is_found, setUserSignIn }) {
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef([]);
  const navigate = useNavigate(); // Initialize navigation

  const formattedPhoneNumber = phoneNumber
    ? phoneNumber.startsWith("+998")
      ? phoneNumber.substring(4).replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "$1-$2-$3-$4")
      : phoneNumber.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "$1-$2-$3-$4")
    : "90-762-92-82";

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => `${seconds < 10 ? "0" : ""}${seconds}`;

  const handleInputChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1);
    if (value && !/^\d+$/.test(value)) return;

    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, 6).split("");
    const newVerificationCode = [...verificationCode];

    digits.forEach((digit, index) => {
      if (index < 6) {
        newVerificationCode[index] = digit;
      }
    });

    setVerificationCode(newVerificationCode);

    const nextEmptyIndex = newVerificationCode.findIndex((code) => !code);
    if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const resetTimer = () => {
    setTimer(59);
  };

  const handleSubmit = async () => {
    const code = verificationCode.join("");
    if (code.length === 6) {
      try {
        const res = await verify(phoneNumber, code, method);
        if (res.access && res.refresh) {
          localStorage.setItem("accessToken", res.access);
          localStorage.setItem("refreshToken", res.refresh);
          localStorage.setItem("userId", res.id);
          setUserSignIn(true)
          set_is_found(true);
          navigate("/");
        }
      } catch (error) {
        console.error("Verification failed:", error);
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "-80px", minHeight: "100vh", padding: "1rem", position: "relative" }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "1.5rem", backgroundColor: "white", borderRadius: "0.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <p style={{ color: "#4B5563", marginBottom: "0.25rem", whiteSpace: "nowrap" }}>Biz quyidagi telefon raqamiga sms yubordik :</p>
          <p style={{ fontWeight: "500" }}>{formattedPhoneNumber}</p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          {verificationCode.map((code, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="number"
              value={code}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              style={{ width: "2.75rem", height: "3rem", textAlign: "center", fontSize: "1.25rem", fontWeight: "bold", border: `1px solid ${code ? "#3B82F6" : "#D1D5DB"}`, borderRadius: "0.375rem", outline: "none" }}
              maxLength={1}
              autoFocus={index === 0}
            />
          ))}
        </div>

        <div style={{ textAlign: "center", marginBottom: "1rem", fontSize: "0.875rem", color: "#4B5563" }}>
          {timer > 0 ? (
            <p>Kodni qayta yuborish: 00:{formatTime(timer)}</p>
          ) : (
            <button onClick={resetTimer} style={{ color: "#3B82F6", background: "none", border: "none", cursor: "pointer" }}>
              Kodni qayta yuborish
            </button>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={verificationCode.join("").length !== 6}
          style={{ width: "100%", padding: "0.75rem", backgroundColor: verificationCode.join("").length === 6 ? "#FFDF028C" : "#D1D5DB", color: verificationCode.join("").length === 6 ? "#0000008C" : "#6B7280", fontWeight: "500", borderRadius: "0.375rem", border: "none", cursor: verificationCode.join("").length === 6 ? "pointer" : "not-allowed", transition: "background-color 0.2s" }}
        >
          Kirish
        </button>
      </div>

      <div style={{ position: "absolute", bottom: "2rem", textAlign: "center" }}>
        <a href="/login" style={{ color: "#4726BCBF", textDecoration: "none" }} onMouseOver={(e) => (e.target.style.textDecoration = "underline")} onMouseOut={(e) => (e.target.style.textDecoration = "none")}>
          Login orqali kirish
        </a>
      </div>
    </div>
  );
}
