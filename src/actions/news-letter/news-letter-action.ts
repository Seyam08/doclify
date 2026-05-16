import { transport } from "@/lib/nodemailer/config";
import { ServerActionResponse } from "@/types/global-types";
import { newsLetterSchema } from "@/zod-schemas/schema";
import z from "zod";

export async function sendNewsLetter(
  data: z.infer<typeof newsLetterSchema>,
): Promise<ServerActionResponse<undefined>> {
  if (
    !process.env.ADMIN_SENDER_EMAIL_USERNAME ||
    !process.env.ADMIN_SENDER_EMAIL_PASSWORD
  ) {
    throw new Error(
      "Email service is not configured (missing ADMIN_SENDER_EMAIL_USERNAME / ADMIN_SENDER_EMAIL_PASSWORD).",
    );
  }

  if (!process.env.ADMIN_RECEIVER_EMAIL) {
    throw new Error(
      "Email service is not configured (missing ADMIN_RECEIVER_EMAIL).",
    );
  }

  const validateData = newsLetterSchema.safeParse(data);
  if (validateData.success === false) {
    return {
      success: false,
      message: "Invalid input.",
    } satisfies ServerActionResponse;
  }

  const { name, email } = validateData.data;

  const subscribedAt = new Date().toISOString();

  const userMailData = {
    from: process.env.ADMIN_SENDER_EMAIL_USERNAME,
    to: email,
    subject: `Welcome to Doclify — ${name}`,
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Welcome to Doclify</title>
      </head>
      <body style="font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #1f2937;">
        <div style="max-width:600px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;background:#ffffff;">
          <h2 style="margin:0 0 8px;color:#111827">Welcome to Doclify</h2>
          <p style="margin:0 0 12px">Hi ${name},</p>
          <p style="margin:0 0 12px">Thanks for subscribing to the Doclify newsletter. We'll send curated blog updates and tips to <strong>${email}</strong>.</p>
          <p style="margin:0 0 12px">If you didn't subscribe, you can ignore this email or contact us at <a href=\"mailto:${process.env.ADMIN_RECEIVER_EMAIL}\">${process.env.ADMIN_RECEIVER_EMAIL}</a>.</p>
          <p style="margin:16px 0 0;color:#6b7280;font-size:13px">— The Doclify Team</p>
        </div>
      </body>
    </html>`,
  };

  const adminMailData = {
    from: process.env.ADMIN_SENDER_EMAIL_USERNAME,
    to: process.env.ADMIN_RECEIVER_EMAIL,
    subject: `Doclify — New subscriber: ${name}`,
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Doclify - New subscriber</title>
      </head>
      <body style="font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color:#111827;">
        <div style="max-width:600px;margin:0 auto;padding:20px;border-radius:8px;background:#fff;border:1px solid #e6e6e6;">
          <h3 style="margin:0 0 8px">New newsletter subscriber</h3>
          <p style="margin:0 0 6px"><strong>Name:</strong> ${name}</p>
          <p style="margin:0 0 6px"><strong>Email:</strong> ${email}</p>
          <p style="margin:0 0 6px"><strong>Subscribed at:</strong> ${subscribedAt}</p>
          <p style="margin:12px 0 0;color:#6b7280;font-size:13px">View subscriber list in the admin panel.</p>
        </div>
      </body>
    </html>`,
  };

  try {
    await transport.sendMail(userMailData);
    await transport.sendMail(adminMailData);
    return {
      success: true,
      message: "Newsletter emails sent.",
    } satisfies ServerActionResponse;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      message: "Failed to send email.",
    } satisfies ServerActionResponse;
  }
}
