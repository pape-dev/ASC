const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const sendSMS = require('../utils/sendSMS'); // vérifie que ce chemin est bon

router.post('/', async (req, res) => {
  try {
    const { nom, prenom, email, telephone, region, objet, message, rgpd } = req.body;

    if (!nom || !prenom || !email || !telephone || !region || !objet || !message || rgpd !== true) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires et la politique doit être acceptée.' });
    }

    const contact = new Contact({ nom, prenom, email, telephone, region, objet, message, rgpd });
    await contact.save();

    // Envoi du SMS au numéro utilisateur
    await sendSMS(telephone, `Bonjour ${prenom}, merci pour votre message. Nous reviendrons vers vous rapidement.`);

    res.status(201).json({ message: 'Message enregistré et SMS de confirmation envoyé.' });
  } catch (err) {
    console.error('Erreur dans /api/contact:', err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

module.exports = router;
