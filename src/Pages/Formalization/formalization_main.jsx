import { Check, ChevronRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import photo from "./imgs/photo.png";
import arrive_icon from "./imgs/arrive_icon.png";
import cash_icon from "./imgs/cash_icon.png";
import payment_time from "./imgs/payment_time.png";
import on_arrive from "./imgs/on_arrive.png";
import pay_me from "./imgs/pay_me.png";
import click from "./imgs/click.png";
import alif_icon from "./imgs/alif.png";
import Modal from "./modal";
import { useState } from "react";

const Formalization_main = ({userSignIn}) => {
  const [deliver_type, set_deliver_type] = useState("bring");
  const [selectedMethod, setSelectedMethod] = useState("installment");
  const [is_modal_open, set_is_modal_open] = useState(false);
  return (
    <div className="w-[76%] mx-auto bg-white mb-[20px]">
      <div className="p-6 pt-[35px]">
        <h2 className="font-inter font-[600] text-[15px] leading-[22px] text-black">
          Qabul qiluvchi
        </h2>

        {userSignIn ? (
            <div className="border border-[#D5D5D5] rounded-lg p-4 mt-[20px] mb-6 w-[40%] h-[70px] flex items-center justify-start">
            <div className="flex items-center gap-3">
              <div className="bg-gray-300 rounded-full p-2">
                <User className="h-[23px] w-[23px] text-gray-600" />
              </div>
              <div>
                <p className="font-inter font-[600] text-[15px] leading-[22px] text-black">
                  Nuraliyev Muhammad Sodiq
                </p>
                <p className="font-inter font-[500] text-[13px] leading-[22px] text-black">
                  +998 90 762 92 82
                </p>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/enter">
            <div className="border bg-[#FFDF02] border-[#D5D5D5] rounded-lg p-4 mt-[20px] mb-6 w-[40%] h-[70px] flex items-center justify-center hover:scale-[101%] active:scale-[99%] duration-300">
              <p className="font-inter font-[600] text-[24px] leading-[22px] text-black">
                Kirish
              </p>
            </div>
          </Link>
        )}

        <div className="flex gap-[35px] mb-6 mt-[20px]">
          <div className="bg-gray-100 rounded-lg w-[150px] h-[150px] flex items-center justify-center">
            <img
              src={photo}
              alt="PENOPLEX COMFORT"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-[50px] font-inter font-[600] text-[24px] leading-[22px] text-black">
            <div>
              <h3>PENOPLEX COMFORT</h3>
              <p className="mt-[25px]">125.650 so'm</p>
            </div>
            <p>1 dona</p>
          </div>
        </div>

        <div className="relative flex p-1 bg-gray-100 rounded-xl mt-[35px] mb-4 h-[60px] w-[95%] mx-auto font-inter font-[500] text-[18px] leading-[22px] text-black">
          <button
            onClick={() => set_deliver_type("bring")}
            className={`flex-1 py-2.5 text-center rounded-lg font-medium cursor-pointer ${
              deliver_type === "bring"
                ? "bg-white shadow-sm duration-500"
                : "text-gray-500"
            }`}
          >
            Olib ketish
          </button>
          <button
            onClick={() => set_deliver_type("deliver")}
            className={`flex-1 py-2.5 text-center rounded-lg font-medium cursor-pointer ${
              deliver_type === "deliver"
                ? "bg-white shadow-sm duration-500"
                : "text-gray-500"
            }`}
          >
            Yetkazib berish
          </button>
        </div>

        <div className="border border-[#D5D5D5] rounded-lg mb-4 mt-[35px] w-[95%] mx-auto hover:scale-[1.008] active:scale-[1] duration-300">
          <Link to="/delivery" className="flex items-center justify-between w-full p-4 cursor-pointer">
            <div className="flex items-center gap-3">
              <img
                src={arrive_icon}
                alt="arrive"
                className="h-[25px] w-[25px] object-contain"
              />
              <span className="font-medium">
                Yetkazib berish manzilini tanlang
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        </div>

        <div className="border border-[#D5D5D5] rounded-lg mb-4 mt-[30px] w-[95%] mx-auto hover:scale-[1.008] active:scale-[1] duration-300">
          <div className="flex items-center justify-between w-full p-4 cursor-pointer">
            <div className="flex items-center gap-3">
              <img
                src={cash_icon}
                alt="cash"
                className="h-[25px] w-[25px] object-contain"
              />
              <span className="font-medium">Keshbekni ishlatish</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">15.000 UZS</span>
              <div className="bg-green-500 rounded-full p-1">
                <Check className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[95%] mx-auto p-4 -mt-[20px]">
        <h1 className="font-inter font-[600] text-[15px] leading-[22px] text-black mb-4">
          To'lov usuli
        </h1>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-[#D5D5D5] w-[90%] rounded-lg p-4 bg-white">
            <div className="space-y-4">
              
              <div
                className="flex cursor-pointer items-center justify-between p-2"
                onClick={() => setSelectedMethod("click")}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={click}
                    alt="Click"
                    className="w-8 h-8 object-contain"
                  />
                  <span className="font-inter font-[600] text-[15px] leading-[22px] text-black">
                    Click
                  </span>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-[2px] border-[#BEA086] cursor-pointer duration-300 ${
                    selectedMethod === "click" ? "bg-[#BEA086]" : ""
                  }`}
                >
                  {selectedMethod === "click" && (
                    <Check className="text-white w-4 h-4" />
                  )}
                </div>
              </div>

              <div
                className="flex items-center justify-between p-2 cursor-pointer"
                onClick={() => setSelectedMethod("payme")}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={pay_me}
                    className="w-8 h-8 object-contain"
                    alt="Payme"
                  />
                  <span className="font-inter font-[600] text-[15px] leading-[22px] text-black">
                    Pay me
                  </span>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-[2px] border-[#BEA086] cursor-pointer duration-300 ${
                    selectedMethod === "payme" ? "bg-[#BEA086]" : ""
                  }`}
                >
                  {selectedMethod === "payme" && (
                    <Check className="text-white w-4 h-4" />
                  )}
                </div>
              </div>

              {/* Qabul qilinganda method */}
              <div
                className="flex items-center justify-between p-2 cursor-pointer"
                onClick={() => setSelectedMethod("qabul")}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={on_arrive}
                    alt="Qabul qilinganda"
                    className="w-8 h-8 object-contain"
                  />
                  <span className="font-inter font-[600] text-[15px] leading-[22px] text-black">
                    Qabul qilinganda
                  </span>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-[2px] border-[#BEA086] cursor-pointer duration-300 ${
                    selectedMethod === "qabul" ? "bg-[#BEA086]" : ""
                  }`}
                >
                  {selectedMethod === "qabul" && (
                    <Check className="text-white w-4 h-4" />
                  )}
                </div>
              </div>

              <div
                className="flex items-center justify-between p-2 cursor-pointer bg-gray-50 rounded-md"
                onClick={() => setSelectedMethod("installment")}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={payment_time}
                    alt="Muddatli to'lov"
                    className="w-8 h-8"
                  />
                  <span className="font-inter font-[600] text-[15px] leading-[22px] text-black">
                    Muddatli to'lov
                  </span>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-[2px] border-[#BEA086] cursor-pointer duration-300 ${
                    selectedMethod === "installment" ? "bg-[#BEA086]" : ""
                  }`}
                >
                  {selectedMethod === "installment" && (
                    <Check className="text-white w-4 h-4" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {selectedMethod === "installment" && (
            <div className="border border-[#D5D5D5] rounded-lg w-[90%] p-[27px] bg-white">
              <div className="flex justify-between items-center mb-6">
                <div className="flex flex-row gap-3">
                  <img
                    src={alif_icon}
                    className="w-10 h-10 object-contain rounded-[5px]"
                    alt=""
                  />
                  <div className="flex flex-col h-[30px] -mt-[2px]">
                    <span className="font-inter font-[500] text-[16px] leading-[22px] text-black">
                      Muddatli to'lov turi
                    </span>
                    <span className="font-inter font-[600] text-[16px] leading-[22px] text-black">
                      Alif
                    </span>
                  </div>
                </div>
                <Link to="/payment-variant" className="cursor-pointer hover:underline font-inter font-[600] text-[16px] leading-[22px] text-[#000000BF]">
                  Taxrirlash
                </Link>
              </div>
              <hr className="border-[#D5D5D5]" />
              <div className="mt-5 flex flex-col gap-[46px] font-inter font-[600] text-[16px] leading-[22px] text-[#000000BF]">
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between">
                    <span>Oylik to'lov</span>
                    <span>119.250 so'm</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Muddatli to'lov</span>
                    <span>12oy</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span>Jami</span>
                  <span>1.431.000so'm</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-[97%] mx-auto p-6">
        <div className="space-y-10">
          <h2 className="font-inter font-[600] text-[24px] leading-[22px] text-black">
            Sizning buyurtmangiz
          </h2>

          <div className="space-y-5 w-[100%] text-[#000000BF] font-inter font-[500] text-[20px] leading-[22px]">
            <div className="flex justify-between items-center">
              <span>1 ta maxsulot narxi</span>
              <span>1.431.000so'm</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Muddatli to'lov</span>
              <span>12oy</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Muddatli to'lov</span>
              <span>119.250so'm</span>
            </div>

            <hr className="border-[#D5D5D5] border-[1.5px] my-[23px]" />

            <div className="flex justify-between items-center">
              <span>Jami</span>
              <span>1.431.000so'm</span>
            </div>
          </div>

          <button onClick={() => set_is_modal_open(true)} className="w-full py-6 bg-[#DCC38B] font-inter font-[600] text-[22px] leading-[22px] text-black rounded-[10px] cursor-pointer hover:scale-[101%] active:scale-[99%] duration-300">
            Xaridni rasmiylashtirish
          </button>

          <div className="text-center font-inter font-[400] text-[18px] leading-[33px]">
            Buyurtmani tasdiqlash orqali men{" "}
            <Link to="/terms" className="text-purple-600 hover:underline">
              foydalanuvchi <br /> shartnomasini
            </Link>{" "}
            shartlarini qabul qilaman.
          </div>
        </div>
      </div>
      <Modal is_modal_open={is_modal_open} set_is_modal_open={set_is_modal_open} />
    </div>
  );
};

export default Formalization_main;
