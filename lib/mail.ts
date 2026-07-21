import { transporter } from "./transporter";

interface WelcomeEmailProps {
  email: string;
  firstName: string;
}

interface LoginAlertProps {
  email: string;
  firstName: string;
  loginTime?: Date;
  ipAddress?: string;
  userAgent?: string;
}

export async function sendWelcomeEmail({
  email,
  firstName,
}: WelcomeEmailProps) {
  try {
    await transporter.sendMail({
      from: `"GlobalTrust" <${process.env.EMAIL_FROM}>`,

      to: email,

      subject: "🎉 Welcome to GlobalTrust",

      html: `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8" />

<style>
body{
margin:0;
padding:0;
font-family:Arial,sans-serif;
background:#f4f4f4;
}

.container{
max-width:650px;
margin:40px auto;
background:#ffffff;
border-radius:12px;
overflow:hidden;
box-shadow:0 10px 30px rgba(0,0,0,.08);
}

.header{
background:#DC2626;
padding:40px;
text-align:center;
color:white;
}

.content{
padding:40px;
color:#374151;
line-height:1.8;
}

.button{
display:inline-block;
padding:14px 28px;
background:#DC2626;
color:#ffffff !important;
text-decoration:none;
border-radius:8px;
font-weight:bold;
}

.footer{
padding:30px;
text-align:center;
font-size:13px;
color:#6b7280;
background:#fafafa;
}
</style>

</head>

<body>

<div class="container">

<div class="header">

<h1>Welcome to GlobalTrust</h1>

</div>

<div class="content">

<h2>Hello ${firstName},</h2>

<p>

Your account has been successfully created.

</p>

<p>

You can now:

</p>

<ul>

<li>Browse products</li>

<li>Manage your orders</li>

<li>Track deliveries</li>

<li>Save favourite products</li>

<li>Manage your profile securely</li>

</ul>

<p>

<a
href="https://www.ironworks-nz.site/login"
class="button"
>

Login to Your Account

</a>

</p>

<p>

Thank you for choosing GlobalTrust.

</p>

</div>

<div class="footer">

© ${new Date().getFullYear()}
GlobalTrust.
All rights reserved.

</div>

</div>

</body>

</html>
      `,
    });

    return true;
  } catch (error) {
    console.error("Welcome email error:", error);
    return false;
  }
}

export async function sendLoginAlert({
  email,
  firstName,
  loginTime = new Date(),
  ipAddress = "Unknown",
  userAgent = "Unknown Device",
}: LoginAlertProps) {
  try {
    await transporter.sendMail({
      from: `"GlobalTrust Security" <${process.env.EMAIL_FROM}>`,

      to: email,

      subject: "New Login Detected",

      html: `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8"/>

<style>

body{
margin:0;
padding:0;
background:#f5f5f5;
font-family:Arial,sans-serif;
}

.container{
max-width:650px;
margin:40px auto;
background:white;
border-radius:12px;
overflow:hidden;
box-shadow:0 10px 30px rgba(0,0,0,.08);
}

.header{
background:#0F172A;
color:white;
padding:35px;
text-align:center;
}

.content{
padding:40px;
color:#374151;
line-height:1.8;
}

.footer{
padding:25px;
text-align:center;
font-size:13px;
background:#fafafa;
color:#6b7280;
}

.info{
background:#f3f4f6;
padding:20px;
border-radius:8px;
margin-top:20px;
}

</style>

</head>

<body>

<div class="container">

<div class="header">

<h1>Login Notification</h1>

</div>

<div class="content">

<h2>Hello ${firstName},</h2>

<p>

A successful login to your account was detected.

</p>

<div class="info">

<p><strong>Time:</strong> ${loginTime.toLocaleString()}</p>

<p><strong>IP Address:</strong> ${ipAddress}</p>

<p><strong>Device:</strong> ${userAgent}</p>

</div>

<p>

If this was you, no further action is required.

</p>

<p>

If you do not recognize this login, please change your password immediately and contact our support team.

</p>

</div>

<div class="footer">

© ${new Date().getFullYear()}
GlobalTrust Security

</div>

</div>

</body>

</html>
      `,
    });

    return true;
  } catch (error) {
    console.error("Login alert error:", error);
    return false;
  }
}