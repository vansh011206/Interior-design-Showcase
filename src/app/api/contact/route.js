import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { firstName, lastName, email, service, message } = await req.json();

    if (!firstName || !lastName || !email || !service) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error("Missing email SMTP credentials in environment variables.");
      return Response.json({ error: "Email service configuration error." }, { status: 500 });
    }

    // Initialize the transporter using Gmail SMTP with the credentials from process.env
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    // 1. Themed confirmation HTML email for the Client
    const clientMailOptions = {
      from: `"DAROS Design Group" <${emailUser}>`,
      to: email,
      subject: "Consultation Request Received | DAROS",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Consultation Requested | DAROS</title>
  <style>
    body {
      background-color: #F5F0E8;
      color: #1A1A1A;
      font-family: Georgia, serif;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      background-color: #F5F0E8;
      width: 100%;
      padding: 40px 0;
    }
    .container {
      background-color: #F5F0E8;
      max-width: 600px;
      margin: 0 auto;
      padding: 40px;
      border: 1px solid rgba(214, 200, 190, 0.5);
    }
    .logo {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 30px;
      text-align: center;
      color: #1A1A1A;
    }
    .divider {
      height: 1px;
      background-color: #C8BFB0;
      width: 60px;
      margin: 0 auto 30px auto;
    }
    .greeting {
      font-size: 18px;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .message {
      font-size: 14px;
      line-height: 1.8;
      color: #6B6560;
      margin-bottom: 30px;
    }
    .details-box {
      background-color: #EFE9DF;
      padding: 20px;
      margin-bottom: 30px;
      border-left: 3px solid #C8BFB0;
    }
    .details-title {
      font-size: 10px;
      letter-spacing: 0.25em;
      color: #9A8F82;
      text-transform: uppercase;
      margin-bottom: 8px;
      font-family: sans-serif;
      font-weight: bold;
    }
    .details-value {
      font-size: 13px;
      color: #1A1A1A;
      margin-bottom: 15px;
    }
    .details-value:last-child {
      margin-bottom: 0;
    }
    .closing {
      font-size: 14px;
      line-height: 1.8;
      color: #1A1A1A;
    }
    .italic {
      font-style: italic;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      font-size: 10px;
      letter-spacing: 0.15em;
      color: #9A8F82;
      text-transform: uppercase;
      font-family: sans-serif;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="logo">DAROS</div>
      <div class="divider"></div>
      
      <div class="greeting">
        Dear ${firstName} ${lastName},
      </div>
      
      <div class="message">
        Thank you for requesting a consultation with DAROS. We are delighted by your interest in our architectural design curations. Our team has received your message and is already reviewing your details.
      </div>
      
      <div class="details-box">
        <div class="details-title">SERVICE REQUESTED</div>
        <div class="details-value">${service}</div>
        
        <div class="details-title">YOUR MESSAGE</div>
        <div class="details-value" style="font-style: italic;">&ldquo;${message || "No description provided."}&rdquo;</div>
      </div>
      
      <div class="message">
        A design advisor will contact you within 24 hours to schedule our conversation and begin exploring your space coordinates.
      </div>
      
      <div class="closing">
        Warm regards,<br>
        <span class="italic">The DAROS Design Group</span>
      </div>
      
      <div class="footer">
        DAROS &bull; SPATIAL HARMONY &amp; ARCHITECTURAL CLARITY
      </div>
    </div>
  </div>
</body>
</html>
      `
    };

    // 2. Lead notification email for the Admin (Studio)
    const adminMailOptions = {
      from: `"DAROS System" <${emailUser}>`,
      to: emailUser,
      subject: `New Lead: ${firstName} ${lastName} - ${service}`,
      html: `
        <h3>New Consultation Inquiry</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service Requested:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${message || "No description provided."}</blockquote>
      `
    };

    // Deliver client confirmation and admin alert concurrently
    await Promise.all([
      transporter.sendMail(clientMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    return Response.json({ success: true });
  } catch (err) {
    console.error("Email API Error:", err);
    return Response.json({ error: err.message || "Failed to send email" }, { status: 500 });
  }
}
