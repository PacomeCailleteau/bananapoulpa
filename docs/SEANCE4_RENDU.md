# Rendu Séance 4

## Objet du rendu

Le rendu de Séance 4 correspond à la composition finale du projet dans Three.js.

L'objectif est de montrer l'intégration complète du poulpe dans un moteur temps réel web :
- chargement de la scène
- animation du poulpe
- mise en scène dans un décor
- ambiance visuelle et sonore

## Ce qui a été réalisé dans l'UE

Le travail ne se limite pas à la composition Three.js finale. La scène repose sur tout le pipeline construit pendant l'UE :

1. Modélisation du poulpe dans Blender en s'appuyant sur le tutoriel proposé en cours.
2. Mise en place des bones avant la modélisation complète pour anticiper les animations et les mouvements.
3. Construction de la forme générale du poulpe-banane et travail du mesh.
4. Dépliage UV à plat pour permettre l'application correcte des textures.
5. Génération des textures à partir des UV avec le modèle d'IA Nano Banana 2.
6. Retouches dans Blender avec l'outil de smear pour lisser les textures et corriger les imperfections.
7. Animation du poulpe dans Blender, puis export du modèle animé.
8. Composition de la scène dans Three.js Editor en important `laboratoire.glb` ainsi que d'autres objets comme les bidons nucléaires et les petits robots.
9. Placement de plusieurs lumières et de la caméra directement dans Three.js Editor.
10. Export de la scène en JSON puis reprise en local dans un projet Three.js / Vite.
11. Ajout en code de la caméra finale, du bloom, des néons, de la fumée, de la lumière d'ambiance et de l'audio.

## Livrables associés

- code source du projet Three.js
- `public/assets/bananapoulpa/scene.json`
- `public/assets/bananapoulpa/bananapoulpa.glb`
- vidéo `bananapoulpa.mp4`
- dépôt Git : `https://github.com/PacomeCailleteau/bananapoulpa`

## Fonctionnalités intégrées dans la scène finale

- chargement de la scène depuis l'export JSON
- remplacement du modèle statique par le GLB animé
- lecture en boucle de l'animation
- caméra finale réglée pour la présentation
- ambiance de laboratoire avec fumée, bloom, lumières chimiques et néons
- audio d'ambiance activable dans la scène

## Lancement local

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:5173/`.
