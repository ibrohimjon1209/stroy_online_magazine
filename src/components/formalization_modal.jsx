import click from "../Pages/Formalization/imgs/click.png";
import payme from "../Pages/Formalization/imgs/pay_me.png";

const Modal = ({ is_modal_open, set_is_modal_open, method }) => {
  if (!is_modal_open) return null;

  if (method == "cash") {
    return (
      <div className="fixed w-full scale-[100%] sm:scale-[1.4] inset-0 flex items-center justify-center z-50">
        <div
          className="fixed inset-0 bg-black opacity-70"
          onClick={() => {
            set_is_modal_open(false);
            window.location.reload();
          }}
        />

        <div className="bg-white scale-[0.85] rounded-lg p-6 w-[310px] h-[350px] relative z-10 mx-4 shadow-lg">
          <div className="flex flex-col items-center h-full text-center justify-evenly">
            <div className="flex items-center justify-center w-20 h-20 mb-4 bg-green-400 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-white h-15"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 13l4 4L19 7"
                  strokeDasharray="24"
                  strokeDashoffset="24"
                  className="animate-[dash_0.8s_ease-out_0.15s_forwards]"
                />
              </svg>
            </div>

            <p className="mb-6 font-inter font-[600] text-[15px] leading-[26px]">
              Tanlovingiz uchun rahmat, tez orada operator siz bilan bog'lanadi!
            </p>

            <button
              onClick={() => {
                set_is_modal_open(false);                
                localStorage.setItem("online_pay", "false");
                window.location.reload();
              }}
              className="w-[70%] py-2 bg-[#FFDF02] border border-[#D5D5D5] cursor-pointer rounded hover:scale-[102%] active:scale-[98%] duration-200"
            >
              Yopish
            </button>
          </div>
        </div>

        <style>
          {`
          @keyframes dash {
            from {
              stroke-dashoffset: 24;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
        </style>
      </div>
    );
  } else {
    return (
      <div className="fixed w-full scale-1 sm:scale-[1.4] inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-70" />

        <div className="relative flex items-center justify-center w-35 h-35 scale-[130%]">
          <div
            className={`absolute w-full h-full ${
              method == "click" ? "bg-blue-600" : "bg-sky-300"
            } rounded-full animate-ping`}
          ></div>
          <div
            className={`${
              method == "click" ? "relative" : "hidden"
            } w-auto h-auto bg-white rounded-full py-13.5 px-10`}
          >
            <div className="flex flex-row items-center justify-center gap-[7px]">
              <img src={click} alt="click" className="w-6 h-6" />
              <p className="text-[18px] font-semibold">Click</p>
            </div>
          </div>
          <div
            className={`${
              method == "payme" ? "relative" : "hidden"
            } w-auto h-auto bg-sky-200 rounded-full py-14 px-10`}
          >
            <div className="flex flex-row items-center justify-center gap-[7px]">
              <img src={payme} alt="payme" className="w-6 h-6" />
              <p className="text-[18px] text-sky-950 font-semibold whitespace-nowrap">
                Pay me
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;
