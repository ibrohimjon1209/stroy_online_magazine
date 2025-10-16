import youtube_icon from "./chields/imgs/youtube_ico.webp";
import telegram_icon from "./chields/imgs/telegram_ico.webp";
import instagram_icon from "./chields/imgs/insta_ico.webp";
import { Phone } from "lucide-react";
import { support_get } from "../../../../Services/general/support";
import { useEffect, useState } from "react";

const BottomModal = ({ isOpen, onClose, lang }) => {
  const [support, set_support] = useState([]);
  const [media, set_media] = useState(null);
  const [copiedId, setCopiedId] = useState(null); // New state for copied phone ID
  const sl_option_id =
    localStorage.getItem("sl_option_nav") === "Stroy Baza №1"
      ? 0
      : localStorage.getItem("sl_option_nav") === "Giaz Mebel"
        ? 1
        : 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await support_get();
        const filtered = res.filter((item) => {
          return item.branch == sl_option_id;
        });
        set_support(filtered.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    return () => {
      console.error("Cleanup function ishladi");
    };
  }, []);

  useEffect(() => {
    fetch("https://backkk.stroybazan1.uz/api/api/social-media/latest/")
      .then((res) => res.json())
      .then((json) => {
        set_media(
          json.filter((item) => {
            return item.branch == sl_option_id;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCopy = (phoneNumber, id) => {
    navigator.clipboard.writeText(phoneNumber).then(() => {
      setCopiedId(id); // Set the copied ID
      setTimeout(() => setCopiedId(null), 2000); // Clear copied ID after 2 seconds
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-end justify-center z-[9999] bg-[#00000050] h-[calc(100vh-50px)]"
      onClick={onClose}
      style={{ zIndex: 9999 }}
    >
      <div
        className="w-full sm:w-[400px] bg-white rounded-t-[20px] pb-10"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxHeight: "80vh",
          height: "auto",
          overflowY: "auto",
          boxShadow: "0 -2px 16px rgba(0,0,0,0.08)",
          zIndex: 10000,
          touchAction: "none",
        }}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">
              {lang == "uz"
                ? "Qo'llab-quvvatlash xizmati"
                : lang == "en"
                  ? "Support"
                  : lang == "ru"
                    ? "Поддержка"
                    : "Qo'llab-quvvatlash"}
            </h2>
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

          <div className="mb-6 space-y-4">
            {support.map((item) => (
              <div key={item.id} onClick={() => handleCopy(item.phone_number, item.id)} className="flex items-center justify-between">
                <div>
                  <a href={`tel:${item.phone_number}`} className="font-medium">
                    {item.phone_number}
                  </a>

                  <p className="text-sm text-gray-500">
                    {item[`title_${lang}`]}
                  </p>
                  {copiedId === item.id && (
                    <p className="text-green-500">
                      {lang === "uz" ? "Nushalandi" : "Copied"}
                    </p>
                  )} {/* Display copied message only for the clicked number */}
                </div>
                <Phone className="h-[28px] w-[28px]" />
              </div>
            ))}
          </div>

          <div className="pt-1 flex flex-col gap-[10px]">
            <div className="flex justify-center gap-5 mb-4">
              {media && media.length > 0 && (
                <div className="flex items-center justify-between w-[70%]">
                  <a
                    href={media[0]?.instagram}
                    target="_blank"
                  >
                    <img src={instagram_icon} width={40} className="rounded-lg" height={40} />
                    
                  </a>
                  <a
                    href={media[0]?.youtube}
                    target="_blank"
                  >
                    <img src={youtube_icon} width={52} className="object-contain ml-4" height={42}/>
                    
                  </a>
                  <a
                    href={media[0]?.telegram}
                    target="_blank"
                  >
                    <img src={telegram_icon} width={65} className="object-contain" height={65}/>
                    
                  </a>
                </div>
              )}
            </div>

            <div className="text-center font-inter font-[500] text-[16px] leading-[22px] text-gray-500">
              {lang == "uz" ? (
                <div className="flex flex-col items-center">
                  
                  <div>

                    <a
                      href="https://t.me/nsd_corporation"
                      target="_blank"
                      className="text-purple-600  font-[600]"
                    >
                      NSD CORPORATION
                    </a>{" "}
                    tomonidan yaratilgan
                  </div>
                </div>
              ) : lang == "en" ? (
                <>
                  Powered by{" "}
                  <a
                    href="https://t.me/nsd_corporation"
                    target="_blank"
                    className="text-purple-600 font-[600]"
                  >
                    NSD CORPORATION
                  </a>
                </>
              ) : lang == "ru" ? (
                <>
                  Создано{" "}
                  <a
                    href="https://t.me/nsd_corporation"
                    target="_blank"
                    className="text-purple-600 font-[600]"
                  >
                    NSD CORPORATION
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="https://t.me/nsd_corporation"
                    target="_blank"
                    className="text-purple-600 font-[600]"
                  >
                    NSD CORPORATION
                  </a>{" "}
                  tomonidan yaratilgan
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomModal;
