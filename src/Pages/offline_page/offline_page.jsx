import WifiIcon from "./wifi_icon"

const InternetChecker = () => {

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6 scale-[145%]">
        <WifiIcon />
        <h1 className="text-2xl font-medium text-gray-800">Ulanishda xatolik yuz berdi</h1>
        <p className="text-lg text-gray-600">Internet provayderiga ulanganligingizni tekshiring!</p>
      </div>
    </div>
  );
};

export default InternetChecker;
