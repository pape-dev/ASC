import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Container, Paper, Typography, Grid, Button, Alert, TextField, Stepper, Step, StepLabel, MobileStepper, Card, CardContent, Fade } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import PersonIcon from '@mui/icons-material/Person';
import GavelIcon from '@mui/icons-material/Gavel';
import PublicIcon from '@mui/icons-material/Public';
import ConstructionIcon from '@mui/icons-material/Construction';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PetsIcon from '@mui/icons-material/Pets';
import SecurityIcon from '@mui/icons-material/Security';
import { Link } from "react-router-dom";

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
  const [hoveredCategory, setHoveredCategory] = useState(null); // Ajout état pour hover
  const [selectedType, setSelectedType] = useState(null);
  const [hoveredType, setHoveredType] = useState(null);
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tilt, setTilt] = useState({}); // Ajout état pour le tilt 3D
  const [stepKey, setStepKey] = useState(0); // Ajout d'un état pour la clé d'étape (pour forcer le remount du contenu lors du changement d'étape)
  const [showCategoryConfirm, setShowCategoryConfirm] = useState(false); // Ajout pour confirmation catégorie

  // Sélection catégorie
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setSelectedType(null);
    setForm({});
    setShowCategoryConfirm(true); // Affiche la confirmation
    setError("");
  };
  // Continuer après confirmation catégorie
  const handleContinueCategory = () => {
    setActiveStep(1);
    setShowCategoryConfirm(false);
  };
  // Retour depuis confirmation catégorie
  const handleBackCategoryConfirm = () => {
    setSelectedCategory(null);
    setShowCategoryConfirm(false);
    setError("");
  };
  // Sélection type
  const handleSelectType = (type) => {
    setSelectedType(type);
    setForm({});
    setActiveStep(2);
    setError("");
  };
  // Suivant
  const handleNext = () => {
    if (!validateStep()) return;
    setActiveStep((prev) => {
      setStepKey(prev + 1); // force remount pour l'animation
      return prev + 1;
    });
  };
  // Retour
  // Première version (plus simple, à restaurer)
  // const handleBack = () => {
  //   setActiveStep((prev) => {
  //     setStepKey(prev - 1); // force remount pour l'animation
  //     return prev - 1;
  //   });
  //   setError("");
  // };
  // Version précédente restaurée :
  const handleBack = () => {
    if (activeStep === 1) {
      setActiveStep(0);
      setSelectedType(null);
      setForm({}); // Réinitialise le formulaire aussi
      setError("");
      return;
    }
    setActiveStep((prev) => {
      setStepKey(prev - 1); // force remount pour l'animation
      return prev - 1;
    });
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
  // Soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setSuccess("Signalement transmis ! Merci pour votre vigilance.");
    setActiveStep(3);
  };

  // Gestion du tilt 3D sur les types
  const handleTypeMouseMove = (e, typeId) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Limiter l'angle max (ex: 10deg)
    const maxTilt = 10;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    const rotateX = -((y - centerY) / centerY) * maxTilt;
    setTilt(t => ({ ...t, [typeId]: { rotateX, rotateY } }));
  };
  const handleTypeMouseLeave = (typeId) => {
    setTilt(t => ({ ...t, [typeId]: { rotateX: 0, rotateY: 0 } }));
  };

  // Affichage dynamique par étape
  const renderStepContent = () => {
    // Affiche la confirmation catégorie si besoin
    if (showCategoryConfirm && selectedCategory) {
      return (
        <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(18, 33, 169, 0.1)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Card sx={{ maxWidth: 520, borderRadius: 5, boxShadow: '0 12px 48px 0rgba(226, 234, 243, 0.27)', background: 'linear-gradient(120deg, #e3eafc 60%, #f8fafc 100%)', p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', border: '2px solid #1976d2', animation: 'fadeInPopop 0.3s' }}>
            <Box sx={{ width: '100%', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e8f5e9', color: '#388e3c', borderRadius: 2, py: 1, px: 2, mb: 2, fontWeight: 600, fontSize: 16 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#388e3c" style={{marginRight: 8}}><circle cx="12" cy="12" r="10" fill="#c8e6c9"/><path d="M10.5 15.5l-3-3 1.4-1.4 1.6 1.6 4.6-4.6 1.4 1.4z" fill="#388e3c"/></svg>
                Catégorie sélectionnée avec succès
              </Box>
            </Box>
            <Box sx={{ mb: 2 }}>{React.cloneElement(selectedCategory.icon, { sx: { fontSize: 56, color: '#1976d2' } })}</Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a237e', mb: 1, textAlign: 'center' }}>{selectedCategory.label}</Typography>
            <Typography variant="body1" sx={{ color: '#374151', mb: 2, textAlign: 'center', fontSize: 17 }}>{selectedCategory.description}</Typography>
            <Typography variant="body2" sx={{ color: '#1976d2', mb: 2, textAlign: 'center', fontSize: 15, fontWeight: 500 }}>
              Veuillez vérifier que cette catégorie correspond bien à votre signalement.<br />Vous pourrez revenir en arrière si besoin.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <Button variant="outlined" color="primary" sx={{ borderRadius: 2, fontWeight: 600 }} onClick={handleBackCategoryConfirm}>
                Retour
              </Button>
              <Button variant="contained" color="primary" sx={{ borderRadius: 2, fontWeight: 600, px: 4, boxShadow: 4, background: 'linear-gradient(90deg, #1a237e 0%, #1976d2 100%)' }} onClick={handleContinueCategory}>
                Continuer
              </Button>
            </Box>
          </Card>
        </Box>
      );
    }
    if (activeStep === 0) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: 400, width: '100%', position: 'relative' }}>
          <Box sx={{
            width: { xs: '100%', sm: '98%', md: '92%', lg: '80%' },
            mx: 'auto',
            filter: selectedCategory ? 'blur(2px) grayscale(0.2)' : 'none',
            pointerEvents: selectedCategory ? 'none' : 'auto',
            transition: 'filter 0.3s',
          }}>
            <Typography variant="h6" sx={{ mb: 3, textAlign: 'center', color: '#1a237e', fontWeight: 700, letterSpacing: 1 }}>
              Choisissez une catégorie
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                  md: '1fr 1fr',
                },
                gap: { xs: 7, sm: 9, md: 15 },
                alignItems: 'stretch',
                justifyItems: 'stretch',
                width: '100%',
                mb: 2,
                p: { xs: 2.5, sm: 3.5, md: 5 },
                boxSizing: 'border-box',
    
                borderRadius: 5,
                // boxShadow supprimé
              }}
            >
              {categories.map((cat, idx) => (
                <Card
                  key={cat.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    minHeight: { xs: 160, sm: 180, md: 210, lg: 220 },
                    width: '100%',
                    p: { xs: 2, sm: 2.5, md: 3 },
                    m: 0,
                    border: 'none',
                    borderRadius: 6,
                    boxShadow: '0 4px 32px 0 #1a237e14',
                    background:
                      hoveredCategory === cat.id
                        ? '#1a237e'
                        : selectedCategory?.id === cat.id
                        ? 'linear-gradient(120deg, #1a237e 60%, #1976d2 100%)'
                        : 'linear-gradient(120deg, #fff 60%, #f8fafc 100%)',
                    color:
                      hoveredCategory === cat.id
                        ? '#fff'
                        : selectedCategory?.id === cat.id
                        ? '#fff'
                        : '#1a237e',
                    overflow: 'hidden',
                    position: 'relative',
                    filter:
                      selectedCategory?.id === cat.id || hoveredCategory === cat.id
                        ? 'drop-shadow(0 0 12px #1976d2aa)'
                        : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s, filter 0.2s',
                    opacity: selectedCategory && selectedCategory.id !== cat.id ? 0.5 : 1,
                    pointerEvents: selectedCategory && selectedCategory.id !== cat.id ? 'none' : 'auto',
                  }}
                  tabIndex={0}
                  onClick={() => handleSelectCategory(cat)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSelectCategory(cat); }}
                  onMouseEnter={() => setHoveredCategory(cat.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Box
                    sx={{
                      mt: 1.2,
                      mb: 1.2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background:
                        hoveredCategory === cat.id
                          ? '#1a237e'
                          : selectedCategory?.id === cat.id
                          ? '#fff'
                          : 'linear-gradient(120deg, #e3eafc 60%, #f8fafc 100%)',
                      boxShadow:
                        selectedCategory?.id === cat.id || hoveredCategory === cat.id
                          ? '0 0 0 4px #1976d244'
                          : '0 2px 8px 0 #1a237e11',
                      transition: 'all 0.25s',
                    }}
                  >
                    {React.cloneElement(cat.icon, {
                      sx: {
                        fontSize: 32,
                        color:
                          hoveredCategory === cat.id
                            ? '#fff'
                            : selectedCategory?.id === cat.id
                            ? '#1976d2'
                            : '#1976d2',
                        transition: 'color 0.2s',
                      },
                    })}
                  </Box>
                  <CardContent
                    sx={{
                      p: 0,
                      width: '100%',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        color:
                          hoveredCategory === cat.id
                            ? '#fff'
                            : selectedCategory?.id === cat.id
                            ? '#fff'
                            : '#1a237e',
                        mb: 0.5,
                        textAlign: 'center',
                        fontSize: { xs: 15, sm: 16, md: 18 },
                        transition: 'color 0.2s',
                      }}
                    >
                      {cat.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          hoveredCategory === cat.id
                            ? '#fff'
                            : selectedCategory?.id === cat.id
                            ? '#fff'
                            : '#374151',
                        textAlign: 'center',
                        mb: 1,
                        minHeight: 28,
                        fontSize: { xs: 12, sm: 13, md: 15 },
                        opacity: 0.92,
                      }}
                    >
                      {cat.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
          {/* Overlay Card d'info détaillée sur la catégorie sélectionnée */}
          {selectedCategory && (
            <Box sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(145, 150, 197, 0.1)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Card sx={{
                maxWidth: 520,
                borderRadius: 5,
                boxShadow: '0 12px 48px 0rgba(226, 234, 243, 0.27)',
                background: 'linear-gradient(120deg, #e3eafc 60%, #f8fafc 100%)',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                border: '2px solidrgb(189, 196, 203)',
                animation: 'fadeInPopop 0.3s',
              }}>
                <Box sx={{ width: '100%', mb: 2 }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#e8f5e9',
                    color: '#388e3c',
                    borderRadius: 2,
                    py: 1,
                    px: 2,
                    mb: 2,
                    fontWeight: 600,
                    fontSize: 16,
                  
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#388e3c" style={{marginRight: 8}}><circle cx="12" cy="12" r="10" fill="#c8e6c9"/><path d="M10.5 15.5l-3-3 1.4-1.4 1.6 1.6 4.6-4.6 1.4 1.4z" fill="#388e3c"/></svg>
                    Catégorie sélectionnée avec succès
                  </Box>
                </Box>
                <Box sx={{ mb: 2 }}>{React.cloneElement(selectedCategory.icon, { sx: { fontSize: 56, color: '#1976d2' } })}</Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a237e', mb: 1, textAlign: 'center' }}>{selectedCategory.label}</Typography>
                <Typography variant="body1" sx={{ color: '#374151', mb: 2, textAlign: 'center', fontSize: 17 }}>{selectedCategory.description}</Typography>
                <Typography variant="body2" sx={{ color: '#1976d2', mb: 2, textAlign: 'center', fontSize: 15, fontWeight: 500 }}>
                  Veuillez vérifier que cette catégorie correspond bien à votre signalement.<br />Vous pourrez revenir en arrière si besoin.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  <Button variant="outlined" color="primary" sx={{ borderRadius: 2, fontWeight: 600 }} onClick={handleBackCategoryConfirm}>
                    Retour
                  </Button>
                  <Button variant="contained" color="primary" sx={{ borderRadius: 2, fontWeight: 600, px: 4, boxShadow: 4, background: 'linear-gradient(90deg, #1a237e 0%, #1976d2 100%)' }} onClick={handleContinueCategory}>
                    Continuer
                  </Button>
                </Box>
              </Card>
            </Box>
          )}
        </Box>
      );
    }
    if (activeStep === 1 && selectedCategory) {
      // Types de la catégorie (liste verticale, radio, un seul choix)
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', position: 'relative' }}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 800, color: '#1a237e', letterSpacing: 1, position: 'relative' }}>
              <span style={{
                display: 'inline-block',
                position: 'relative',
                zIndex: 2,
                background: 'linear-gradient(90deg,rgba(0, 0, 0, 0.26) 0%,rgb(0, 0, 0) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 900,
                letterSpacing: 1.5,
                fontSize: 26
              }}>
                Quel type de signalement&nbsp;?
              </span>
              <span style={{
                position: 'absolute',
                left: '50%',
                bottom: -8,
                width: 80,
                height: 6,
                background: 'linear-gradient(90deg,rgb(192, 198, 204) 0%, #e3eafc 100%)',
                borderRadius: 8,
                opacity: 0.18,
                transform: 'translateX(-50%)',
                zIndex: 1,
                animation: 'underlineGrow 1.2s cubic-bezier(0.23, 1, 0.32, 1)'
              }} />
            </Typography>
            {/* Décorations animées supplémentaires */}
            <Box sx={{
              position: 'absolute',
              top: -50,
              left: -40,
              width: 120,
              height: 120,
              zIndex: 0,
              pointerEvents: 'none',
            }}>
              <svg width="120" height="120">
                <circle cx="60" cy="60" r="55" fill="url(#grad1)" opacity="0.13">
                </circle>
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#e3eafc" />
                    <stop offset="100%" stopColor="#1976d2" />
                  </linearGradient>
                </defs>
              </svg>
            </Box>
            <Box sx={{
              position: 'absolute',
              bottom: -40,
              right: -30,
              width: 90,
              height: 90,
              zIndex: 0,
              pointerEvents: 'none',
            }}>
              <svg width="90" height="90">
                <rect x="10" y="10" width="70" height="70" rx="24" fill="url(#grad2)" opacity="0.10">
                </rect>
                <defs>
                  <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1976d2" />
                    <stop offset="100%" stopColor="#e3eafc" />
                  </linearGradient>
                </defs>
              </svg>
            </Box>
            <Box sx={{
              position: 'absolute',
              top: 30,
              right: 80,
              width: 24,
              height: 24,
              zIndex: 0,
              pointerEvents: 'none',
            }}>
              <svg width="24" height="24">
                <ellipse cx="12" cy="12" rx="12" ry="8" fill="#1976d2" opacity="0.18" />
              </svg>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                background: '#f8fafc',
                borderRadius: 4,
                p: 3,
                boxShadow: 6,
                position: 'relative',
                overflow: 'visible',
                animation: 'fadeInTypeList 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
                border: '1.5px solid #e3eafc',
                zIndex: 1,
              }}
            >
              <style>{`
                @keyframes fadeInTypeList {
                  0% { opacity: 0; transform: translateY(30px) scale(0.98); }
                  100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes underlineGrow {
                  0% { width: 0; opacity: 0; }
                  100% { width: 80px; opacity: 0.18; }
                }
                @keyframes pulseBtn {
                  0% { box-shadow: 0 0 0 0 #1976d244; }
                  100% { box-shadow: 0 0 16px 4px #1976d244; }
                }
                @keyframes zoomInType {
                  0% { transform: scale(1); }
                  100% { transform: scale(1.04); }
                }
                @keyframes fadeInBtn {
                  0% { opacity: 0; transform: translateY(20px); }
                  100% { opacity: 1; transform: translateY(0); }
                }
                /* Séparateur animé */
                .animated-separator {
                  height: 4px;
                  width: 120px;
                  margin: 0 auto 32px auto;
                  background: linear-gradient(90deg, #1a237e 0%, #1976d2 100%);
                  border-radius: 8px;
                  position: relative;
                  overflow: hidden;
                  animation: separatorGrow 1.2s cubic-bezier(0.23, 1, 0.32, 1);
                }
                @keyframes separatorGrow {
                  0% { width: 0; opacity: 0; }
                  100% { width: 120px; opacity: 1; }
                }
                .separator-pulse {
                  position: absolute;
                  left: 0; top: 0; height: 100%; width: 100%;
                  background: linear-gradient(90deg, #fff0 0%, #fff6 50%, #fff0 100%);
                  animation: separatorPulse 2s infinite linear;
                  opacity: 0.5;
                }
                @keyframes separatorPulse {
                  0% { left: -100%; }
                  100% { left: 100%; }
                }
              `}</style>
              {selectedCategory.types.map((type, idx) => {
                const isHovered = hoveredType === type.id;
                const isSelected = selectedType?.id === type.id;
                // Effet tilt 3D fiable
                const tiltStyle = (isHovered || isSelected) && tilt[type.id]
                  ? {
                      transform: `perspective(700px) rotateX(${tilt[type.id].rotateX || 0}deg) rotateY(${tilt[type.id].rotateY || 0}deg) scale(1.04)`,
                      transition: 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)',
                    }
                  : {
                      transform: 'perspective(700px) scale(1)',
                      transition: 'transform 0.22s cubic-bezier(0.23, 1, 0.32, 1)',
                    };
                return (
                  <Box
                    key={type.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2.5,
                      borderRadius: 3,
                      boxShadow: isHovered || isSelected ? '0 8px 32px 0rgba(28, 28, 32, 0.2)' : '0 1px 6px 0 #1a237e11',
                      border: isHovered || isSelected ? '2.5px solid #1a237e' : '1.5px solid #e0e0e0',
                      background: isHovered || isSelected ? 'linear-gradient(90deg,rgb(24, 25, 36) 0%,rgb(2, 13, 28) 100%)' : '#fff',
                      color: isHovered || isSelected ? '#fff' : '#1a237e',
                      cursor: 'pointer',
                      filter: isHovered || isSelected ? 'drop-shadow(0 0 8pxrgba(2, 4, 52, 0.67))' : 'none',
                      position: 'relative',
                      mb: 0,
                      ...tiltStyle,
                    }}
                    tabIndex={0}
                    onClick={() => setSelectedType(type)}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelectedType(type); }}
                    onMouseEnter={() => setHoveredType(type.id)}
                    onMouseMove={isHovered ? (e) => handleTypeMouseMove(e, type.id) : undefined}
                    onMouseLeave={() => { setHoveredType(null); handleTypeMouseLeave(type.id); }}
                  >
                    <input
                      type="radio"
                      checked={selectedType?.id === type.id}
                      onChange={() => setSelectedType(type)}
                      style={{ accentColor: '#1976d2', width: 22, height: 22, marginRight: 16 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isHovered || isSelected ? '#fff' : '#222', mb: 0.5, fontSize: { xs: 15, sm: 16, md: 17 }, letterSpacing: 0.5 }}>
                        {type.label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: isHovered || isSelected ? '#fff' : '#374151', opacity: 0.92, fontSize: { xs: 12, sm: 13, md: 14 } }}>{type.description}</Typography>
                    </Box>
                    {isSelected && (
                      <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', animation: 'fadeInBtn 0.4s' }}>
                        {/* Coche animée ou feu d'artifice SVG ici plus tard */}
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="12" r="12" fill="#1976d2"/><path d="M10.5 15.5l-3-3 1.4-1.4 1.6 1.6 4.6-4.6 1.4 1.4z" fill="#fff"/></svg>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
            {/* Bouton Suivant en bas */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, zIndex: 2, position: 'relative' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!selectedType}
                sx={{
                  borderRadius: 999,
                  fontWeight: 700,
                  px: 3,
                  py: 0.7,
                  fontSize: 15,
                  minWidth: 110,
                  boxShadow: selectedType ? '0 0 12px 2px #1976d244' : 'none',
                  background: selectedType ? 'linear-gradient(90deg, #1a237e 0%, #1976d2 100%)' : '#e3eafc',
                  color: selectedType ? '#fff' : '#b0b8d1',
                  transition: 'all 0.25s',
                  letterSpacing: 1.1,
                  animation: selectedType ? 'pulseBtn 1.2s infinite alternate' : 'none',
                }}
              >
                Suivant
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, zIndex: 2, position: 'relative' }}>
              <Button onClick={handleBack} sx={{ borderRadius: 999, mr: 2, fontWeight: 700, px: 3, py: 0.7, fontSize: 15, minWidth: 110 }}>
                Retour
              </Button>
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
            <Button variant="contained" color="primary" type="submit" sx={{ borderRadius: 2, fontWeight: 600, px: 2 }}>
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

  // Menu principal (sans bouton Connexion)
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
          <Button component={Link} to="/contact" variant="text" sx={{ color: '#fff', fontWeight: 600, mx: 1 }}>
            Contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );

  return (
    <Box sx={{ minHeight: '100vh', background: '#fff', pb: 6 }}>
      {menu}
      <Box sx={{ height: { xs: 80, sm: 100 } }} /> {/* Plus d'espace entre le menu et le titre */}
      <Container maxWidth="md">
        <Box sx={{ height: { xs: 32, sm: 48 } }} /> {/* Espace supplémentaire entre le menu et le titre */}
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a237e', mb: 2, textAlign: 'center' }}>
          Signaler une fraude ou un message suspect
        </Typography>
        {/* Séparateur décoratif animé */}
        <div className="animated-separator"><div className="separator-pulse"></div></div>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {/* Animation de transition entre les étapes */}
        <Fade in={true} key={stepKey} timeout={500}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 4, background: '#fff', boxShadow: '0 4px 24px 0 rgba(26,35,126,0.10)' }}>
            {renderStepContent()}
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}