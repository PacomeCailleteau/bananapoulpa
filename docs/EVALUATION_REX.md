# Evaluation - Rex banapoulpa

## Sujet

Réalisation d'un projet fil rouge autour d'un poulpe 3D animé, intégré dans une composition Three.js.

## Objectif

Passer d'un modèle 3D à une scène temps réel présentable, avec animation, matériaux, ambiance visuelle, composition et rendu final.

## Ce qui a été réalisé

- intégration de la scène de laboratoire exportée en JSON
- remplacement de l'objet statique par `bananapoulpa.glb`
- lecture automatique des animations du GLB
- réglage du cadrage caméra pour la scène finale
- ajout d'une ambiance chimique avec fumée verte et éclairages localisés
- ajout d'un bloom léger pour renforcer les sources lumineuses
- ajout de néons visibles avec clignotement
- ajout d'une ambiance sonore procédurale
- amélioration de certains matériaux : verre, produits chimiques, lecture générale de la scène

## Choix techniques

- moteur : Three.js
- bundler : Vite
- chargement de scène : `THREE.ObjectLoader` sur export JSON
- chargement du modèle animé : `GLTFLoader`
- animation : `AnimationMixer`
- post-process : `EffectComposer` + `UnrealBloomPass`
- ambiance particulaire : système de fumée procédural en `Points`
- audio : Web Audio API

## Difficultés rencontrées

- cadrage initial incorrect à cause de la caméra locale qui ne correspondait pas à la scène exportée
- animations non visibles car il fallait les relire au bon niveau dans les objets exportés
- remplacement du modèle statique par le GLB animé tout en conservant sa transformation dans la scène
- réglage fin des lumières pour obtenir une ambiance crédible sans brûler les flacons ou les béchers
- nécessité d'un son interactif car les navigateurs bloquent l'autoplay audio

## Ce qui fonctionne bien

- la lecture de l'animation principale
- le cadrage de présentation
- l'ambiance générale du laboratoire
- la cohérence entre néons, bloom, fumée et son
- l'usage de Three.js pour composer rapidement une scène finale interactive

## Limites actuelles

- l'audio est procédural et non basé sur des enregistrements réels
- les robots ont une animation simple de scène, pas une vraie locomotion riggée
- certains matériaux organiques restent approximés par retouche runtime plutôt que retravaillés à la source

## Pistes d'amélioration

- utiliser des samples audio réels de laboratoire
- retravailler les matériaux directement dans Blender ou dans le GLB source
- ajouter une logique interactive aux robots ou aux éléments chimiques
- améliorer encore les ombres de contact et les matériaux organiques

## Supports d'évaluation

- code source du projet
- scène finale Three.js accessible depuis la racine du projet
- vidéo `bananapoulpa.mp4`
