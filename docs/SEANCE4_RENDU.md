# Rendu Seance 4

## Objet du rendu

Le rendu de Seance 4 correspond a la composition finale du projet dans Three.js.

L'objectif est de montrer l'integration complete du modele dans un moteur temps reel web :
- chargement de la scene
- animation du personnage principal
- mise en scene dans un decor
- ambiance visuelle et sonore

## Ce qui a ete fait dans l'UE

Le travail ne se limite pas a la composition Three.js finale. La scene repose sur tout le pipeline construit pendant l'UE :

1. Modelisation du personnage dans Blender en s'appuyant sur le tutoriel propose en cours.
2. Construction de la forme generale du poulpe-banane et travail du mesh.
3. Depliage UV pour permettre l'application correcte des textures.
4. Mise en place des textures et des materiaux via les UV maps.
5. Animation du personnage dans Blender, puis export du modele anime.
6. Composition de la scene dans Three.js Editor avec les autres elements du laboratoire.
7. Export de la scene en JSON puis reprise en local dans un projet Three.js / Vite.
8. Ajout en code de la camera finale, du bloom, des neons, de la fumee, de la lumiere d'ambiance et de l'audio.

## Livrables associes

- code source du projet Three.js
- `public/assets/banapoulpa/scene.json`
- `public/assets/banapoulpa/bananapoulpa.glb`
- video `bananapoulpa.mp4`
- depot Git : `https://github.com/PacomeCailleteau/bananapoulpa`

## Fonctionnalites integrees dans la scene finale

- chargement de la scene depuis l'export JSON
- remplacement du modele statique par le GLB anime
- lecture en boucle de l'animation
- camera finale reglee pour la presentation
- ambiance de laboratoire avec fumee, bloom, lumieres chimiques et neons
- audio d'ambiance activable dans la scene

## Lancement local

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:5173/`.

## Format de rendu conseille

Oui, un petit `.zip` contenant un `README.md` propre avec :
- le lien du depot Git
- le lien eventuel de la video
- une phrase claire sur le contenu rendu

peut suffire si l'enseignant accepte un rendu par lien Git.

Pour rester prudent, le plus propre est un zip minimal avec :
- `README.md`
- lien du repo
- lien ou nom de la video
- une phrase indiquant que les documents de rendu sont deja presents dans `docs/`
