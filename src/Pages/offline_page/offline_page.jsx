import { useState, useEffect } from "react";

const InternetChecker = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      {!isOnline && (
        <p className="bg-red-500 text-white p-2 text-center">
          Ulanishda xatolik yuz berdi<br />
          Internet provayderiga ulanganligingizni tekshiring!
        </p>
      )}
    </div>
  );
};

export default InternetChecker;
