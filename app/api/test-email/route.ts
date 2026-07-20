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
  } catch (error: any) {
    console.error("EMAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
        response: error.response,
      },
      { status: 500 }
    );
  }
}