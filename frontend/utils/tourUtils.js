const cityNames = {
  Tehran: "تهران",
  Sananndaj: "سنندج",
  Madrid: "مادرید",
  Isfahan: "اصفهان",
  Sulaymaniyah: "سلیمانیه",
  Hewler: "هولر",
  Mazandaran: "مازندران",
  Gilan: "گیلان",
  Italy: "ایتالیا",
};

const vehicleNames = {
  bus: "اتوبوس",
  ship: "کشتی",
  train: "قطار",
  airplane: "هواپیما",
  SUV: " شاسی‌بلند",
};

const getPersianCityName = (name) => cityNames[name] || name || "";

const getPersianVehicleName = (vehicle) =>
  vehicleNames[vehicle] || vehicle || "";

const getPersianMonth = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("fa-IR", {
    month: "long",
    calendar: "persian",
  }).format(new Date(date));
};

const getTourDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return "";

  const start = new Date(startDate);
  const end = new Date(endDate);

  const difference = end.getTime() - start.getTime();
  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return days > 0 ? `${days} روزه` : "";
};

const getHotelStars = (options = []) => {
  const hotelOption = options.find((option) => /هتل|هفل/.test(option));

  if (!hotelOption) return "";

  const match = hotelOption.match(/(یک|دو|سه|چهار|پنج|\d+)\s*ستاره/);

  if (!match) return "";

  return `هتل ${match[1]} ستاره`;
};

const formatPersianPrice = (price) => {
  if (price === null || price === undefined || price === "") return "";

  return new Intl.NumberFormat("fa-IR").format(price);
};

export {
  getPersianCityName,
  getPersianVehicleName,
  getPersianMonth,
  getTourDuration,
  getHotelStars,
  formatPersianPrice,
};
