const Modal = ({ is_modal_open, set_is_modal_open }) => {
  if (!is_modal_open) return null;

  return (
    <div className="fixed w-full scale-1 sm:scale-[1.4] inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-70"
        onClick={() => set_is_modal_open(false)}
      />

      <div className="bg-white scale-[0.85] rounded-lg p-6 w-[310px] h-[350px] relative z-10 mx-4 shadow-lg">
        <div className="flex flex-col items-center h-full justify-evenly text-center">
          <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-15 text-white"
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
            onClick={() => set_is_modal_open(false)}
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
};

export default Modal;
