import { useEffect, useState } from "react";

function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkNetworkStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // بررسی وضعیت اینترنت هنگام اجرای کامپوننت
    checkNetworkStatus();

    // بررسی قطع و وصل شدن اینترنت
    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus);

    // پاک کردن Event Listenerها هنگام خروج کامپوننت
    return () => {
      window.removeEventListener("online", checkNetworkStatus);
      window.removeEventListener("offline", checkNetworkStatus);
    };
  }, []);

  return isOnline;
}

export default useNetworkStatus;
