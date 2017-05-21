# Projet MAS-RAD DFA Angular Projet

Projet de fin de CAS DFA dans le cadre du MAS-RAD.
Réalisation:
* Grégoire Blanc
* Sébastien Chèvre

## Généralités
La documentation de l'API Citizen Engagement servant de back pour le travail se trouve [ici][citizenAPI] .
Ce projet est basé sur le cours dispensé dans le cadre du [MAS-RAD DFA][masrad].


## Struture générale de l'application
La structure générale de l'application est schématisée ci-dessous:
![alt text](https://www.lucidchart.com/publicSegments/view/bf89edad-1845-4da2-a514-6ec719cd9437/image.png)

### Navigation
Le schéma ci-dessous affiche le schéma de navigation entre les différentes pages:
![alt text](https://www.lucidchart.com/publicSegments/view/9da34466-0498-4301-9069-7fe9c403b53c/image.png)

## Approche orientée événements
La communication entre les différents service et controlleurs, et entre les controlleurs eux-même est basé sur une approche événementielle. Les événements sont émis dans le rootScope, et souscrit par les composants en ayant besoins. Ci dessous la liste des événements utilisées ainsi que les composants les utlisant: 

| Evénement     | Emmeteur      |Souscribeurs |Remarques                  |
| ------------- | ------------- |-------------|---------------------------|
| userLocated  | LocationService  |
| Content Cell  | Content Cell  |




## Processus d'authentification
Le processus d'authentification se déroule selon les étapes suivantes:
* Accès du client à l'url racine: /
* Le token n'existant pas, l'application retourne le formulaire de login
* Les informaton de connexion sont transmises à l'api REST d'autentification :/auth
* L'API retourne le token et renvoie la page d'accueil de l'application

![alt text](https://www.lucidchart.com/publicSegments/view/1200f078-7542-4752-a0f0-033b7db5be4b/image.png)


##Améliorations
* Affichage des issues recrées à chaque fois un marker, utiliser et réafficher l'issue présente en mémoire
* Implémenter un système de delivery de l'application (WebPack, npm, ...)

**Feel free to change file names and/or content, as you see fit.**

[masrad]: https://github.com/MediaComem/comem-masrad-dfa
[citizenAPI]: https://mediacomem.github.io/comem-citizen-engagement-api/
[starterProject]: 
