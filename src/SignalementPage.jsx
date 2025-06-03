import React, { useState } from 'react';
import { Box, Container, Paper, Typography, Grid, Button, Alert, TextField, Stepper, Step, StepLabel, MobileStepper, Card, CardContent } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import PersonIcon from '@mui/icons-material/Person';
import GavelIcon from '@mui/icons-material/Gavel';
import PublicIcon from '@mui/icons-material/Public';
import ConstructionIcon from '@mui/icons-material/Construction';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PetsIcon from '@mui/icons-material/Pets';
import SecurityIcon from '@mui/icons-material/Security';
import CategoryGrid from './CategoryGrid';
import './CategoryGrid.css';

// Nouvelle structure modulaire des catégories, types et formulaires
const categories = [
  {
    id: 'atteintes-personnes',
    label: 'Atteintes aux personnes',
    description: 'Signalements concernant la sécurité ou l’intégrité des personnes.',
    icon: <PersonIcon sx={{ fontSize: 48, color: '#1976d2' }} />, // Icône adaptée
    types: [
      {
        id: 'suicide-danger',
        label: 'Annonce de suicide / mise en danger',
        description: 'Signalement d’une annonce de suicide ou d’une mise en danger.',
        form: [
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'date', label: 'Date', type: 'date', required: true },
          { name: 'plateforme', label: 'Plateforme', type: 'text', required: true },
          { name: 'preuve', label: 'Preuve (lien ou fichier)', type: 'text', required: false },
          { name: 'localisation', label: 'Localisation', type: 'text', required: false },
          { name: 'contact', label: 'Contact de la victime', type: 'text', required: false }
        ]
      },
      {
        id: 'terrorisme',
        label: 'Terrorisme / apologie / menace',
        description: 'Signalement de menace ou apologie du terrorisme.',
        form: [
          { name: 'contenu', label: 'Contenu', type: 'textarea', required: true },
          { name: 'plateforme', label: 'Plateforme', type: 'text', required: true },
          { name: 'preuve', label: 'Preuve (lien ou fichier)', type: 'text', required: false },
          { name: 'lien', label: 'Lien', type: 'text', required: false },
          { name: 'date', label: 'Date', type: 'date', required: false }
        ]
      },
      {
        id: 'haine-violence',
        label: 'Incitation à la haine / violence / discrimination',
        description: 'Signalement d’incitation à la haine, violence ou discrimination.',
        form: [
          { name: 'auteur', label: 'Auteur', type: 'text', required: false },
          { name: 'plateforme', label: 'Plateforme', type: 'text', required: true },
          { name: 'contenu', label: 'Contenu', type: 'textarea', required: true },
          { name: 'preuve', label: 'Preuve (lien ou fichier)', type: 'text', required: false }
        ]
      },
      {
        id: 'pedopornographie',
        label: 'Pédopornographie / corruption de mineurs',
        description: 'Signalement de contenu pédopornographique ou de corruption de mineurs.',
        form: [
          { name: 'type-contenu', label: 'Type de contenu', type: 'text', required: true },
          { name: 'victime', label: 'Victime', type: 'text', required: false },
          { name: 'plateforme', label: 'Plateforme', type: 'text', required: true },
          { name: 'preuve', label: 'Preuve (lien ou fichier)', type: 'text', required: false }
        ]
      }
    ]
  },
  {
    id: 'infractions-numeriques',
    label: 'Infractions numériques / économiques',
    description: 'Signalements de fraudes, usurpations, escroqueries en ligne.',
    icon: <SecurityIcon sx={{ fontSize: 48, color: '#1976d2' }} />, // Icône adaptée
    types: [
      {
        id: 'fraude-communication',
        label: 'Fraude par email, SMS, appel',
        description: 'Signalement de fraude par communication électronique.',
        form: [
          { name: 'type', label: 'Type (email, SMS, appel)', type: 'text', required: true },
          { name: 'expediteur', label: 'Expéditeur', type: 'text', required: false },
          { name: 'contenu', label: 'Contenu suspect', type: 'textarea', required: true },
          { name: 'capture', label: 'Capture (lien ou fichier)', type: 'text', required: false },
          { name: 'date', label: 'Date', type: 'date', required: false }
        ]
      },
      {
        id: 'usurpation-identite',
        label: 'Usurpation d’identité / faux documents',
        description: 'Signalement d’usurpation d’identité ou de faux documents.',
        form: [
          { name: 'type-document', label: 'Type de document', type: 'text', required: true },
          { name: 'auteur', label: 'Auteur', type: 'text', required: false },
          { name: 'preuve', label: 'Preuve (lien ou fichier)', type: 'text', required: 'false' }
        ]
      },
      {
        id: 'escroquerie-ligne',
        label: 'Escroquerie en ligne',
        description: 'Signalement d’escroquerie sur internet.',
        form: [
          { name: 'site', label: 'Site concerné', type: 'text', required: true },
          { name: 'montant', label: 'Montant', type: 'number', required: false },
          { name: 'preuve', label: 'Preuve (lien ou fichier)', type: 'text', required: false },
          { name: 'type-arnaque', label: 'Type d’arnaque', type: 'text', required: false }
        ]
      }
    ]
  },
  {
    id: 'voie-publique',
    label: 'Voie publique / sécurité',
    description: 'Signalements liés à la sécurité sur la voie publique.',
    icon: <PublicIcon sx={{ fontSize: 48, color: '#1976d2' }} />, // Icône adaptée
    types: [
      {
        id: 'accident-danger',
        label: 'Accident ou danger public immédiat',
        description: 'Signalement d’un accident ou danger public.',
        form: [
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'lieu', label: 'Lieu', type: 'text', required: true },
          { name: 'date', label: 'Date', type: 'date', required: true },
          { name: 'preuve', label: 'Preuve (lien ou fichier)', type: 'text', required: false },
          { name: 'temoins', label: 'Témoins', type: 'text', required: false }
        ]
      },
      {
        id: 'vandalisme',
        label: 'Vandalisme / dégradation urbaine',
        description: 'Signalement d’acte de vandalisme ou de dégradation.',
        form: [
          { name: 'type-acte', label: 'Type d’acte', type: 'text', required: true },
          { name: 'localisation', label: 'Localisation', type: 'text', required: true },
          { name: 'preuve', label: 'Preuve (lien ou fichier)', type: 'text', required: false },
          { name: 'date', label: 'Date', type: 'date', required: false }
        ]
      }
    ]
  },
  {
    id: 'btp-urbanisme',
    label: 'BTP / Urbanisme',
    description: 'Signalements liés aux chantiers et infractions urbanistiques.',
    icon: <ConstructionIcon sx={{ fontSize: 48, color: '#1976d2' }} />, // Icône adaptée
    types: [
      {
        id: 'chantier-non-declare',
        label: 'Chantier non déclaré / dangereux',
        description: 'Signalement de chantier non déclaré ou dangereux.',
        form: [
          { name: 'adresse', label: 'Adresse', type: 'text', required: true },
          { name: 'photo', label: 'Photo (lien ou fichier)', type: 'text', required: false },
          { name: 'type-infraction', label: 'Type d’infraction', type: 'text', required: true },
          { name: 'date', label: 'Date', type: 'date', required: false }
        ]
      },
      {
        id: 'infraction-urbanistique',
        label: 'Infraction urbanistique',
        description: 'Signalement d’infraction urbanistique.',
        form: [
          { name: 'nature-infraction', label: 'Nature de l’infraction', type: 'text', required: true },
          { name: 'preuve', label: 'Preuve (lien ou fichier)', type: 'text', required: false },
          { name: 'adresse', label: 'Adresse', type: 'text', required: true }
        ]
      }
    ]
  },
  {
    id: 'commerce',
    label: 'Commerce / Consommation',
    description: 'Signalements liés à la consommation et aux pratiques commerciales.',
    icon: <StorefrontIcon sx={{ fontSize: 48, color: '#1976d2' }} />, // Icône adaptée
    types: [
      {
        id: 'arnaque-commerciale',
        label: 'Arnaque commerciale / pratique trompeuse',
        description: 'Signalement d’arnaque commerciale ou pratique trompeuse.',
        form: [
          { name: 'commerce', label: 'Commerce concerné', type: 'text', required: true },
          { name: 'type-abus', label: 'Type d’abus', type: 'text', required: true },
          { name: 'preuve', label: 'Preuve (lien ou fichier)', type: 'text', required: false },
          { name: 'date', label: 'Date', type: 'date', required: false }
        ]
      },
      {
        id: 'vente-produits-interdits',
        label: 'Vente de produits interdits',
        description: 'Signalement de vente de produits interdits.',
        form: [
          { name: 'produit', label: 'Produit', type: 'text', required: true },
          { name: 'lieu', label: 'Lieu', type: 'text', required: true },
          { name: 'preuve', label: 'Preuve (lien ou fichier)', type: 'text', required: false },
          { name: 'date', label: 'Date', type: 'date', required: false }
        ]
      }
    ]
  },
  {
    id: 'protection-animale',
    label: 'Protection animale',
    description: 'Signalements liés à la maltraitance ou au trafic d’animaux.',
    icon: <PetsIcon sx={{ fontSize: 48, color: '#1976d2' }} />, // Icône adaptée
    types: [
      {
        id: 'cruaute-animaux',
        label: 'Cruauté / actes barbares envers animaux',
        description: 'Signalement de cruauté envers les animaux.',
        form: [
          { name: 'type-animal', label: 'Type d’animal', type: 'text', required: true },
          { name: 'lieu', label: 'Lieu', type: 'text', required: true },
          { name: 'photo', label: 'Photo (lien ou fichier)', type: 'text', required: false },
          { name: 'temoin', label: 'Témoin', type: 'text', required: false }
        ]
      },
      {
        id: 'trafic-abandon',
        label: 'Trafic ou abandon d’animaux',
        description: 'Signalement de trafic ou abandon d’animaux.',
        form: [
          { name: 'description', label: 'Description', type: 'textarea', required: true },
          { name: 'localisation', label: 'Localisation', type: 'text', required: true },
          { name: 'preuve', label: 'Preuve (lien ou fichier)', type: 'text', required: false },
          { name: 'date', label: 'Date', type: 'date', required: false }
        ]
      }
    ]
  }
];

