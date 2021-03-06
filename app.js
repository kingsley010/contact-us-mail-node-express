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


app.get('/', (req, res) => {
  res.send('Welcome to my api');
})

app.post('/api/v1', (req,res) => {
  var data = req.body;

var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  auth: {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
  }
});

var mailOptions = {
  from: data.email,
  to: process.env.DB_MAIL,
  subject: process.env.DB_SUB,
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

})
