import React, { useState, useEffect, useRef } from "react";

export default function PhoneVerification({ phoneNumber, onVerificationComplete }) {
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef([]);
  
  // Format the phone number for display
  const formattedPhoneNumber = phoneNumber ? 
    phoneNumber.startsWith("+998") ? 
      phoneNumber.substring(4).replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "$1-$2-$3-$4") : 
      phoneNumber.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "$1-$2-$3-$4") 
    : "90-762-92-82"; // Default if no phone number provided
  
  // Initialize input refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 5);
  }, []);
  
  // Timer countdown
  useEffect(() => {
    if (timer <= 0) return;
    
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timer]);
  
  // Format timer to display as 00:SS
  const formatTime = (seconds) => {
    return `${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Handle input change
  const handleInputChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) {
      return;
    }
    
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);
    
    // Auto-focus next input if current input is filled
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  // Handle key down for backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pastedData)) return;
    
    const digits = pastedData.slice(0, 5).split("");
    const newVerificationCode = [...verificationCode];
    
    digits.forEach((digit, index) => {
      if (index < 5) {
        newVerificationCode[index] = digit;
      }
    });
    
    setVerificationCode(newVerificationCode);
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = newVerificationCode.findIndex(code => !code);
    if (nextEmptyIndex !== -1 && nextEmptyIndex < 5) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[4]?.focus();
    }
  };
  
  // Reset timer
  const resetTimer = () => {
    setTimer(59);
  };
  
  // Handle verification submission
  const handleSubmit = () => {
    const code = verificationCode.join("");
    if (code.length === 5) {
      // Call the callback with the verification code
      if (onVerificationComplete) {
        onVerificationComplete(code);
      } else {
        alert(`Verification code: ${code} for phone number: ${phoneNumber || "90-762-92-82"}`);
      }
    }
  };
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: "-80px",
      minHeight: '100vh',
      padding: '1rem',
      position: 'relative'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '1.5rem'
        }}>
          <p style={{ color: '#4B5563', marginBottom: '0.25rem', whiteSpace: "nowrap" }}>
            Biz quyidagi telefon raqamiga sms yubordik :
          </p>
          <p style={{ fontWeight: '500' }}>{formattedPhoneNumber}</p>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          {verificationCode.map((code, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="number"
              value={code}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              style={{
                width: '3rem',
                height: '3rem',
                textAlign: 'center',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                border: `1px solid ${code ? '#3B82F6' : '#D1D5DB'}`,
                borderRadius: '0.375rem',
                outline: 'none'
              }}
              maxLength={1}
              autoFocus={index === 0}
            />
          ))}
        </div>
        
        <div style={{
          textAlign: 'center',
          marginBottom: '1rem',
          fontSize: '0.875rem',
          color: '#4B5563'
        }}>
          {timer > 0 ? (
            <p>Kodni qayta yuborish: 00:{formatTime(timer)}</p>
          ) : (
            <button 
              onClick={resetTimer}
              style={{
                color: '#3B82F6',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Kodni qayta yuborish
            </button>
          )}
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={verificationCode.join("").length !== 5}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: verificationCode.join("").length === 5 ? '#FFDF028C' : '#D1D5DB',
            color: verificationCode.join("").length === 5 ? '#0000008C' : '#6B7280',
            fontWeight: '500',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: verificationCode.join("").length === 5 ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s'
          }}
        >
          Kirish
        </button>
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        textAlign: 'center'
      }}>
        <a 
          href="/login" 
          style={{
            color: '#4726BCBF',
            textDecoration: 'none'
          }}
          onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
          onMouseOut={(e) => e.target.style.textDecoration = 'none'}
        >
          Login orqali kirish
        </a>
      </div>
    </div>
  );
}
