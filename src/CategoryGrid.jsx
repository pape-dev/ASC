import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import './CategoryGrid.css';

const CategoryGrid = ({ categories, selectedCategory, handleSelectCategory }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: 400, width: '100%' }}>
      <Box sx={{ width: { xs: '100%', sm: '98%', md: '92%', lg: '80%' }, mx: 'auto' }}>
        <Typography variant="h6" sx={{ mb: 3, textAlign: 'center', color: '#1a237e', fontWeight: 700, letterSpacing: 1 }}>
          Choisissez une catégorie
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2, sm: 3, md: 4 },
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
            },
            boxShadow: '0 2px 24px 0 #1a237e0a',
          }}
        >
          {categories.map((cat, idx) => (
            <Card
              id={`cat-${cat.id}`}
              key={cat.id}
              className="fadeInUp"
              style={{ animationDelay: `${idx * 80}ms` }}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                minHeight: { xs: 180, sm: 200, md: 240, lg: 260 },
                width: '100%',
                p: { xs: 2.5, sm: 3, md: 3.5 },
                border: 'none',
                borderRadius: 6,
                boxShadow: '0 4px 32px 0 #1a237e14',
                background: selectedCategory?.id === cat.id
                  ? 'linear-gradient(120deg, #e3eafc 60%, #f8fafc 100%)'
                  : 'linear-gradient(120deg, #fff 60%, #f8fafc 100%)',
                overflow: 'hidden',
                transition: 'all 0.32s cubic-bezier(.4,2,.6,1)',
                filter: selectedCategory?.id === cat.id ? 'drop-shadow(0 0 12px #1976d2aa)' : 'none',
                cursor: 'pointer',
                '&:hover, &:focus': {
                  boxShadow: '0 8px 36px 0 #1976d244',
                  background: 'linear-gradient(120deg, #e3eafc 80%, #fff 100%)',
                  transform: 'translateY(-8px) scale(1.045)',
                  filter: 'drop-shadow(0 0 18px #1976d2bb)',
                },
              }}
              tabIndex={0}
              onClick={() => {
                handleSelectCategory(cat);
                const card = document.getElementById(`cat-${cat.id}`);
                if (card) {
                  card.animate(
                    [{ transform: 'scale(1.03)' }, { transform: 'scale(1)' }],
                    { duration: 120, easing: 'ease-out' }
                  );
                }
              }}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSelectCategory(cat); }}
            >
              <Box sx={{
                mt: 1.5,
                mb: 1.5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 70,
                height: 70,
                borderRadius: '50%',
                background: selectedCategory?.id === cat.id
                  ? 'linear-gradient(120deg, #1976d2 60%, #1a237e 100%)'
                  : 'linear-gradient(120deg, #e3eafc 60%, #f8fafc 100%)',
                boxShadow: selectedCategory?.id === cat.id
                  ? '0 0 0 4px #1976d244'
                  : '0 2px 8px 0 #1a237e11',
                transition: 'all 0.25s',
              }}>
                {React.cloneElement(cat.icon, {
                  sx: {
                    fontSize: 38,
                    color: selectedCategory?.id === cat.id ? '#fff' : '#1976d2',
                    transition: 'color 0.2s',
                  },
                })}
              </Box>

              <CardContent sx={{ p: 0, width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{
                  fontWeight: 700,
                  color: '#1a237e',
                  mb: 0.5,
                  textAlign: 'center',
                  fontSize: { xs: 17, sm: 18, md: 21 }
                }}>
                  {cat.label}
                </Typography>

                <Typography variant="body2" sx={{
                  color: '#374151',
                  textAlign: 'center',
                  mb: 1,
                  minHeight: 32,
                  fontSize: { xs: 13, sm: 14, md: 16 },
                  opacity: 0.92,
                }}>
                  {cat.description}
                </Typography>
              </CardContent>

              <Box sx={{ mt: 'auto', mb: 1.5 }}>
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    color: '#1976d2',
                    fontWeight: 600,
                    fontSize: 15,
                    textTransform: 'none',
                    letterSpacing: 0.2,
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    background: 'rgba(25,118,210,0.07)',
                    boxShadow: 'none',
                    transition: 'background 0.18s',
                    '&:hover': {
                      background: 'rgba(25,118,210,0.16)',
                    }
                  }}
                  tabIndex={-1}
                  disableRipple
                  disabled
                >
                  En savoir plus
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryGrid;
