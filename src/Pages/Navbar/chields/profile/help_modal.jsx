import youtube_icon from "./chields/imgs/youtube_icon.svg";
import telegram_icon from "./chields/imgs/telegram_icon.svg";
import instagram_icon from "./chields/imgs/instagram_icon.svg";
import { Phone } from "lucide-react";
import { support_get } from "../../../../Services/general/support";
import { useEffect, useState } from "react";

const BottomModal = ({ isOpen, onClose, lang }) => {
  const [support, set_support] = useState([]);
  const [media, set_media] = useState(null);
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
        set_support(res);
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
    fetch("https://back.stroybazan1.uz/api/api/social-media/latest/")
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#0000008C]"
      onClick={onClose}
      style={{ zIndex: 9999 }}
    >
      <div
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[20px]"
        onClick={(e) => e.stopPropagation()}
        style={{ zIndex: 10000 }}
      >
        <div className="p-4">
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
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.phone_number}</p>
                  <p className="text-sm text-gray-500">
                    {item[`title_${lang}`]}
                  </p>
                </div>
                <Phone className="h-[28px] w-[28px]" />
              </div>
            ))}
          </div>

          <div className="pt-1 flex flex-col gap-[10px]">
            <div className="flex justify-center gap-5 mb-4">
              {media && media.length > 0 && (
                <>
                  <a
                    href={media[0]?.instagram}
                    target="_blank"
                    className="flex flex-row gap-[8px] items-center"
                  >
                    <img src={instagram_icon} />
                    <span className="font-inter text-[15px] font-[600] leading-[22px]">
                      Instagram
                    </span>
                  </a>
                  <a
                    href={media[0]?.youtube}
                    target="_blank"
                    className="flex flex-row gap-[8px] items-center"
                  >
                    <img src={youtube_icon} />
                    <span className="font-inter text-[15px] font-[600] leading-[22px]">
                      Youtube
                    </span>
                  </a>
                  <a
                    href={media[0]?.telegram}
                    target="_blank"
                    className="flex flex-row gap-[8px] items-center"
                  >
                    <img src={telegram_icon} />
                    <span className="font-inter text-[15px] font-[600] leading-[22px]">
                      Telegram
                    </span>
                  </a>
                </>
              )}
            </div>

            <div className="text-center font-inter font-[500] text-[16px] leading-[22px] text-gray-500">
              {lang == "uz" ? (
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
