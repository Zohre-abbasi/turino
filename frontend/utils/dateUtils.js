const formatPersianDate = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    calendar: "persian",
  }).format(new Date(date));
};

const formatPersianDateWithWeekday = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  const weekday = new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
  }).format(parsedDate);

  const day = new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    calendar: "persian",
  }).format(parsedDate);

  const month = new Intl.DateTimeFormat("fa-IR", {
    month: "long",
    calendar: "persian",
  }).format(parsedDate);

  const year = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    calendar: "persian",
  }).format(parsedDate);

  return `${weekday} ${day} ${month} ${year}`;
};

const formatApiDate = (date) => {
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const parseApiDate = (dateString) => {
  if (!dateString) return null;

  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
};

const getTourStatus = (startDate, endDate) => {
  if (!startDate || !endDate) return "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  if (today < start) {
    return "در انتظار شروع";
  }

  if (today > end) {
    return "به اتمام رسیده";
  }

  return "در حال برگزاری";
};
const formatPersianDateTime = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  const time = new Intl.DateTimeFormat("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(parsedDate);

  const persianDate = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    calendar: "persian",
  }).format(parsedDate);

  return `${time} - ${persianDate}`;
};

export {
  formatPersianDate,
  formatPersianDateWithWeekday,
  formatApiDate,
  parseApiDate,
  getTourStatus,
  formatPersianDateTime
};
