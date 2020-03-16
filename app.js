import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cors from 'cors';

require('dotenv').config();

const app = express();

const port = 4444;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(port, () => {
  console.log('We are live on port 4444');
});


app.get('/api/v1', (req, res) => {
  res.send('Welcome to my app');
});

app.post('/api/v1', (req,res) => {
  var data = req.body;

var smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.DB_SERVER,
    pass: process.env.DB_PASS
  }
});

var mailOptions = {
  from: 'server',
  to: process.env.DB_CLIENT,
  subject: 'You have a new message',
  html: `<p>${data.name}</p>
          <p>${data.email}</p>
          <p>${data.message}</p>`
};

smtpTransport.sendMail(mailOptions,
(error, response) => {
  if(error) {
    res.send(error)
  } else {
    res.send('Success')
  }
  smtpTransport.close();
});

});
