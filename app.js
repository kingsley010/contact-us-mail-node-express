import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cors from 'cors';

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
    user: process.env.DB_MAIL,
    pass: process.env.DB_PASS
  }
});

var mailOptions = {
  from: data.email,
  to: process.env.DB_MAIL,
  subject: 'You have a new message',
  html: `<p>${data.name}</p>
          <p>${data.email}</p>
          <p>${data.message}</p>`
};

// verify connection configuration
smtpTransport.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});


smtpTransport.sendMail(mailOptions,
(error, response) => {
  if(error) {
    console.log(error);
    res.send(error)
  } else {
    console.log('success');
    res.send('Success')
  }
  smtpTransport.close();
});

});
