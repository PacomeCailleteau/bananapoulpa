Programme prévisionnel :

Lundi 30 mars aprem -> Intro modélisation + Intro Blender

Vendredi 3 avril matin -> Modélisation v2 + Intro rendu + Intro animations + Blender -> faire les bones + esquisse d’un élément des tentacules

Vendredi 3 avril aprem -> Christophe Leclerc : Faire les tentacules + la tête  (composants instancié) + lié les bones au geometry

Jeudi 9 avril -> Laval Virtual -> Tranquille

Vendredi 10 avril matin (9h) -> Retour Laval Virtual +  Rendu / Material / Shaders

Vendredi 10 avril aprem -> Christophe Leclerc : Faire l’animation, UV + material

Vendredi 17 avril matin ->  Coordonnées homogènes / Quaternions / Audio / Collisions

Vendredi 17 avril aprem -> Christophe Leclerc : Finir les matérials + composition

Jeudi 23 avril matin -> ThreeJS

Vendredi 24 avril matin -> Autonomie

Vendredi 24 avril aprem -> Christophe Leclerc : Aide a la vidéo finale

Mercredi 29 avril aprem -> Composition ThreeJS

Compétences de l'UE

BCL3 - Elaborer un diagnostic avec une vision systémique sur le domaine de la 3D en identifiant et analysant les principaux enjeux, verrous techniques et scientifiques afin d'aboutir à une modélisation correcte et optimale.
BCL5 - Produire, mettre en place et maintenir de façon itérative sur la base de spécifications une pipeline de modélisation et un rendu 3D.

Enjeux et objectifs de l'UE
Introduire la 3D dans la formation; ses enjeux, problématiques et outils.
Réaliser un objet 3D.
Effectuer une composition de cet objet 3D dans un moteur 3D.
Etre à niveau pour les prochaines UE : Rx et Interactions collaboratives.

Description de l'UE : Introduction à la modélisation 3D et au rendu 3D.
Au travers d'un projet fil rouge, les étudiants sont amenés a voir les bases de la modélisation 3D : maillage, texture, animation ; du rendu 3D : moteur 3D, shader, composition.
Des notions sont dispensés afin de fournir une compréhension en profondeur de la 3D; à travers les mathématiques spatiales, l'étude d'une pipeline graphique.



La Minute FIL
partager avec tous une réalisation perso, un film, un logiciel, un jeu, une oeuvre... en lien avec l'informatique graphique,
format libre ... préparation facultative ... lancez-vous !

Prendre un créneau de la Minute FILRendez-vous
Computer Graphics (CG) in the industry
Si vous avez trop de GPU ou si vous avez peur qu'ils rouillent, vous pouvez tester :

https://www.ranchcomputing.com/fr/moteur-de-rendu/renderman/

https://www.ranchcomputing.com/fr/moteur-de-rendu/renderman/

https://renderman.pixar.com/

Modélisation
Séance 1
Partie 1 - contexte : les logiciels de modélisation et Gltf
Partie 2 - éléments de modélisation : facettes et mesh ?
Partie 3 - l'interface de Blender : les transformations, les hiérarchies d'objets (scenegraph)
Partie 4 - importer un objet glft dans Three.js et modifier son mesh
code : https://threejs.org/examples/?q=gltf#webgl_loader_gltf
Source : https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_gltf.html

Partie 4bis - un peu d'interaction avec le Raycasting : https://threejs.org/docs/#api/en/core/Raycaster

Modélisation 1/2 Fichier

Blender Getting Started Fichier

solution des exercices three.js vus pendant la séance 1 Fichier
- Créer un projet three.js (voir les slides) ou utiliser https://threejs.org/editor/
- importer gltf loader des exemples Three.js (liens ci-dessus) ou dans ThreeJs Editor -> File/Import
- importer un des objets dessinés dans Blender
- changer l'image d'environment mapping (voir les slides)
// EXO1 :  charger le gltf de votre cube fait sous Blender
// EXO 2 : paramétrer la caméra
// EXO3 : gestion évènements pour RayCast
resultats TP1




Lecture

Activer le son
Temps restant -0:19
1x
Vitesse de lecture

Image dans l'image

Plein écran


Lecture

