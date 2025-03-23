import { useEffect, useState } from "react";
import { PhoneInput } from "../components/phone_input";
import { Link } from "react-router-dom";
import PhoneVerification from "../components/phone_verification";
import { register } from "../../../Services/auth/register";

export default function Register_main({ set_is_found, setUserSignIn }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    set_is_found(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedNumber = `+998${phoneNumber}`;
    setIsLoading(true);
    setInputError(false);
    setErrorMessage("");

    setTimeout(async () => {
      try {
        await register(formattedNumber);
        setShowVerification(true);
      } catch (error) {
        console.error("Registration failed:", error);
        setInputError(true);
        setErrorMessage("Ro'yxatdan o'tishda xatolik yuz berdi");
      } finally {
        setIsLoading(false);
      }
    }, 3000);
  };

  const isPhoneComplete = phoneNumber.length === 9;

  if (showVerification) {
    return <PhoneVerification phoneNumber={`+998${phoneNumber}`} method={"register"} set_is_found={set_is_found} setUserSignIn={setUserSignIn} />;
  }

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center sm:justify-center mt-[12vh] p-4">
      <div className="w-full flex flex-col justify-between">
        <div className="mx-auto w-full max-w-md space-y-8 relative">
          <h1 className="text-center text-2xl font-medium">Ro'yxatdan o'tish</h1>
          <p className="text-center text-gray-600">
            Yangi akkaunt yaratish uchun telefon raqamingizni kiriting.
          </p>

          {/* Xatolik bo‘lsa, error xabarini chiqarish */}
          {errorMessage && (
            <div className="absolute -top-8 left-0 right-0 text-center text-red-500 font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <PhoneInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              className={`border-2 w-full py-2 px-3 rounded-md transition ${
                errorMessage ? "border-red-500" : "border-gray-300"
              }`}
            />

            <button
              type="submit"
              disabled={!isPhoneComplete || isLoading}
              className={`w-full flex flex-row justify-center rounded-[5px] items-center h-13 font-medium transition-colors ${
                isPhoneComplete
                  ? "bg-[#FFDF02] text-black cursor-pointer"
                  : "bg-[#FFDF028C] text-[#0000008C] cursor-not-allowed"
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
              ) : "Ro'yxatdan o'tish"}
            </button>
          </form>
        </div>

        <div className="mt-[40vh] sm:pt-16 text-center">
          <Link to="/login" className="text-[#4726BCBF] hover:underline">
            Akkountingiz bormi? Kirish
          </Link>
        </div>
      </div>
    </div>
  );
}
