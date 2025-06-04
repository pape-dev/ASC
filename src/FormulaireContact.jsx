import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  AppBar,
  Toolbar,
} from '@mui/material';

const regionsSenegal = [
  'Dakar', 'Diourbel', 'Fatick', 'Kaffrine', 'Kaolack',
  'Kédougou', 'Kolda', 'Louga', 'Matam', 'Saint-Louis',
  'Sédhiou', 'Tambacounda', 'Thiès', 'Ziguinchor',
];

const validationSchema = Yup.object({
  nom: Yup.string().required('Veuillez entrer votre nom'),
  prenom: Yup.string().required('Veuillez entrer votre prénom'),
  email: Yup.string()
    .email('Veuillez entrer une adresse email valide')
    .required('Veuillez entrer votre email'),
  telephone: Yup.string()
    .required('Veuillez entrer votre numéro de téléphone')
    .matches(/^\+1[0-9]{10}$/, "Numéro de téléphone invalide (doit commencer par +1 et contenir exactement 11 chiffres)"),

  region: Yup.string().required("Veuillez sélectionner votre région"),
  objet: Yup.string().required("Veuillez préciser l'objet de votre message"),
  message: Yup.string().required('Veuillez entrer votre message'),
  rgpd: Yup.boolean().oneOf([true], 'Veuillez accepter la politique de confidentialité'),
});

