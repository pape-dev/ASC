import React, { useState } from "react";
import { Container, Typography, Box, Paper, Button, Grid, TextField, Alert, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    email: "",
    cin: "",
    telephone: "",
    rue: "",
    adresse: "",
    ville: "",
    codePostal: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.nom || !form.prenom || !form.dateNaissance || !form.email || !form.cin || !form.telephone || !form.rue || !form.adresse || !form.ville || !form.codePostal || !form.password || !form.confirmPassword) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError("Adresse email invalide.");
      return;
    }
    if (!/^\d{10}$/.test(form.cin)) {
      setError("La pièce d'identité doit contenir exactement 10 chiffres.");
      return;
    }
    if (form.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      await axios.post("/api/auth/register", {
        username: form.email,
        password: form.password,
        nom: form.nom,
        prenom: form.prenom,
        dateNaissance: form.dateNaissance,
        cin: form.cin,
        telephone: form.telephone,
        rue: form.rue,
        adresse: form.adresse,
        ville: form.ville,
        codePostal: form.codePostal
      });
      setSuccess("Inscription réussie ! Vous pouvez vous connecter.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de l'inscription");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
      <Container maxWidth="sm">
        <Paper elevation={12} sx={{ p: 5, borderRadius: 6, boxShadow: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.95)' }}>
          <Box sx={{ mb: 2 }}>
            <img src="/images/pngtree-button-senegal-flag-vector-template-design-png-image_859977.png" alt="Logo" style={{ width: 90, borderRadius: '50%' }} />
          </Box>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: '#f857a6', mb: 1 }}>
            Créer un compte
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Remplissez le formulaire pour vous inscrire sur la plateforme
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: '100%', mb: 3, justifyContent: 'center' }}>
            <Button variant="outlined" color="primary" sx={{ minWidth: 56, width: 56, height: 56, borderRadius: '50%', borderColor: '#4285F4', p: 0 }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" style={{ width: 32, height: 32 }} />
            </Button>
            <Button variant="outlined" color="primary" sx={{ minWidth: 56, width: 56, height: 56, borderRadius: '50%', borderColor: '#1877F3', p: 0 }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" style={{ width: 32, height: 32 }} />
            </Button>
            <Button variant="outlined" color="primary" sx={{ minWidth: 56, width: 56, height: 56, borderRadius: '50%', borderColor: '#0A66C2', p: 0 }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" style={{ width: 32, height: 32 }} />
            </Button>
            <Button variant="outlined" color="primary" sx={{ minWidth: 56, width: 56, height: 56, borderRadius: '50%', borderColor: '#E1306C', p: 0 }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" style={{ width: 32, height: 32 }} />
            </Button>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Nom" name="nom" value={form.nom} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Prénom" name="prenom" value={form.prenom} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Date de naissance" name="dateNaissance" type="date" value={form.dateNaissance} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Adresse email" name="email" value={form.email} onChange={handleChange} fullWidth required type="email" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Pièce d'identité (10 chiffres)" name="cin" value={form.cin} onChange={handleChange} fullWidth required inputProps={{ maxLength: 10, pattern: "\\d*" }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Téléphone" name="telephone" value={form.telephone} onChange={handleChange} fullWidth required type="tel" inputProps={{ maxLength: 15 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Rue" name="rue" value={form.rue} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Adresse" name="adresse" value={form.adresse} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Ville" name="ville" value={form.ville} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Code postal" name="codePostal" value={form.codePostal} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Mot de passe" name="password" type="password" value={form.password} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Confirmer le mot de passe" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12}>
                {/* Suppression du champ reCAPTCHA */}
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2, fontWeight: 600, borderRadius: 2, background: 'linear-gradient(90deg, #1a237e 0%, #1976d2 100%)' }}>
              S'inscrire
            </Button>
          </Box>
          <Grid container justifyContent="center" sx={{ mt: 2, width: '100%' }}>
            <Grid item>
              <Link href="/login" underline="hover" color="secondary" sx={{ fontWeight: 500 }}>
                Déjà un compte ? Se connecter
              </Link>
            </Grid>
          </Grid>
          {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2, width: '100%' }}>{success}</Alert>}
        </Paper>
      </Container>
    </Box>
  );
}