Activer le son
Temps restant -0:15
1x
Vitesse de lecture

Image dans l'image

Plein écran

Séance 2
Partie 1 - Cours Modélisation 2/2
Partie 2 - Introduction animations
Partie 3 - Présentation du projet + setup des bones  https://www.youtube.com/watch?v=kkc0_FMAapM
Partie 4 - Modélisation tentacules, tête puis lier les bones aux objets modélisés.





Modélisation 2/2 Fichier

Introduction animation Fichier

Déposer le modèle de votre pieuvre (format blender)Devoir
À rendre : mercredi 8 avril 2026, 23:59

Rendering
Seance 2

Partie 1 - Retour Laval Virtual
Partie 2 - Introduction Rendu
Partie 3 - Introduction Material
Partie 4 - Introduction Shader
Partie 5 - Animation du poulpe, UV & material

Introduction Rendu Fichier

Introduction Material Fichier

Introduction Shader Fichier
Ressources textures :

https://polyhaven.com/
https://www.textures.com/

Partagez FBX contenant les textures du poulpeDevoir
À rendre : mercredi 22 avril 2026, 00:00
Déposez vos fichiers





Ressources en Géométrie, Modélisation et Algorithmique
Séance 3
Partie 1 : Coordonnées Homogènes et matrices
Partie 2 : Quaternions
Partie 3 : Collisions
Partie 4 : Finir les materiaux du poulpe + composition de scène
Rappels de géométrie 2D
https://www.geogebra.org/m/B46V4A4D
Matrice 2x2
matrice de rotation : https://www.geogebra.org/m/z6njjsqq
changement de repère : https://www.geogebra.org/m/BeSGAj6X
Cours d'algorithmique graphique
https://people.minesparis.psl.eu/olivier.stab/TP_scilab_MG91/COURS/Supports_de_cours.html
http://lsc.univ-evry.fr/~didier/home/doku.php?id=enseignement
Structure de donneés
B-rep :  https://fr.wikipedia.org/wiki/B-Rep
une B-rep particulière :  https://en.wikipedia.org/wiki/Winged_edge


Logiciels de modélisation 3D
Blender
liste : https://en.wikipedia.org/wiki/List_of_3D_modeling_software
Modélisation 3D en ligne
https://www.tinkercad.com (Autodesk)
https://gestaltor.io (UX3D.io)
Modélisation en immersion
Gravity sketch
Tilt Brush ou Open Brush https://openbrush.app/
Sketch-up  https://app.sketchup.com/
Conversion de fichiers 3D
Meshlab (opensource) et autres
Format
Gltf, le standard du Khronos group  /  tutoriel

Support de cours - Coordonnées homogènes Fichier

Support de cours - Quaternions Fichier

Support de cours - Collisions Fichier
Composition
Séance 4
Export de votre poulpe avec ses textures/materials
Animation dans Three.js
Composition avec d'autres élements 3D (equirectangular, autres objets 3D...)



Cours ThreeJS Fichier

Exemple Animation keyframe à partir d'un export Blender animé Fichier
voir /** ANIMATION **/ dans le code
+ npm i


Archive zip de votre projet de pieuvre animée (bones) avec textures et modèles 3DDevoir
À rendre : vendredi 1 mai 2026, 18:00

Exemple TP Bones en three.js (TS) Fichier

Rendu : Animations 2025 Fichier


Lire la vidéo



Lire la vidéo



Lire la vidéo



Lire la vidéo



Lire la vidéo



Lire la vidéo



Lire la vidéo



Lire la vidéo

Evaluation
# Évaluation - Projet 3D GFX (Poulpe)

## Modalités générales

- **Support attendu** :
- Fichiers `FBX` du poulpe (modèle + animation)
- Textures / materials associés
- Export de la scène finale (moteur 3D / Three.js)
- Livrable `Rex` (compte-rendu, slides ou document)
- **Format de présentation** : Libre (slides, vidéo, etc.)
- **Travail évalué** : Projet fil rouge autour d’un poulpe 3D (modélisation → rendu → composition → retour d’expérience)

Details dans le fichier ci dessous

Evaluation Fichier

Rex GFXDevoir
À rendre : vendredi 1 mai 2026, 00:00
