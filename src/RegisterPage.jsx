import React, { useState } from "react";
import {
  Container, Typography, Box, Paper, Button, Grid, TextField, Alert, Link
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nom: "", prenom: "", dateNaissance: "", email: "", cin: "", telephone: "",
    rue: "", adresse: "", ville: "", codePostal: "", password: "", confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (Object.values(form).some(v => !v)) {
      return setError("Tous les champs sont obligatoires.");
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      return setError("Adresse email invalide.");
    }
    if (!/^\d{10}$/.test(form.cin)) {
      return setError("CIN doit contenir 10 chiffres.");
    }
    if (form.password.length < 6) {
      return setError("Mot de passe ≥ 6 caractères.");
    }
    if (form.password !== form.confirmPassword) {
      return setError("Les mots de passe ne correspondent pas.");
    }

    try {
      await axios.post("/api/auth/register", {
        username: form.email,
        password: form.password,
        ...form,
      });
      setSuccess("Inscription réussie !");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Erreur serveur.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(120deg,rgb(249, 246, 239) 0%,rgb(245, 243, 236) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Container maxWidth="md">
          <Paper elevation={10} sx={{ p: 5, borderRadius: 6, backgroundColor: "#fff9", backdropFilter: "blur(6px)" }}>
            <Box textAlign="center" mb={3}>
              <img src="/images/pngtree-button-senegal-flag-vector-template-design-png-image_859977.png"
                alt="Logo"
                style={{ width: 80, borderRadius: "50%" }}
              />
              <Typography variant="h4" fontWeight={700} color="primary" mt={2}>
                Créer un compte
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Remplissez les informations pour vous inscrire
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {[
                { name: "nom", label: "Nom" },
                { name: "prenom", label: "Prénom" },
                { name: "dateNaissance", label: "Date de naissance", type: "date" },
                { name: "email", label: "Email", type: "email" },
                { name: "cin", label: "CIN (10 chiffres)", pattern: "\\d{10}" },
                { name: "telephone", label: "Téléphone", type: "tel" },
                { name: "rue", label: "Rue" },
                { name: "adresse", label: "Adresse" },
                { name: "ville", label: "Ville" },
                { name: "codePostal", label: "Code Postal" },
                { name: "password", label: "Mot de passe", type: "password" },
                { name: "confirmPassword", label: "Confirmer le mot de passe", type: "password" },
              ].map((field, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <TextField
                    fullWidth
                    required
                    type={field.type || "text"}
                    label={field.label}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    InputLabelProps={field.type === "date" ? { shrink: true } : {}}
                    inputProps={field.pattern ? { pattern: field.pattern } : {}}
                  />
                </Grid>
              ))}
            </Grid>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                fontWeight: 600,
                background: "linear-gradient(90deg,rgb(7, 7, 117),rgb(10, 26, 108))",
                color: "#fff",
                py: 1.1,
                borderRadius: 3,
                boxShadow: "0px 8px 24px rgba(220, 205, 205, 0.2)",
              }}
              onClick={handleSubmit}
            >
              S'inscrire
            </Button>

            {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 3 }}>{success}</Alert>}

            <Typography textAlign="center" mt={3}>
              Déjà un compte ?{" "}
              <Link href="/login" underline="hover" fontWeight={500}>
                Se connecter
              </Link>
            </Typography>
          </Paper>
        </Container>
      </motion.div>
    </Box>
  );
}
