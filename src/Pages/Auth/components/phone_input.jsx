import { useRef, useEffect } from "react";

export function PhoneInput({ value, onChange, err, loading }) {
  const inputRef = useRef(null);

  // Inputning pozitsiyasini aniqlash
  const getDigitPosition = (formattedPosition) => {
    const positionMap = {
      1: 0, 2: 1, 5: 2, 6: 3, 7: 4, 9: 5, 10: 6, 12: 7, 13: 8,
    };
    return positionMap[formattedPosition] ?? 0;
  };

  // Telefon raqamini formatlash
  const getDisplayValue = () => {
    const digits = value.split("");
    const template = ["(", "_", "_", ")", " ", "_", "_", "_", "-", "_", "_", "-", "_", "_"];
    let digitIndex = 0;
    for (let i = 0; i < template.length; i++) {
      if (template[i] === "_" && digitIndex < digits.length) {
        template[i] = digits[digitIndex];
        digitIndex++;
      }
    }
    return template.join("");
  };

  // Foydalanuvchi raqam kiritganda
  const handlePhoneChange = (e) => {
    const input = e.target;
    const newValue = input.value.replace(/\D/g, "").slice(0, 9); // Faqat raqamlarni qoldiramiz
    onChange(newValue);
  };

  // O‘chirish (Backspace) tugmasi bosilganda
  const handleKeyDown = (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      const newDigits = value.slice(0, -1); // Oxirgi raqamni o‘chirib tashlash
      onChange(newDigits);
    }
  };

  // Input pozitsiyasini to‘g‘ri joylashtirish
  useEffect(() => {
    if (inputRef.current) {
      const pos = getDisplayValue().indexOf("_");
      inputRef.current.setSelectionRange(pos, pos);
    }
  }, [value]);

  return (
    <div className="flex relative">
      <div className="flex rounded-l-[5px] items-center border border-r-0 px-3 bg-white border-gray-300">+998</div>
      <input
        ref={inputRef}
        type="text"
        value={getDisplayValue()}
        onChange={handlePhoneChange}
        onKeyDown={handleKeyDown}
        className={`flex-1 border rounded-r-[5px] p-3 focus:outline-none appearance-none ${
          err ? "border-red-500" : "border-gray-300"
        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={loading}
      />
      {loading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin border-t-2 border-blue-500 rounded-full w-5 h-5"></div>
      )}
    </div>
  );
}
