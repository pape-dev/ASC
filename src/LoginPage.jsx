import React, { useState } from "react";
import {
  Container, Box, Typography, TextField, Button, Paper, Alert, Grid, Link,
} from "@mui/material";
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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #eef2f3 0%,rgb(248, 251, 253) 100%)",
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={12}
          sx={{
            p: 5,
            borderRadius: 6,
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.95)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.015)",
            },
          }}
        >
          <Box sx={{ mb: 2 }}>
            <img
              src="/images/pngtree-button-senegal-flag-vector-template-design-png-image_859977.png"
              alt="Logo"
              style={{ width: 100, borderRadius: "50%", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
            />
          </Box>

          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, color: "#0d47a1", mb: 1 }}
          >
            Connexion à votre compte
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              mt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Adresse email"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="email"
            />
            <TextField
              label="Mot de passe"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                variant="contained"
                
                sx={{
                  mt: 2,
                  fontWeight: 600,
                  background: "linear-gradient(90deg, #1a237e, #3949ab)",
                  color: "#fff",
                  px: 2,
                  py: 1.2,
                  borderRadius: 3,
                  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0px 12px 36px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                Se connecter
              </Button>
            </Box>
          </Box>

          <Grid container justifyContent="space-between" sx={{ mt: 3, width: "100%" }}>
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

          {error && (
            <Alert severity="error" sx={{ mt: 3, width: "100%" }}>
              {error}
            </Alert>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
