import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Paper, Alert, Button, Grid } from "@mui/material";
import axios from "axios";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        setError("Impossible de charger le profil.");
      }
    };
    fetchProfile();
  }, []);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!user) return <Typography>Chargement...</Typography>;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Container maxWidth="sm">
        <Paper elevation={8} sx={{ p: 4, borderRadius: 4, boxShadow: 6 }}>
          <Typography variant="h4" align="center" gutterBottom fontWeight={700} color="primary.main">
            Mon Profil
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}><b>Nom :</b> {user.nom}</Grid>
            <Grid item xs={12} sm={6}><b>Prénom :</b> {user.prenom}</Grid>
            <Grid item xs={12} sm={6}><b>Date de naissance :</b> {user.dateNaissance}</Grid>
            <Grid item xs={12} sm={6}><b>Email :</b> {user.username}</Grid>
            <Grid item xs={12} sm={6}><b>Pièce d'identité :</b> {user.cin}</Grid>
            <Grid item xs={12} sm={6}><b>Adresse :</b> {user.adresse}</Grid>
            <Grid item xs={12} sm={6}><b>Ville :</b> {user.ville}</Grid>
            <Grid item xs={12} sm={6}><b>Code postal :</b> {user.codePostal}</Grid>
          </Grid>
          <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}>
            Déconnexion
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
