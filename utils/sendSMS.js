// sendSMS.js
const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log('✅ SMS envoyé avec succès:', message.sid);
  } catch (error) {
    console.error('❌ Erreur envoi SMS:', error.message);
  }
};
module.exports = sendSMS;
