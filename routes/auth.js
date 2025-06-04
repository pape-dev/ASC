const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
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

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();
  res.status(201).json({ message: 'Utilisateur créé' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Identifiants invalides' });
  }
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
  res.json({ token });
});

// Récupérer le profil utilisateur connecté
router.get('/me', auth, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).select('-password');
  if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
  res.json(user);
});

// Modifier le profil utilisateur connecté
router.put('/me', auth, async (req, res) => {
  const { nom, prenom, email } = req.body;
  const user = await User.findOneAndUpdate(
    { username: req.user.username },
    { nom, prenom, email },
    { new: true, runValidators: true, context: 'query' }
  ).select('-password');
  if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
  res.json(user);
});

// Supprimer le compte utilisateur connecté
router.delete('/me', auth, async (req, res) => {
  const user = await User.findOneAndDelete({ username: req.user.username });
  if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
  res.json({ message: 'Compte supprimé' });
});

module.exports = router;