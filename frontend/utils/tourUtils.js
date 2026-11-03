// تبدیل نام شهرها به فارسی
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

// تبدیل نوع وسیله نقلیه به فارسی
const vehicleNames = {
  bus: "اتوبوس",
  ship: "کشتی",
  train: "قطار",
  airplane: "هواپیما",
  SUV: " شاسی‌بلند",
};

// دریافت نام فارسی شهر
const getPersianCityName = (name) => cityNames[name] || name || "";

// دریافت نام فارسی وسیله نقلیه
const getPersianVehicleName = (vehicle) => vehicleNames[vehicle] || vehicle;

export { getPersianCityName, getPersianVehicleName };
