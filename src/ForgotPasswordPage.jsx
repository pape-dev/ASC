import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button, Paper, Alert } from "@mui/material";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post("/api/auth/forgot-password", { email });
      setSuccess("Si un compte existe, un email de réinitialisation a été envoyé.");
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de la demande.");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Container maxWidth="xs">
        <Paper elevation={8} sx={{ p: 4, borderRadius: 4, boxShadow: 6 }}>
          <Typography variant="h5" align="center" gutterBottom fontWeight={700} color="primary.main">
            Mot de passe oublié
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Entrez votre adresse email pour recevoir un lien de réinitialisation.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Adresse email" variant="outlined" fullWidth required value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2, fontWeight: 600 }}>
              Envoyer
            </Button>
          </Box>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        </Paper>
      </Container>
    </Box>
  );
}
