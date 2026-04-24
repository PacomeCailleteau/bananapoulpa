# banapoulpa

Projet final GFX réalisé avec Three.js autour d'une scène de laboratoire mettant en scène `bananapoulpa`.

## Aperçu

Le projet inclut :
- chargement d'une composition de scène exportée en JSON
- remplacement du modèle statique par un GLB animé
- caméra finalisée pour la présentation
- ambiance chimique avec fumée, bloom, néons et éclairages localisés
- audio d'ambiance activable dans la scène

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
- `public/assets/banapoulpa/` : assets principaux (`scene.json`, `bananapoulpa.glb`)
- `docs/` : documents de rendu et rex
- `bananapoulpa.mp4` : capture vidéo du projet

## Documentation

- rendu Séance 4 : [docs/SEANCE4_RENDU.md](C:/Users/pacom/Documents/Cours/IMT_Atlantique/Cours/A2/Gfx/TP/docs/SEANCE4_RENDU.md)
- rex d'évaluation : [docs/EVALUATION_REX.md](C:/Users/pacom/Documents/Cours/IMT_Atlantique/Cours/A2/Gfx/TP/docs/EVALUATION_REX.md)
