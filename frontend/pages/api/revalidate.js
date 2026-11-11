import { getTours } from "../../services/tourService";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    await getTours();

    return res.status(200).json({
      success: true,
      message: "ارتباط با سرور برقرار است.",
    });
  } catch (error) {
    console.error("Retry error:", error);

    return res.status(503).json({
      success: false,
      message: "ارتباط با سرور برقرار نشد.",
    });
  }
}
