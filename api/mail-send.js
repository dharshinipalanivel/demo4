import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,  
        pass: process.env.MAIL_PASS   
      }
    });

    await transporter.sendMail({
      from: email,
      to: "selvipalanivel1972@gmail.com",
      subject: `New Form Submission: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log("Mail error:", err);
    return res.status(500).json({ success: false, error: "Failed to send" });
  }
}
