import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function GET() {
  try {
    const info = await sendEmail({
      to: "onyenaguboanthony9@gmail.com",
      subject: "Ecommerce Test Email",
      html: "<h1>Hello 👋</h1><p>Your Zoho integration is working!</p>",
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully.",
      info,
    });
  } catch (error: unknown) {
    console.error("EMAIL ERROR:", error);

    // Cast error to safely access dynamic properties if present (e.g. nodemailer/zoho errors)
    const err = error as { message?: string; code?: string | number; response?: unknown };

    return NextResponse.json(
      {
        success: false,
        error: err.message ?? "An unexpected error occurred",
        code: err.code,
        response: err.response,
      },
      { status: 500 }
    );
  }
}