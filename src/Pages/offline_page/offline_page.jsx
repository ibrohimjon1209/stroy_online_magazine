import wifi_icon from "./wifi_icon.svg";

const InternetChecker = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white sm:mt-0 -mt-[30px]">
      <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 sm:scale-[145%]">
        <img src={wifi_icon} />
        <h1 className="text-[24px] sm:text-2xl font-medium text-gray-800">
          Ulanishda xatolik yuz berdi
        </h1>
        <p className="leading-[22px] text-lg text-gray-600 sm:block hidden">
          Internet provayderiga ulanganligingizni tekshiring!
        </p>
        <p className="text-[16px] leading-[22px] text-gray-600 sm:hidden block text-center">
          Internet provayderiga ulanganligingizni <br /> tekshiring!
        </p>
      </div>
    </div>
  );
};

export default InternetChecker;
