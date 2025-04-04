import { useEffect, useState } from "react";
import { PhoneInput } from "../components/phone_input";
import { Link } from "react-router-dom";
import PhoneVerification from "../components/phone_verification";
import { register } from "../../../Services/auth/register";

export default function Register_main({ set_is_found, setUserSignIn, lang }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const translations = {
    uz: {
      title: "Ro'yxatdan o'tish",
      description:
        "Yangi akkaunt yaratish uchun telefon raqamingizni kiriting.",
      error: "Ro'yxatdan o'tishda xatolik yuz berdi",
      submit: "Ro'yxatdan o'tish",
      loginLink: "Akkountingiz bormi? Kirish",
    },
    en: {
      title: "Sign Up",
      description: "Enter your phone number to create a new account.",
      error: "Error during registration",
      submit: "Sign Up",
      loginLink: "Already have an account? Log in",
    },
    ru: {
      title: "Регистрация",
      description: "Введите свой номер телефона, чтобы создать новый аккаунт.",
      error: "Ошибка при регистрации",
      submit: "Регистрация",
      loginLink: "У вас уже есть аккаунт? Войти",
    },
  };

  const t = translations[lang] || translations.uz;

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
        setErrorMessage(t.error);
      } finally {
        setIsLoading(false);
      }
    }, 3000);
  };

  const isPhoneComplete = phoneNumber.length === 9;

  if (showVerification) {
    return (
      <PhoneVerification
        lang={lang}
        phoneNumber={`+998${phoneNumber}`}
        method={"register"}
        set_is_found={set_is_found}
        setUserSignIn={setUserSignIn}
      />
    );
  }

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center sm:justify-center mt-[12vh] p-4">
      <div className="flex flex-col justify-between w-full">
        <div className="relative w-full max-w-md mx-auto space-y-8">
          <h1 className="text-2xl font-medium text-center">{t.title}</h1>
          <p className="text-center text-gray-600">{t.description}</p>

          {errorMessage && (
            <div className="absolute left-0 right-0 font-medium text-center text-red-500 -top-8">
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
                  className="text-black size-7 animate-spin"
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
                t.submit
              )}
            </button>
          </form>
        </div>

        <div className="mt-[40vh] sm:pt-16 text-center">
          <Link to="/login" className="text-[#4726BCBF] hover:underline">
            {t.loginLink}
          </Link>
        </div>
      </div>
    </div>
  );
}
