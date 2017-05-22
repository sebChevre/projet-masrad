# Projet MAS-RAD DFA Angular Projet

Projet de fin de CAS DFA dans le cadre du MAS-RAD.
Réalisation:
* Grégoire Blanc
* Sébastien Chèvre

# Généralités
La documentation de l'API Citizen Engagement servant de back pour le travail se trouve [ici][citizenAPI].
Ce projet est basé sur le cours dispensé dans le cadre du [MAS-RAD DFA][masrad].


# Struture générale de l'application
La structure générale de l'application est schématisée ci-dessous:
![alt text](https://www.lucidchart.com/publicSegments/view/3dbb8e43-bb15-4d69-b029-97bff53093e3/image.png)

## Navigation
Le schéma ci-dessous affiche le schéma de navigation entre les différentes pages:
![alt text](https://www.lucidchart.com/publicSegments/view/91fc6fa5-19c0-4886-b473-ed1b005e493b/image.png)

## Approche orientée événements
La communication entre les différents service et controlleurs, et entre les controlleurs eux-même est basé sur une approche événementielle. Les événements sont émis dans le rootScope, et souscrit par les composants en ayant besoins. Ci dessous la liste des événements utilisées ainsi que les composants les utlisant: 

| Evénement     | Emmeteur      |Souscribeurs |Remarques                  |
| ------------- | ------------- |-------------|---------------------------|
| **userLocated** - position de l'utilisateur détectée  |LocationService  |MapController|Utilisé pour afficher la position de l'utilisateur|
|               |               |HeaderController|Affiche l'état de détection de la position dans la barre de navigation|  
| **allIssuesFound** - issues "récente" récupérés  |IssuesService  |IssueController|Utilisé pour afficher les issues à l'initialisation|
|**myIssuesFound** - issues de l'utilisateur récupérés |IssuesService|IssueController|Utilisé pour afficher les issues à l'initialisation|
|**IssueCreated** - sauvegarde de l'issue effectuée|IssuesService|IssueController|Utilisé pour effectuer la sauvegarde de l'issues|
|**issueTypeFound** - type d'issue récupérés|IssuesService|MapController|Utilisé dans le formulaire de saisie d'une nouvelle issue|
|               |               |TypesController|Utilisé pour la gestion des types d'issues|
|**showIssueClicked** - clic sur le bouton d'affichage d'une issue dans la carte|IssuesController|MapController|Affichage de l'issue sur le clic|
|**allUsersFound** - utilisateurs chargés|UsersService|UsersController|Utilisé pour afficher les utilisateurs|
|**addStaffUser** - droit staff ajouté à un utilisateur|UsersService|UsersController|Utilisé pour gérer le droit staff à un utilisateur|
|**issueTypeCreated** - type d'issue sauvegardée|IssuesService|TypesController|Utilisé pour gérer l'insertion de nouveau type d'issues|


Le schéma ci-dessous illustre les communications événementielles:
![alt_text](https://www.lucidchart.com/publicSegments/view/aeadc2c7-c2c4-4ad8-ac21-589dddbdcdb9/image.png)

# Authentification et gestion des droits
## Processus d'authentification
Le processus d'authentification se déroule selon les étapes suivantes:
* Accès du client à l'url racine: /
* Le token n'existant pas, l'application retourne le formulaire de login
* Les informaton de connexion sont transmises à l'api REST d'autentification :/auth
* L'API retourne le token et renvoie la page d'accueil de l'application

![alt text](https://www.lucidchart.com/publicSegments/view/1200f078-7542-4752-a0f0-033b7db5be4b/image.png)

## Geston des rôles
L'application gère deux rôle différents:
* **citizen** : droit standard permettant de consulter, afficher et crééer des issues.
* **staff** : droit d'administration permettant de gérer les droits utilisateurs et les types d'issues.
  Les routes **users** et **types** sont réservés aux utilisateurs ayant le rôle **staff**.
Lors de la conneion à l'application, si l'utilisateur a les droits **staff** le menu staff permetant l'accès aux deux routes décrites ci-dessus est disponible:
![Menu Staff](https://www.lucidchart.com/publicSegments/view/cbdb2045-3ad0-400e-ad19-9207d14897d0/image.png)


## Améliorations
* Affichage des issues recrées à chaque fois un marker, utiliser et réafficher l'issue présente en mémoire
* Implémenter un système de delivery de l'application (WebPack, npm, ...)
* Implémenter des tests unitaires et comportementaux

# Execution de l'application
L'application peut être exécuté sur n'importe quel serveur http. La manière la plus simple est d'utiliser le module npm live-server. La commande suivante démarre l'application via ce module:
```live-server

[masrad]: https://github.com/MediaComem/comem-masrad-dfa
[citizenAPI]: https://mediacomem.github.io/comem-citizen-engagement-api/
