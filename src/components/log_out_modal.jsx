import React from "react";

const LogOutModal = ({ isOpen, onClose, setUserSignIn }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed w-full scale-[100%] sm:scale-[1.4] inset-0 flex items-center justify-center z-50">
        <div
          className="fixed inset-0 bg-black opacity-70"
          onClick={onClose}
        />
      <div className="relative z-10 bg-white text-center w-[300px] p-4 rounded-lg shadow-lg">
        <h2 className="text-[20px] font-semibold mb-2">Chiqishni tasdiqlang</h2>
        <p className="mb-6">Xaqiqatdan ham accauntdan chiqilsinmi ?</p>
        <div className="flex justify-center gap-10 text-[20px]">
        <button
            className="px-5 py-2 text-red-500 bg-white rounded cursor-pointer hover:bg-gray-200"
            onClick={() => {
              setUserSignIn(false);
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("accessToken");
              localStorage.removeItem("userId");
              localStorage.removeItem("likedProducts");
              onClose();
            }}
          >
            Ha
          </button>
          <button
            className="px-5 py-2 text-black bg-white rounded cursor-pointer hover:bg-gray-200"
            onClick={onClose}
          >
            Yo'q
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
