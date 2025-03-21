import youtube_icon from "./chields/imgs/youtube_icon.svg";
import telegram_icon from "./chields/imgs/telegram_icon.svg";
import instagram_icon from "./chields/imgs/instagram_icon.svg";
import { Phone } from "lucide-react";

const BottomModal = ({ isOpen, onClose }) => {

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0000008C]" onClick={onClose} style={{ zIndex: 9999 }}>
      <div
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[20px]"
        onClick={(e) => e.stopPropagation()}
        style={{ zIndex: 10000 }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Qo'llab-quvvatlash xizmati</h2>
            <button onClick={onClose} className="p-1" aria-label="Close">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">+998 90 762 92 82</p>
                <p className="text-sm text-gray-500">Savolingiz bormi? Qo'ng'iroq qiling</p>
              </div>
              <Phone className="h-[28px] w-[28px]"/>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">+998 90 123 45 67</p>
                <p className="text-sm text-gray-500">Ishonch telefoni</p>
              </div>
              <Phone className="h-[28px] w-[28px]"/>
            </div>
          </div>

          <div className="pt-1 flex flex-col gap-[10px]">
            <div className="flex justify-center gap-5 mb-4">
              <a href="https://www.instagram.com/" className="flex flex-row gap-[8px] items-center">
                <img src={instagram_icon} />
                <span className="font-inter text-[15px] font-[600] leading-[22px]">Instagram</span>
              </a>
              <a href="https://www.youtube.com/" className="flex flex-row gap-[8px] items-center">
                <img src={youtube_icon} />
                <span className="font-inter text-[15px] font-[600] leading-[22px]">Youtube</span>
              </a>
              <a href="https://t.me/" className="flex flex-row gap-[8px] items-center">
                <img src={telegram_icon} />
                <span className="font-inter text-[15px] font-[600] leading-[22px]">Telegram</span>
              </a>
            </div>

            <div className="text-center font-inter font-[500] text-[16px] leading-[22px] text-gray-500">
              Powered by <span className="text-purple-600 font-[600]">NSD CORPORATION</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomModal