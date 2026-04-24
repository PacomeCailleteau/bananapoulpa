# Evaluation - Rex banapoulpa

## Contexte du projet

Le projet fil rouge de l'UE consistait a concevoir un poulpe 3D, a le texturer, a l'animer puis a l'integrer dans une scene temps reel.

Dans mon cas, j'ai suivi une progression complete :
- modelisation dans Blender en m'appuyant sur le tutoriel donne pendant l'UE
- construction du mesh du personnage
- travail des UV pour preparer les textures
- ajout des textures et des materiaux
- animation du personnage
- integration dans Three.js Editor
- reprise en local dans un projet Three.js avec des effets et une ambiance plus pousses

## Technologies utilisees

- Blender pour la modelisation, les UV, les materiaux de base et l'animation
- export du modele anime en GLB pour l'integration web
- Three.js Editor pour la composition initiale de la scene
- export JSON de la scene pour recuperer la composition dans le projet
- Three.js cote code pour le chargement, la camera, les lumieres, l'animation et les effets
- Vite pour le projet local et le build
- Git et GitHub pour versionner et rendre le projet

## Pourquoi ces choix

Blender etait l'outil naturel pour la partie modelisation / UV / animation. Three.js Editor a permis de composer rapidement une premiere scene avec les differents objets du laboratoire. Ensuite, le passage en code local etait necessaire pour aller plus loin que l'editeur et ajouter des comportements plus precis :
- remplacement du modele statique par le GLB anime
- reglage fin de la camera
- effets visuels temps reel
- logique d'animation complementaire
- ajout de l'audio

## Ce qui a ete realise

### 1. Modelisation

Le personnage a ete modelise dans Blender en suivant le tutoriel de cours comme base de methode. Cela m'a permis de mettre en pratique :
- la construction d'un mesh coherent
- les proportions du personnage
- la logique de hierarchie utile pour l'animation

### 2. Rendering

La partie rendu a consiste a preparer le personnage pour un usage temps reel :
- depliage UV
- placement des textures a partir des UV maps
- reglage des materiaux
- export du modele avec ses materiaux vers un format compatible web

### 3. Animation

Le personnage a ete anime dans Blender, puis exporte. Dans la scene web, l'animation du GLB est relue en boucle avec `AnimationMixer`.

### 4. Composition / scene 3D

La scene finale a d'abord ete composee dans Three.js Editor avec le decor de laboratoire, puis exportee en JSON. Ensuite, j'ai repris cette scene dans le projet local pour aller plus loin :
- remplacement du modele statique par `bananapoulpa.glb`
- reglage du cadrage camera
- ajout de fumee sur les elements chimiques
- ajout d'une ambiance lumineuse verte
- ajout de neons visibles avec clignotement
- ajout d'un bloom leger
- ajout d'un son d'ambiance
- ajustements de materiaux comme le verre et certaines surfaces organiques

## Ecueils du projet

Plusieurs difficultes sont apparues pendant le projet :
- la camera initiale ne regardait pas correctement la scene exportee
- les animations n'etaient pas lues au bon niveau dans les objets charges
- le remplacement du modele statique par le GLB anime demandait de conserver exactement la transformation dans la scene
- certains reglages de lumiere rendaient les flacons et bechers trop lumineux
- les navigateurs imposent des contraintes sur l'audio, donc il a fallu passer par une activation utilisateur
- le fichier JSON de scene etait tres volumineux et a du etre stocke via Git LFS

## Ce qui a bien fonctionne

- la continuite de la pipeline Blender -> export -> Three.js
- l'integration du GLB anime dans une scene deja composee
- le rendu d'ambiance final, plus riche que la scene brute de depart
- la coherence globale entre camera, lumiere, fumee, bloom, neons et son
- l'usage combine de Three.js Editor pour prototyper puis du code local pour raffiner

## Ce qui a moins bien fonctionne

- certains materiaux organiques du personnage restent moins convaincants que souhaite
- l'animation des robots du decor reste simplifiee
- l'audio ajoute est procedural et non issu de veritables samples
- le JSON de scene est tres lourd, ce qui n'est pas ideal pour une diffusion web legere

## Analyse critique

Le projet montre bien l'interet d'une pipeline mixte : Blender pour produire l'objet 3D et Three.js pour la composition finale temps reel. Le principal point fort est l'integration progressive des outils vus en cours dans un resultat coherent. Le principal point faible reste la finition de certains materiaux et le poids des assets.

## Si je recommencais

Si je reprenais le projet depuis le debut, je :
- preparerais plus tot une convention de nommage des objets et materiaux
- optimiserais davantage les exports et le poids de la scene
- travaillerais plus directement certains materiaux dans Blender avant export
- preparerais des rendus intermediaires plus tot pour valider camera et ambiance

## Pistes d'amelioration

- utiliser de vrais samples audio de laboratoire
- optimiser ou decouper la scene pour reduire le poids du JSON
- ameliorer les materiaux organiques du personnage a la source
- enrichir le comportement des autres elements animes du decor
- ajouter plus d'interactions dans la scene web

## Suite du projet

Ce projet peut servir de base de portfolio car il montre :
- une chaine de production 3D complete
- une integration web temps reel
- une capacite a passer d'un outil auteur a une scene programmee

Le depot Git et la video permettent de presenter a la fois le resultat final et la demarche technique.
