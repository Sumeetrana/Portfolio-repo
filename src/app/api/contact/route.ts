import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, company, budget, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "sumeetsinh28@gmail.com",
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` · ${company}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f1a; color: #e2e8f0; padding: 32px; border-radius: 12px; border: 1px solid #312e81;">
          <h2 style="color: #818cf8; margin: 0 0 24px;">New message from your portfolio</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; width: 120px;">Name</td>
              <td style="padding: 8px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #818cf8;">${email}</a></td>
            </tr>
            ${company ? `<tr>
              <td style="padding: 8px 0; color: #94a3b8;">Company</td>
              <td style="padding: 8px 0;">${company}</td>
            </tr>` : ""}
            ${budget ? `<tr>
              <td style="padding: 8px 0; color: #94a3b8;">Budget</td>
              <td style="padding: 8px 0;">${budget}</td>
            </tr>` : ""}
          </table>

          <div style="margin-top: 24px; padding: 20px; background: #1e1b4b; border-radius: 8px; border-left: 3px solid #6366f1;">
            <p style="color: #94a3b8; margin: 0 0 8px; font-size: 13px;">MESSAGE</p>
            <p style="margin: 0; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="margin-top: 24px; font-size: 12px; color: #475569;">
            Sent from sumeetrana.com · Reply directly to this email to respond to ${name}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Email sent:", data?.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
