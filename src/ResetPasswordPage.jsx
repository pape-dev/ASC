import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Box, Typography, TextField, Button, Paper, Alert } from "@mui/material";
import axios from "axios";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!password || password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      await axios.post(`/api/auth/reset-password/${token}`, { password });
      setSuccess("Mot de passe réinitialisé avec succès. Vous pouvez vous connecter.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de la réinitialisation.");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Container maxWidth="xs">
        <Paper elevation={8} sx={{ p: 4, borderRadius: 4, boxShadow: 6 }}>
          <Typography variant="h5" align="center" gutterBottom fontWeight={700} color="primary.main">
            Réinitialiser le mot de passe
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Nouveau mot de passe" type="password" variant="outlined" fullWidth required value={password} onChange={e => setPassword(e.target.value)} />
            <TextField label="Confirmer le mot de passe" type="password" variant="outlined" fullWidth required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2, fontWeight: 600 }}>
              Réinitialiser
            </Button>
          </Box>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        </Paper>
      </Container>
    </Box>
  );
}
