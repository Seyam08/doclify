import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ADMIN_SENDER_EMAIL_USERNAME,
    pass: process.env.ADMIN_SENDER_EMAIL_PASSWORD,
  },
});