export default function ContactForm() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const confirmButtonRef = useRef(null); // 🔧 Nouvelle référence bouton

  useEffect(() => {
    if (open && confirmButtonRef.current) {
      // 🔧 Focus manuel une fois le dialog visible
      const timer = setTimeout(() => {
        confirmButtonRef.current?.focus();
      }, 100); // Timeout pour laisser le Fade se terminer

      return () => clearTimeout(timer);
    }
  }, [open]);

  const formik = useFormik({
    initialValues: {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      region: '',
      objet: '',
      message: '',
      rgpd: false,
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          alert('Votre message a bien été envoyé !');
          resetForm();
          navigate('/');
        } else {
          alert('Une erreur est survenue. Veuillez réessayer.');
        }
      } catch (error) {
        console.error(error);
        alert('Erreur réseau. Veuillez réessayer plus tard.');
      }
      setSubmitting(false);
      setOpen(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        setOpen(true);
      } else {
        formik.setTouched({
          nom: true,
          prenom: true,
          email: true,
          telephone: true,
          region: true,
          objet: true,
          message: true,
          rgpd: true,
        });
      }
    });
  };

  const handleConfirm = () => {
    formik.submitForm();
  };

  const menu = (
    <AppBar position="fixed" color="primary" elevation={0} sx={{ py: 1, mb: 4, background: '#1a237e' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="/images/jub.png" alt="Logo" style={{ width: 60, marginRight: 16 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', letterSpacing: 1 }}>
            Jub - Jubal - Jubanti
          </Typography>
        </Box>
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Button component={Link} to="/" variant="text" sx={{ color: '#fff', fontWeight: 600, mx: 1 }}>
            Accueil
          </Button>
          <Button component={Link} to="/actualites" variant="text" sx={{ color: '#fff', fontWeight: 600, mx: 1 }}>
            Actualités
          </Button>
          <Button component={Link} to="/evenements" variant="text" sx={{ color: '#fff', fontWeight: 600, mx: 1 }}>
            Evènements
          </Button>
          <Button component={Link} to="/suivi" variant="text" sx={{ color: '#fff', fontWeight: 600, mx: 1 }}>
            Suivi
          </Button>
          <Button component={Link} to="/login" variant="text" sx={{ color: '#fff', fontWeight: 600, mx: 1 }}>
            Connexion
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );

  return (
    <>
      {menu}

      <Fade in={true} timeout={1000}>
        <Paper
          elevation={6}
          sx={{
            maxWidth: 600,
            margin: '15rem auto 3rem',
            padding: 4,
            borderRadius: 3,
            bgcolor: 'background.paper',
            boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
            Contactez-nous
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            {/* Tous les champs du formulaire ici (inchangés)... */}

            <TextField
              fullWidth
              id="nom"
              name="nom"
              label="Nom"
              placeholder="Diop"
              value={formik.values.nom}
              onChange={formik.handleChange}
              error={formik.touched.nom && Boolean(formik.errors.nom)}
              helperText={formik.touched.nom && formik.errors.nom}
            />

            <TextField
              fullWidth
              id="prenom"
              name="prenom"
              label="Prénom"
              placeholder="Abdoulaye"
              value={formik.values.prenom}
              onChange={formik.handleChange}
              error={formik.touched.prenom && Boolean(formik.errors.prenom)}
              helperText={formik.touched.prenom && formik.errors.prenom}
            />

            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="diop23@gmail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              fullWidth
              id="telephone"
              name="telephone"
              label="Téléphone"
              placeholder="+221 77 612 78 56"
              value={formik.values.telephone}
              onChange={formik.handleChange}
              error={formik.touched.telephone && Boolean(formik.errors.telephone)}
              helperText={formik.touched.telephone && formik.errors.telephone}
            />

            <FormControl fullWidth error={formik.touched.region && Boolean(formik.errors.region)}>
              <InputLabel id="region-label">Région</InputLabel>
              <Select
                labelId="region-label"
                id="region"
                name="region"
                label="Région"
                value={formik.values.region}
                onChange={formik.handleChange}
              >
                <MenuItem value=""><em>Sélectionnez une région</em></MenuItem>
                {regionsSenegal.map((region) => (
                  <MenuItem key={region} value={region}>{region}</MenuItem>
                ))}
                <MenuItem value="À l'étranger">À l'étranger</MenuItem>
              </Select>
              {formik.touched.region && formik.errors.region && (
                <FormHelperText>{formik.errors.region}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={formik.touched.objet && Boolean(formik.errors.objet)}>
              <InputLabel id="objet-label">Objet</InputLabel>
              <Select
                labelId="objet-label"
                id="objet"
                name="objet"
                label="Objet"
                value={formik.values.objet}
                onChange={formik.handleChange}
              >
                <MenuItem value=""><em>Sélectionnez un objet</em></MenuItem>
                <MenuItem value="demande_info">Demande d'information</MenuItem>
                <MenuItem value="signalement">Signalement</MenuItem>
                <MenuItem value="support">Support technique</MenuItem>
                <MenuItem value="autre">Autre</MenuItem>
              </Select>
              {formik.touched.objet && formik.errors.objet && (
                <FormHelperText>{formik.errors.objet}</FormHelperText>
              )}
            </FormControl>

            <TextField
              fullWidth
              id="message"
              name="message"
              label="Message"
               placeholder="Veuillez saisir votre message ici..."
              multiline
              rows={5}
              value={formik.values.message}
              onChange={formik.handleChange}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
            />

            <FormControl
              required
              error={formik.touched.rgpd && Boolean(formik.errors.rgpd)}
              component="fieldset"
              sx={{ mb: 2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    id="rgpd"
                    name="rgpd"
                    color="primary"
                    checked={formik.values.rgpd}
                    onChange={formik.handleChange}
                  />
                }
                label="J’accepte la politique de confidentialité du Sénégal"
              />
              {formik.touched.rgpd && formik.errors.rgpd && (
                <FormHelperText>{formik.errors.rgpd}</FormHelperText>
              )}
            </FormControl>

            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={formik.isSubmitting}
              size="large"
              sx={{ fontWeight: 'bold' }}
            >
              Envoyer
            </Button>
          </Box>
        </Paper>
      </Fade>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">Confirmez l'envoi</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            Êtes-vous sûr de vouloir envoyer ce message ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Annuler
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            variant="contained"
            ref={confirmButtonRef} // 🔧 Référence au bouton
          >
            Oui, envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
