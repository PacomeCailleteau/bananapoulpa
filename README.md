# bananapoulpa

![Three.js](https://img.shields.io/badge/Three.js-0.180.0-black?logo=three.js)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite)
![Blender](https://img.shields.io/badge/Blender-Pipeline-F5792A?logo=blender)
![Git LFS](https://img.shields.io/badge/Git%20LFS-enabled-blue)

Projet final de GFX autour d'un **poulpe-banane animé** intégré dans une **scène de laboratoire temps réel** avec **Three.js**.

Le dépôt rassemble la scène finale, les assets exportés, la vidéo de présentation et les documents de rendu associés à l'UE.

## Aperçu

Le projet met en scène `bananapoulpa` dans un laboratoire avec :
- animation du poulpe en boucle
- composition issue de Three.js Editor puis reprise en code
- ambiance chimique avec fumée, bloom, néons et éclairages localisés
- caméra finalisée pour la présentation
- audio d'ambiance interactif

## Visuels

Vidéo de présentation :

https://github.com/user-attachments/assets/63510e0e-d7f4-4de2-9751-b8ec99f8515f

Vidéo locale dans le dépôt :
- `bananapoulpa.mp4`

## Technologies utilisées

### 3D et pipeline

- **Blender** : modélisation, bones, UV, matériaux, animation
- **Nano Banana 2** : génération initiale des textures à partir des UV à plat
- **Blender Smear Tool** : retouches et nettoyage des textures
- **GLB / glTF** : export du modèle animé pour le web

### Composition et rendu temps réel

- **Three.js Editor** : composition initiale de la scène
- **Three.js** : chargement, animation, lumière, caméra, matériaux et effets
- **ObjectLoader** : chargement de la scène exportée en JSON
- **GLTFLoader** : chargement du modèle animé
- **AnimationMixer** : lecture des animations du poulpe
- **EffectComposer + UnrealBloomPass** : bloom post-process
- **Web Audio API** : ambiance sonore interactive

### Projet web

- **Vite** : développement local et build
- **Git + GitHub** : versionnage
- **Git LFS** : stockage du `scene.json`, trop volumineux pour GitHub classique

## Pipeline du projet

1. Préparation des bones dans Blender pour anticiper les mouvements.
2. Modélisation du poulpe-banane.
3. Dépliage UV à plat.
4. Génération des textures avec Nano Banana 2.
5. Retouches dans Blender avec l'outil de smear.
6. Animation du poulpe dans Blender.
7. Export du modèle animé en GLB.
8. Composition de la scène dans Three.js Editor avec `laboratoire.glb`, bidons nucléaires, petits robots, lumières et caméra.
9. Export de la scène en JSON.
10. Reprise locale dans Three.js pour enrichir la scène :
caméra finale, fumée, bloom, néons, ambiance chimique, audio et ajustements visuels.

## Structure du dépôt

- `index.html` : point d'entrée Vite
- `src/main.js` : logique Three.js de la scène
- `public/assets/bananapoulpa/` : export JSON de scène et modèle animé
- `docs/` : rendu Séance 4 et rex d'évaluation
- `bananapoulpa.mp4` : vidéo de présentation

## Installation

```bash
npm install
```

## Lancement

```bash
npm run dev
```

Puis ouvrir :

```text
http://localhost:5173/
```

## Scripts disponibles

```bash
npm run dev
npm run build
npm run preview
```

## Documentation

- rendu Séance 4 : [docs/SEANCE4_RENDU.md](C:/Users/pacom/Documents/Cours/IMT_Atlantique/Cours/A2/Gfx/TP/docs/SEANCE4_RENDU.md)
- rex d'évaluation : [docs/EVALUATION_REX.md](C:/Users/pacom/Documents/Cours/IMT_Atlantique/Cours/A2/Gfx/TP/docs/EVALUATION_REX.md)

## Dépôt GitHub

https://github.com/PacomeCailleteau/bananapoulpa
