import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,

  port: Number(process.env.SMTP_PORT),

  secure: false,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function verifyTransporter() {
  try {
    await transporter.verify();

    console.log("✅ Zoho SMTP Connected");
  } catch (error) {
    console.error("❌ SMTP Error:", error);
  }
}