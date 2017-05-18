# Comem+ MAS-RAD DFA Aungular Projet

Projet de fin de CAS DFA dans le cadre du MAS-RAD.

## API
La documentation de l'API Citizen Engagement servant de back pour le travail se trouve [ici][citizenAPI] .
Ce projet est basé sur le projet starter[MAS-RAD DFA course][masrad].

##Améliorations
* Affichage des issues recrées à chaque fois un marker, utiliser et réafficher l'issue présente en mémoire
* 

## Branch `master`

This branch contains a very basic project structure that includes:
* The `angular` framework
* The `angular-ui-router` library
* The `lodash`library (not required, but very useful)
* The `moment` library (not required, but very useful)
* The `Bootstrap CSS` framework
* An `index.html` file that includes all preceding frameworks/libraires
* An `app.js` file that contains:
  * The main `angular` module, named `app`
  * A `config` function attached to this `app` module with one predefined route, `home`
* An almost blank `main.html` template, used by the `home` state

## Branch `solution`

This branch contains the complete starter code, based on the content of the `master` branch, and adding:
* A (very minimalist) `login.html` template
* A `login-ctrl.js` file with a `LoginCtrl` for logging in
* A `logout-ctrl.js` file with a `LogoutCtrl` (for... logging out)
* An `auth-service.js` file that contains the service handling authentification
* The `angular-storage` library
* A `second.html` template that contains the logout button
* An `auth-interceptor.js` file with the Interceptor that adds the `Authorization` header

**Feel free to change file names and/or content, as you see fit.**

[masrad]: https://github.com/MediaComem/comem-masrad-dfa
[citizenAPI]: https://mediacomem.github.io/comem-citizen-engagement-api/