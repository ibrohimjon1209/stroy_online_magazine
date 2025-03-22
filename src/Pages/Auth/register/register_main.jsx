import { useEffect, useState } from "react";
import { PhoneInput } from "../components/phone_input";
import { Link } from "react-router-dom";
import PhoneVerification from "../components/phone_verification";
import { register } from "../../../Services/auth/register";

export default function Register_main({ set_is_found, setUserSignIn }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  useEffect(() => {
    set_is_found(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedNumber = `+998${phoneNumber}`;

    try {
      await register(formattedNumber);
      setShowVerification(true);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  // const handleVerificationComplete = (code) => {
  //   alert(`Verification completed with code: ${code} for phone: +998${phoneNumber}`);
  // };

  const isPhoneComplete = phoneNumber.length === 9;

  if (showVerification) {
    return <PhoneVerification phoneNumber={`+998${phoneNumber}`} method={"register"} set_is_found={set_is_found} setUserSignIn={setUserSignIn} />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center sm:justify-center mt-[12vh] p-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-center text-2xl font-medium">Ro'yxatdan o'tish</h1>
        <p className="text-center text-gray-600">Yangi akkaunt yaratish uchun telefon raqamingizni kiriting.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <PhoneInput value={phoneNumber} onChange={setPhoneNumber} />

          <button
            type="submit"
            disabled={!isPhoneComplete}
            className={`w-full py-3 font-medium transition-colors ${
              isPhoneComplete ? "bg-[#FFDF028C] text-[#0000008C] cursor-pointer" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Ro'yxatdan o'tish
          </button>
        </form>

        <div className="mt-[40vh] sm:pt-16 text-center">
          <Link to="/login" className="text-[#4726BCBF] hover:underline">
            Akkountingiz bormi? Kirish
          </Link>
        </div>
      </div>
    </div>
  );
}
