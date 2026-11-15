# DevScop

Application web pour les recruteurs tech : analyser le profil GitHub d'un développeur, consulter ses dépôts publics et gérer une shortlist de candidats enregistrée sur MockAPI.

## Fonctionnalités

### Recherche
- Recherche d'un utilisateur GitHub depuis l'accueil ou la page Recherche
- Validation du nom d'utilisateur et message d'erreur

### Profil
- Carte du profil : avatar, login, bio, localisation, date d'inscription, dépôts, abonnés, abonnements
- Valeur par défaut quand une information est absente
- Liste des dépôts : nom, description, langage, étoiles, forks, mise à jour
- Bouton « Ajouter à la shortlist » sans doublon

### Shortlist
- Liste des candidats chargée depuis MockAPI
- Modification du statut, de la note et de la note interne
- Suppression avec confirmation
- Filtre par statut et recherche par login
- Nombre de candidats affiché dans le titre

## Technologies

- HTML5, Tailwind CSS (CDN), Font Awesome
- JavaScript (modules ES, async / await, fetch)
- API GitHub et MockAPI
- Git, GitHub et Jira

## Structure

```
├── index.html       # accueil et recherche
├── recherche.html   # profil et dépôts
├── shortlist.html   # liste des candidats
├── main.js          # logique de l'accueil
├── recherche.js     # appels GitHub, profil et dépôts
├── shortlist.js     # appels MockAPI, affichage et filtre
└── dom.js           # sélecteurs DOM partagés
```

## API utilisées

| Service | Méthode | Usage |
|---|---|---|
| GitHub | GET `/users/{username}` | Profil |
| GitHub | GET `/users/{username}/repos` | Dépôts |
| MockAPI | GET `/users` | Charger la shortlist |
| MockAPI | POST `/users` | Ajouter un candidat |
| MockAPI | PUT `/users/{id}` | Modifier un candidat |
| MockAPI | DELETE `/users/{id}` | Supprimer un candidat |

## Lancer le projet

1. Cloner le dépôt
2. Ouvrir le dossier dans VS Code
3. Lancer `index.html` avec **Live Server**

Version en ligne : <lien-github-pages>
Tableau Jira : <lien-jira>

## Auteur

**Said Raya**