const steps = ['Catégorie', 'Type', 'Informations', 'Confirmation'];

export default function SignalementPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Sélection catégorie
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setSelectedType(null);
    setForm({});
    setActiveStep(1);
    setError("");
  };
  // Sélection type
  const handleSelectType = (type) => {
    setSelectedType(type);
    setForm({});
    setActiveStep(2);
    setError("");
  };
  // Retour
  const handleBack = () => {
    if (activeStep === 1) {
      setSelectedCategory(null);
      setActiveStep(0);
    } else if (activeStep === 2) {
      setSelectedType(null);
      setActiveStep(1);
    } else if (activeStep === 3) {
      setActiveStep(2);
    }
    setError("");
  };
  // Formulaire dynamique
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Validation étape
  const validateStep = () => {
    if (activeStep === 0 && !selectedCategory) {
      setError('Veuillez choisir une catégorie.');
      return false;
    }
    if (activeStep === 1 && !selectedType) {
      setError('Veuillez choisir un type de signalement.');
      return false;
    }
    if (activeStep === 2 && selectedType) {
      for (const field of selectedType.form) {
        if (field.required && !form[field.name]) {
          setError(`Veuillez renseigner le champ : ${field.label}`);
          return false;
        }
      }
    }
    setError("");
    return true;
  };
  // Suivant
  const handleNext = () => {
    if (!validateStep()) return;
    setActiveStep((prev) => prev + 1);
  };
  // Soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setSuccess("Signalement transmis ! Merci pour votre vigilance.");
    setActiveStep(3);
  };

  // Affichage dynamique par étape
  const renderStepContent = () => {
    if (activeStep === 0) {
      // Catégories façon "infos pratiques" 33700.fr, grille CSS Grid responsive 1-2-3 colonnes, gap régulier
      return (
        <CategoryGrid
          categories={categories}
          selectedCategory={selectedCategory}
          handleSelectCategory={handleSelectCategory}
        />
      );
    }
    if (activeStep === 1 && selectedCategory) {
      // Types de la catégorie (liste verticale, radio, un seul choix)
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>Quel type de signalement&nbsp;?</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4, // Augmente l'espace entre les cards (gap plus grand)
                background: '#f8fafc',
                borderRadius: 4,
                p: 3,
                boxShadow: 6,
                animation: 'fadeIn 0.7s',
                '@keyframes fadeIn': {
                  from: { opacity: 0, transform: 'translateY(30px)' },
                  to: { opacity: 1, transform: 'none' }
                }
              }}
            >
              {selectedCategory.types.map((type, idx) => (
                <Box
                  key={type.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2.5,
                    borderRadius: 3,
                    boxShadow: selectedType?.id === type.id ? '0 6px 24px 0rgba(216, 230, 244, 0.2)' : '0 1px 6px 0 #1a237e11',
                    border: selectedType?.id === type.id ? '2.5px solidrgb(176, 213, 249)' : '1.5px solid #e0e0e0',
                    background: selectedType?.id === type.id ? 'linear-gradient(90deg, #e3eafc 0%, #f8fafc 100%)' : '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.28s cubic-bezier(.4,2,.6,1)',
                    filter: selectedType?.id === type.id ? 'drop-shadow(0 0 8px #1976d2aa)' : 'none',
                    position: 'relative',
                    mb: 0, // Plus de marge externe, géré par le gap
                    animation: `fadeInUp 0.7s ${idx * 0.07}s both`,
                    // Suppression du changement de couleur/fond au survol
                    '&:hover, &:focus': {
                      boxShadow: '0 10px 32px 0 #1976d244',
                      border: '2.5px solid #1976d2',
                      background: selectedType?.id === type.id ? 'linear-gradient(90deg, #e3eafc 0%, #f8fafc 100%)' : '#fff',
                      transform: 'scale(1.025)',
                      filter: 'drop-shadow(0 0 12px #1976d2bb)',
                    },
                    '@keyframes fadeInUp': {
                      from: { opacity: 0, transform: 'translateY(40px)' },
                      to: { opacity: 1, transform: 'none' }
                    }
                  }}
                  tabIndex={0}
                  onClick={() => handleSelectType(type)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSelectType(type); }}
                >
                  <input
                    type="radio"
                    checked={selectedType?.id === type.id}
                    onChange={() => handleSelectType(type)}
                    style={{ accentColor: '#1976d2', width: 22, height: 22, marginRight: 16 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: selectedType?.id === type.id ? '#1976d2' : '#222', mb: 0.5, fontSize: { xs: 15, sm: 16, md: 17 } }}>
                      {type.label}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#374151', opacity: 0.85, fontSize: { xs: 12, sm: 13, md: 14 } }}>{type.description}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button onClick={handleBack} sx={{ borderRadius: 2, mr: 2 }}>Retour</Button>
              {selectedType && (
                <Button variant="contained" color="primary" onClick={handleNext} sx={{ borderRadius: 2, fontWeight: 600, px: 4, boxShadow: 4, transition: 'all 0.2s', background: 'linear-gradient(90deg, #1a237e 0%, #1976d2 100%)' }}>
                  Suivant
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      );
    }
    if (activeStep === 2 && selectedType) {
      // Formulaire dynamique
      return (
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>Formulaire&nbsp;: {selectedType.label}</Typography>
          <Grid container spacing={2}>
            {selectedType.form.map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                {field.type === 'textarea' ? (
                  <TextField
                    label={field.label}
                    name={field.name}
                    value={form[field.name] || ''}
                    onChange={handleChange}
                    fullWidth
                    required={field.required}
                    multiline
                    rows={4}
                  />
                ) : (
                  <TextField
                    label={field.label}
                    name={field.name}
                    value={form[field.name] || ''}
                    onChange={handleChange}
                    fullWidth
                    required={field.required}
                    type={field.type}
                  />
                )}
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button onClick={handleBack} sx={{ borderRadius: 2, mr: 2 }}>Retour</Button>
            <Button variant="contained" color="primary" type="submit" sx={{ borderRadius: 2, fontWeight: 600, px: 4 }}>
              Suivant
            </Button>
          </Box>
        </Box>
      );
    }
    if (activeStep === 3 && selectedType) {
      // Récapitulatif
      return (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>Récapitulatif du signalement</Typography>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 2, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="subtitle1"><b>Catégorie :</b> {selectedCategory.label}</Typography>
            <Typography variant="subtitle1"><b>Type :</b> {selectedType.label}</Typography>
            {selectedType.form.map((field) => (
              <Typography key={field.name} variant="subtitle1"><b>{field.label} :</b> {form[field.name]}</Typography>
            ))}
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <Button variant="outlined" color="primary" sx={{ borderRadius: 2, fontWeight: 600 }} onClick={() => window.print()}>
              Imprimer
            </Button>
            <Button variant="contained" color="primary" sx={{ borderRadius: 2, fontWeight: 600 }} onClick={() => {
              const blob = new Blob([
                `Catégorie: ${selectedCategory.label}\nType: ${selectedType.label}\n` + selectedType.form.map(f => `${f.label}: ${form[f.name]}`).join('\n')
              ], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'signalement.txt';
              a.click();
              URL.revokeObjectURL(url);
            }}>
              Télécharger
            </Button>
          </Box>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#fff', py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a237e', mb: 4, textAlign: 'center' }}>
          Signaler une fraude ou un message suspect
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4, background: '#fff', boxShadow: '0 4px 24px 0 rgba(26,35,126,0.10)' }}>
          {renderStepContent()}
        </Paper>
      </Container>
    </Box>
  );
}