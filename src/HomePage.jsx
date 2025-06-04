import React, { useState } from "react";
import { Container, Typography, Box, Button, Grid, AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const translations = {
  fr: {
    title: "Plateforme de gestion des anomalies & fraudes",
    subtitle: "Signalez, consultez et gérez les fraudes en toute sécurité avec une interface professionnelle et intuitive.",
    login: "Connexion",
    register: "Inscription",
    start: "Signaler",
    brand: "Jub - Jubal - Jubanti"
  },
  en: {
    title: "Anomalies & Fraud Management Platform",
    subtitle: "Report, consult and manage fraud securely with a professional and intuitive interface.",
    login: "Login",
    register: "Register",
    start: "Get Started",
    brand: "Jub - Jubal - Jubanti"
  },
  wo: {
    title: "Platformu jiite ak jubal yi",
    subtitle: "Yeele, wone ak doxal jubal yi ci amna jàmm ak yoon wi.",
    login: "Jokkoo",
    register: "Inscriwaa",
    start: "Tambali",
    brand: "Jub - Jubal - Jubanti"
  }
};

export default function HomePage() {
  const [lang, setLang] = useState('fr');
  const t = translations[lang];

  const handleLangChange = (newLang) => {
    setLang(newLang);
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, background: 'linear-gradient(90deg, #f8fafc 0%, #e3eafc 100%)', pb: 0, m: 0, zIndex: 0, overflow: 'hidden' }}>
      {/* Header */}
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ py: 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/images/jub.png" alt="Logo" style={{ width: 60, marginRight: 16 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a237e', letterSpacing: 1 }}>
              {t.brand}
            </Typography>
          </Box>
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {/* Nouveau menu principal sans inscription, connexion en bleu foncé */}
            <Button component={Link} to="/actualites" variant="text" sx={{ color: '#1a237e', fontWeight: 600, mx: 1 }}>
              Actualités
            </Button>
            <Button component={Link} to="/evenements" variant="text" sx={{ color: '#1a237e', fontWeight: 600, mx: 1 }}>
              Evènements
            </Button>
            <Button component={Link} to="/suivi" variant="text" sx={{ color: '#1a237e', fontWeight: 600, mx: 1 }}>
              Suivi
            </Button>
            <Button component={Link} to="/contact" variant="text" sx={{ color: '#1a237e', fontWeight: 600, mx: 1 }}>
              Contact
            </Button>
            <Button component={Link} to="/login" variant="text" sx={{ color: '#1a237e', fontWeight: 700, mx: 1, background: '#1a237e', color: '#fff', borderRadius: 2, px: 2, py: 0.5, '&:hover': { background: '#111634' } }}>
              {t.login}
            </Button>
            <label htmlFor="lang-select" style={{ marginLeft: 16, fontWeight: 600, color: '#1a237e' }}>🌐</label>
            <select
              id="lang-select"
              value={lang}
              onChange={e => handleLangChange(e.target.value)}
              style={{ marginLeft: 8, padding: '6px 12px', borderRadius: 8, border: '1px solid #1a237e', fontWeight: 600, color: '#1a237e', background: '#fff', outline: 'none', cursor: 'pointer' }}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="wo">Wolof</option>
            </select>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: { xs: 56, sm: 64 } }} /> {/* Espace pour compenser la hauteur de l'AppBar */}
      <Container maxWidth="lg" sx={{ mt: 8, zIndex: 1, position: 'relative' }}>
        {/* Hero Section */}
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" sx={{ fontWeight: 800, color: '#1a237e', mb: 2, lineHeight: 1.1 }}>
              {t.title}
            </Typography>
            <Typography variant="h5" sx={{ color: '#374151', mb: 4 }}>
              {t.subtitle}
            </Typography>
            <Button component={Link} to="/signalement" size="large" variant="contained" sx={{ background: 'linear-gradient(90deg, #1a237e 0%, #1976d2 100%)', color: '#fff', fontWeight: 700, borderRadius: 2, px: 5, py: 1.5, boxShadow: 3 }}>
              {t.start}
            </Button>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: { xs: 240, md: 400 }, height: { xs: 240, md: 400 }, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/images/diomaye.png"
                alt="Illustration Sénégal"
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
