const express = require('express');
const jwt = require('jsonwebtoken');
const Fraude = require('../models/Fraude');
const router = express.Router();

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(403);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.sendStatus(403);
  }
}

router.post('/', auth, async (req, res) => {
  const { type, description } = req.body;
  const fraude = new Fraude({ type, description, signalePar: req.user.username });
  await fraude.save();
  req.io.emit('nouvelleFraude', fraude);
  res.status(201).json(fraude);
});

router.get('/', async (req, res) => {
  const fraudes = await Fraude.find().sort({ dateSignalement: -1 });
  res.json(fraudes);
});

module.exports = router;