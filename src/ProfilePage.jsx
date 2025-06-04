import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Alert,
  Button,
  Grid,
  CircularProgress,
  Divider,
} from "@mui/material";
import axios from "axios";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        setError("Impossible de charger le profil.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    // Rediriger vers une page d'édition ou ouvrir un modal
    window.location.href = "/edit-profile";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={6} sx={{ p: 5, borderRadius: 4 }}>
          <Typography variant="h4" align="center" gutterBottom fontWeight={700} color="primary">
            Mon Profil
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <ProfileField label="Nom" value={user.nom} />
            <ProfileField label="Prénom" value={user.prenom} />
            <ProfileField label="Date de naissance" value={user.dateNaissance} />
            <ProfileField label="Email" value={user.username} />
            <ProfileField label="Pièce d'identité" value={user.cin} />
            <ProfileField label="Adresse" value={user.adresse} />
            <ProfileField label="Ville" value={user.ville} />
            <ProfileField label="Code postal" value={user.codePostal} />
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button variant="outlined" color="primary" onClick={handleEditProfile}>
              Modifier le profil
            </Button>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Déconnexion
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

function ProfileField({ label, value }) {
  return (
    <Grid item xs={12} sm={6}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={500}>
        {value || "—"}
      </Typography>
    </Grid>
  );
}
