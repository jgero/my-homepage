import { createTransport } from 'nodemailer';
// Import the Secret Manager client and instantiate it:
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

export async function post(req, res) {
  // get the data from the post body
  const data = req.body;

  let responsePayloadAddress;
  let responsePayloadPassword;
  try {
    // access the secrets from google cloud
    const [accessResponseAddress] = await client.accessSecretVersion({
      name:
        'projects/webpage-jgero/secrets/contact-bot-email-address/versions/latest',
    });
    responsePayloadAddress = accessResponseAddress.payload.data.toString(
      'utf8'
    );
    const [accessResponsePassword] = await client.accessSecretVersion({
      name:
        'projects/webpage-jgero/secrets/contact-bot-email-password/versions/latest',
    });
    responsePayloadPassword = accessResponsePassword.payload.data.toString(
      'utf8'
    );
  } catch (e) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ success: false, message: e.message }));
    return;
  }

  // create a nodemailer transporter
  const transporter = createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    auth: {
      user: responsePayloadAddress,
      pass: responsePayloadPassword,
    },
  });

  // set name as heading
  let htmlMessage = `<h1>Message from: ${data.name}</h1>`;
  // set message as paragraph
  htmlMessage += `<p>${data.message}</p>`;

  let mailOptions = {
    from: responsePayloadAddress,
    replyTo: data.email,
    to: 'mail@jgero.me',
    cc: '',
    subject: '[my webpage] contact form submission',
    html: htmlMessage,
  };
  transporter
    .sendMail(mailOptions)
    .then(() => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ success: true }));
    })
    .catch((e) => {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ success: false, message: e.message }));
    });
}
