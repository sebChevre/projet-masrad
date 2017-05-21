# Projet MAS-RAD DFA Angular Projet

Projet de fin de CAS DFA dans le cadre du MAS-RAD.
Réalisation:
* Grégoire Blanc
* Sébastien Chèvre

## Struture générale de l'application
La structure générale de l'application est schématisée ci-dessous:
![alt text](https://www.lucidchart.com/publicSegments/view/bf89edad-1845-4da2-a514-6ec719cd9437/image.png)

## API
La documentation de l'API Citizen Engagement servant de back pour le travail se trouve [ici][citizenAPI] .
Ce projet est basé sur le cours dispensé dans le cadre du [MAS-RAD DFA][masrad].
Le projet stater de base se trouve ici...

##Améliorations
* Affichage des issues recrées à chaque fois un marker, utiliser et réafficher l'issue présente en mémoire
* 


## Navigation
Le schéma ci-dessous affiche le schéma de navigation entre les différentes pages:
![alt text](https://www.lucidchart.com/publicSegments/view/9da34466-0498-4301-9069-7fe9c403b53c/image.png)

## Processus d'authentification
Le processus d'authentification se déroule selon les étapes suivantes:
* Accès du client à l'url racine: /
* Le token n'existant pas, l'application retourne le formulaire de login
* Les informaton de connexion sont transmises à l'api REST d'autentification :/auth
* L'API retourne le token et renvoie la page d'accueil de l'application

![alt text](https://www.lucidchart.com/publicSegments/view/1200f078-7542-4752-a0f0-033b7db5be4b/image.png)


**Feel free to change file names and/or content, as you see fit.**

[masrad]: https://github.com/MediaComem/comem-masrad-dfa
[citizenAPI]: https://mediacomem.github.io/comem-citizen-engagement-api/
