import * as yup from "yup";

// اعتبارسنجی ایمیل
export const emailSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("وارد کردن ایمیل الزامی است.")
    .email("لطفاً یک آدرس ایمیل معتبر وارد کنید."),
});

// اعتبارسنجی اطلاعات شخصی
export const personalInfoSchema = yup.object({
  firstName: yup.string().trim().required("وارد کردن نام الزامی است."),

  lastName: yup.string().trim().required("وارد کردن نام خانوادگی الزامی است."),

  nationalCode: yup
    .string()
    .required("وارد کردن کد ملی الزامی است.")
    .matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد."),

  gender: yup
    .string()
    .required("انتخاب جنسیت الزامی است.")
    .oneOf(["male", "female"], "جنسیت انتخاب‌شده معتبر نیست."),

  birthDate: yup.string().required("انتخاب تاریخ تولد الزامی است."),
});

// اعتبارسنجی اطلاعات بانکی
export const bankInfoSchema = yup.object({
  shaba_code: yup
    .string()
    .trim()
    .required("وارد کردن شماره شبا الزامی است.")
    .matches(
      /^(IR)?\d{24}$/,
      "شماره شبا باید شامل ۲۴ رقم و در صورت نیاز پیشوند IR باشد.",
    ),

  accountIdentifier: yup
    .string()
    .trim()
    .required("وارد کردن شماره حساب الزامی است.")
    .matches(/^\d{6,}$/, "شماره حساب باید حداقل ۶ رقم باشد."),

  debitCard_code: yup
    .string()
    .trim()
    .required("وارد کردن شماره کارت الزامی است.")
    .matches(/^\d{16}$/, "شماره کارت باید ۱۶ رقم باشد."),
});
// اعتبارسنجی اطلاعات مسافر در صفحه تسویه‌حساب
export const passengerSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("وارد کردن نام و نام خانوادگی الزامی است.")
    .test("fullName", "لطفاً نام و نام خانوادگی را وارد کنید.", (value) => {
      return value && value.trim().split(/\s+/).length >= 2;
    }),

  nationalCode: yup
    .string()
    .required("وارد کردن کد ملی الزامی است.")
    .matches(/^[0-9۰-۹٠-٩]{10}$/, "کد ملی باید ۱۰ رقم باشد."),

  gender: yup
    .string()
    .required("انتخاب جنسیت الزامی است.")
    .oneOf(["male", "female"], "جنسیت انتخاب‌شده معتبر نیست."),

  birthDate: yup.string().required("انتخاب تاریخ تولد الزامی است."),
});

// اعتبارسنجی شماره موبایل
export const loginSchema = yup.object({
  mobile: yup
    .string()
    .trim()
    .required("وارد کردن شماره موبایل الزامی است.")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر وارد کنید."),
});
