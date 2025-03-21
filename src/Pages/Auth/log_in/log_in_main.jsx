import { useEffect, useState } from "react"
import { PhoneInput } from "../components/phone_input"
import { Link } from "react-router-dom"
import PhoneVerification from "../components/phone_verification"

export default function Log_in_main({ set_is_found }) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [showVerification, setShowVerification] = useState(false)

  useEffect(() => {
    set_is_found(false)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formattedNumber = `+998${phoneNumber}`
    // Instead of alert, show verification screen
    setShowVerification(true)
  }

  const handleVerificationComplete = (code) => {
    // Handle verification completion
    alert(`Verification completed with code: ${code} for phone: +998${phoneNumber}`)
    // Here you would typically make an API call to verify the code
  }

  const isPhoneComplete = phoneNumber.length === 9

  // If verification screen should be shown, render it
  if (showVerification) {
    return <PhoneVerification phoneNumber={`+998${phoneNumber}`} onVerificationComplete={handleVerificationComplete} />
  }

  // Otherwise show the login form
  return (
    <div className="flex min-h-screen flex-col items-center sm:justify-center sm:mt-[] mt-[12vh] p-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-center text-2xl font-medium">Tizimga kirish</h1>
        <p className="text-center text-gray-600">Kirish uchun telefon raqamingizni kiriting.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <PhoneInput value={phoneNumber} onChange={setPhoneNumber} />

          <button
            type="submit"
            disabled={!isPhoneComplete}
            className={`w-full py-3 font-medium transition-colors ${
              isPhoneComplete ? "bg-[#FFDF028C] text-[#0000008C] cursor-pointer" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Kirish
          </button>
        </form>

        <div className="mt-[40vh] sm:pt-16 text-center">
          <Link to="/register" className="text-[#4726BCBF] hover:underline">
            Akkountingiz yo'qmi? Ro'yxatdan o'ting
          </Link>
        </div>
      </div>
    </div>
  )
}

