# bananapoulpa

Projet final GFX réalisé avec Three.js autour d'une scène de laboratoire mettant en scène `bananapoulpa`.

## Aperçu

Le projet couvre la fin de la pipeline vue dans l'UE :
- intégration d'un poulpe 3D animé dans une scène temps réel
- chargement d'une composition exportée depuis Three.js Editor
- réglage de la caméra et de l'ambiance visuelle
- ajout d'effets temps réel : fumée, bloom, néons, lumière chimique
- ajout d'une ambiance sonore interactive

https://github.com/user-attachments/assets/63510e0e-d7f4-4de2-9751-b8ec99f8515f

## Installation

```bash
npm install
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Lancer la scène

```bash
npm run dev
```

Puis ouvrir `http://localhost:5173/`.

## Structure du dépôt

- `index.html` : point d'entrée Vite
- `src/main.js` : logique Three.js de la scène
- `public/assets/bananapoulpa/` : export JSON de scène et modèle animé
- `docs/` : rendu Séance 4 et rex d'évaluation
- `bananapoulpa.mp4` : vidéo de présentation

## Documentation

- rendu Séance 4 : [docs/SEANCE4_RENDU.md](C:/Users/pacom/Documents/Cours/IMT_Atlantique/Cours/A2/Gfx/TP/docs/SEANCE4_RENDU.md)
- rex d'évaluation : [docs/EVALUATION_REX.md](C:/Users/pacom/Documents/Cours/IMT_Atlantique/Cours/A2/Gfx/TP/docs/EVALUATION_REX.md)
