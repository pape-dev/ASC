import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button, Paper, Alert, Grid, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    try {
      const res = await axios.post("/api/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/fraudes");
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de la connexion");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Container maxWidth="xs">
        <Paper elevation={10} sx={{ p: 5, borderRadius: 5, boxShadow: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ mb: 2 }}>
            <img src="/images/pngtree-button-senegal-flag-vector-template-design-png-image_859977.png" alt="Logo" style={{ width: 120 }} />
          </Box>
          <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            Connexion à votre compte
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Adresse email" variant="outlined" fullWidth required value={username} onChange={e => setUsername(e.target.value)} autoComplete="email" />
            <TextField label="Mot de passe" type="password" variant="outlined" fullWidth required value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2, fontWeight: 600, borderRadius: 2 }}>
              Se connecter
            </Button>
          </Box>
          <Grid container justifyContent="space-between" sx={{ mt: 2, width: '100%' }}>
            <Grid item>
              <Link href="/register" underline="hover" color="primary">
                Créer un compte
              </Link>
            </Grid>
            <Grid item>
              <Link href="/forgot-password" underline="hover" color="primary">
                Mot de passe oublié ?
              </Link>
            </Grid>
          </Grid>
          {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
        </Paper>
      </Container>
    </Box>
  );
}
