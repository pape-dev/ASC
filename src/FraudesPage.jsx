import React from "react";
import { Container, Typography, Paper, List, ListItem, ListItemText, Box, Button } from "@mui/material";

// Exemple de données statiques, à remplacer par un appel à l'API plus tard
const fraudes = [
  { id: 1, type: "Phishing", description: "Tentative de hameçonnage par email.", signalePar: "alice" },
  { id: 2, type: "Fraude bancaire", description: "Retrait suspect sur mon compte.", signalePar: "bob" },
];

export default function FraudesPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          Liste des fraudes signalées
        </Typography>
        <List>
          {fraudes.map((fraude) => (
            <ListItem key={fraude.id} divider>
              <ListItemText
                primary={fraude.type}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {fraude.description}
                    </Typography>
                    {" — Signalé par " + fraude.signalePar}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ textAlign: "right", mt: 2 }}>
          <Button variant="contained" color="primary">
            Signaler une fraude
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
