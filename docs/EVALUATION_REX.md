# Évaluation - Rex bananapoulpa

## Contexte du projet

Le projet fil rouge de l'UE consistait à concevoir un poulpe 3D, à le texturer, à l'animer puis à l'intégrer dans une scène temps réel.

Dans mon cas, j'ai suivi une progression complète :
- modélisation dans Blender en m'appuyant sur le tutoriel donné pendant l'UE
- préparation des bones pour anticiper les mouvements et l'animation
- construction du mesh du poulpe
- travail des UV pour préparer les textures
- génération puis retouche des textures
- animation du poulpe
- intégration dans Three.js Editor
- reprise en local dans un projet Three.js avec des effets et une ambiance plus poussés

## Technologies utilisées

- Blender pour la modélisation, les bones, les UV, les matériaux de base et l'animation
- Nano Banana 2 pour générer les textures à partir des UV à plat
- outil de smear dans Blender pour lisser les textures et enlever les défauts restants
- export du modèle animé en GLB pour l'intégration web
- Three.js Editor pour la composition initiale de la scène
- export JSON de la scène pour récupérer la composition dans le projet
- Three.js côté code pour le chargement, la caméra, les lumières, l'animation et les effets
- Vite pour le projet local et le build
- Git et GitHub pour versionner et rendre le projet

## Pourquoi ces choix

Blender était l'outil naturel pour la modélisation, les bones, les UV, les textures et l'animation. Three.js Editor a permis de composer rapidement une première scène avec les différents objets du laboratoire. Ensuite, le passage en code local était nécessaire pour aller plus loin que l'éditeur et ajouter des comportements plus précis :
- remplacement du modèle statique par le GLB animé
- réglage fin de la caméra
- effets visuels temps réel
- animation et ambiance de scène
- ajout de l'audio

## Ce qui a été réalisé

### 1. Modélisation

Le poulpe a été modélisé dans Blender en suivant le tutoriel de cours comme base de méthode. J'ai commencé par préparer les bones afin d'anticiper les mouvements des tentacules et l'animation du modèle. Cela m'a permis de mettre en pratique :
- la construction d'un mesh cohérent
- les proportions générales du poulpe
- une hiérarchie compatible avec l'animation

### 2. Rendering

La partie rendu a consisté à préparer le poulpe pour un usage temps réel :
- dépliage UV à plat
- génération des textures avec Nano Banana 2 à partir des UV
- retouches dans Blender avec l'outil de smear pour lisser les textures et enlever les imperfections
- réglage des matériaux
- export du modèle avec ses matériaux vers un format compatible web

### 3. Animation

Le poulpe a été animé dans Blender, puis exporté. Dans la scène web, l'animation du GLB est relue en boucle avec `AnimationMixer`.

### 4. Composition / scène 3D

La scène finale a d'abord été composée dans Three.js Editor :
- import de `laboratoire.glb`
- ajout d'autres objets comme les bidons nucléaires et les petits robots
- placement de plusieurs lumières
- placement de la caméra

Ensuite, la scène a été exportée en JSON et reprise dans le projet local pour aller plus loin :
- remplacement du modèle statique par `bananapoulpa.glb` pour conserver l'animation
- réglage du cadrage caméra
- ajout de fumée sur les éléments chimiques
- ajout d'une ambiance lumineuse verte
- ajout de néons visibles avec clignotement
- ajout d'un bloom léger
- ajout d'un son d'ambiance
- ajustements de matériaux comme le verre et certaines surfaces organiques

## Écueils du projet

Plusieurs difficultés sont apparues pendant le projet :
- j'ai galéré à exporter depuis Blender vers un GLB en gardant correctement les textures
- j'ai galéré à conserver les bones reliés aux tentacules dans l'export
- j'ai galéré sur le bake des animations
- la caméra initiale ne regardait pas correctement la scène exportée
- les animations n'étaient pas lues au bon niveau dans les objets chargés
- le remplacement du modèle statique par le GLB animé demandait de conserver exactement la transformation dans la scène
- certains réglages de lumière rendaient les flacons et béchers trop lumineux
- le fichier JSON de scène était très volumineux et a dû être stocké via Git LFS

## Ce qui a bien fonctionné

- la continuité de la pipeline Blender -> export -> Three.js
- l'intégration du GLB animé dans une scène déjà composée
- le rendu d'ambiance final, plus riche que la scène brute de départ
- la cohérence globale entre caméra, lumière, fumée, bloom, néons et son
- l'usage combiné de Three.js Editor pour prototyper puis du code local pour raffiner

## Ce qui a moins bien fonctionné

- certains matériaux organiques du poulpe restent moins convaincants que souhaité
- l'animation des robots du décor reste simplifiée
- l'audio ajouté est procédural et non issu de véritables samples
- le JSON de scène est très lourd, ce qui n'est pas idéal pour une diffusion web légère

## Analyse critique

Le projet montre bien l'intérêt d'une pipeline mixte : Blender pour produire l'objet 3D et Three.js pour la composition finale temps réel. Le principal point fort est l'intégration progressive des outils vus en cours dans un résultat cohérent. Le principal point faible reste la finition de certains matériaux et le poids des assets.

## Si je recommençais

Si je reprenais le projet depuis le début, je :
- préparerais plus tôt une convention de nommage des objets et matériaux
- optimiserais davantage les exports et le poids de la scène
- travaillerais plus directement certains matériaux dans Blender avant export
- préparerais des rendus intermédiaires plus tôt pour valider caméra et ambiance

## Pistes d'amélioration

- utiliser de vrais samples audio de laboratoire
- optimiser ou découper la scène pour réduire le poids du JSON
- améliorer les matériaux organiques du poulpe à la source
- faire en sorte que les tentacules rétrécissent davantage plus on s'éloigne de la base du corps, comme dans la réalité
- enrichir le comportement des autres éléments animés du décor
- ajouter plus d'interactions dans la scène web

## Suite du projet

Ce projet peut servir de base de portfolio car il montre :
- une chaîne de production 3D complète
- une intégration web temps réel
- une capacité à passer d'un outil auteur à une scène programmée

La suite logique serait de transformer cette scène en démo plus interactive, avec une meilleure optimisation des assets, des matériaux encore plus aboutis et éventuellement une publication jouable en ligne comme pièce de portfolio.
