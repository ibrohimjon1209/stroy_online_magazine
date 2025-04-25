import { useEffect, useState, useMemo } from "react";
import { PhoneInput } from "../components/phone_input";
import { Link } from "react-router-dom";
import PhoneVerification from "../components/phone_verification";
import { login } from "../../../Services/auth/login";

export default function Log_in_main({ set_is_found, setUserSignIn, lang }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    set_is_found(false);
  }, []);

  const translations = useMemo(() => ({
    uz: {
      title: "Tizimga kirish",
      description: "Kirish uchun telefon raqamingizni kiriting.",
      error: "Kirishda xatolik yuz berdi",
      login: "Kirish",
      register: "Akkountingiz yo'qmi? Ro'yxatdan o'ting"
    },
    en: {
      title: "Login",
      description: "Enter your phone number to log in.",
      error: "Error entering",
      login: "Login",
      register: "Don't have an account? Sign up"
    },
    ru: {
      title: "Вход в систему",
      description: "Введите свой номер телефона для входа.",
      error: "Ввод ошибки",
      login: "Войти",
      register: "У вас нет аккаунта? Зарегистрируйтесь"
    }
  }), [lang]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedNumber = `+998${phoneNumber}`;
    setInputError(false);
    setIsLoading(true);
    setErrorMessage("");

    setTimeout(async () => {
      try {
        await login(formattedNumber);
        localStorage.setItem("phoneNumber", formattedNumber);
        setShowVerification(true);
      } catch (error) {
        setInputError(true);
        setErrorMessage(translations[lang]?.error || translations.uz.error);
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
        method={"login"}
        set_is_found={set_is_found}
        setUserSignIn={setUserSignIn}
      />
    );
  }

  return (
    <div className="flex h-full flex-col items-center sm:justify-center mt-[12vh] p-4">
      <div className="flex flex-col justify-between w-full">
        <div className="relative w-full max-w-md mx-auto space-y-8">
          <h1 className="text-2xl font-medium text-center">{translations[lang]?.title || translations.uz.title}</h1>
          <p className="text-center text-gray-600">{translations[lang]?.description || translations.uz.description}</p>

          {errorMessage && (
            <div className="absolute left-0 right-0 font-medium text-center text-red-500 -top-8">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <PhoneInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              err={errorMessage}
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
                translations[lang]?.login || translations.uz.login
              )}
            </button>
          </form>
        </div>

        <div className="mt-[40vh] sm:pt-16 text-center">
          <Link to="/register" className="text-[#4726BCBF] hover:underline">
            {translations[lang]?.register || translations.uz.register}
          </Link>
        </div>
      </div>
    </div>
  );
}
