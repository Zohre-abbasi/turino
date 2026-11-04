import { getTours } from "../../services/tourService";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    // بررسی ارتباط با بک‌اند
    await getTours();

    // بازتولید صفحه اصلی با استفاده از ISR
    await res.revalidate("/");

    return res.status(200).json({
      success: true,
      message: "صفحه اصلی با موفقیت به‌روزرسانی شد.",
    });
  } catch (error) {
    console.error("Revalidation error:", error);

    return res.status(503).json({
      success: false,
      message: "ارتباط با سرور برقرار نشد.",
    });
  }
}
