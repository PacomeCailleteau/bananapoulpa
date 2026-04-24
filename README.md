# banapoulpa

Projet final GFX realise avec Three.js autour d'une scene de laboratoire mettant en scene `bananapoulpa`.

## Apercu

Le projet couvre la fin de la pipeline vue dans l'UE :
- integration d'un modele 3D anime dans une scene temps reel
- chargement d'une composition exportee depuis Three.js Editor
- reglage de la camera et de l'ambiance visuelle
- ajout d'effets temps reel : fumee, bloom, neons, lumiere chimique
- ajout d'une ambiance sonore interactive

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

## Lancer la scene

```bash
npm run dev
```

Puis ouvrir `http://localhost:5173/`.

## Structure du depot

- `index.html` : point d'entree Vite
- `src/main.js` : logique Three.js de la scene
- `public/assets/banapoulpa/` : export JSON de scene et modele anime
- `docs/` : rendu Seance 4 et rex d'evaluation
- `bananapoulpa.mp4` : video de presentation

## Documentation

- rendu Seance 4 : [docs/SEANCE4_RENDU.md](C:/Users/pacom/Documents/Cours/IMT_Atlantique/Cours/A2/Gfx/TP/docs/SEANCE4_RENDU.md)
- rex d'evaluation : [docs/EVALUATION_REX.md](C:/Users/pacom/Documents/Cours/IMT_Atlantique/Cours/A2/Gfx/TP/docs/EVALUATION_REX.md)
