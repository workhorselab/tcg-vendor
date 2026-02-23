interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: SendEmailOptions) {
  if (process.env.NODE_ENV === "production" && process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM ?? "noreply@example.com",
        to,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Failed to send email:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    return res.json();
  }

  console.log("\n╔══════════════════════════════════════════╗");
  console.log("║           📧  DEV EMAIL                  ║");
  console.log("╠══════════════════════════════════════════╣");
  console.log(`║  To:      ${to}`);
  console.log(`║  Subject: ${subject}`);
  console.log("╠══════════════════════════════════════════╣");
  console.log(`║  ${text}`);
  console.log("╚══════════════════════════════════════════╝\n");
}
