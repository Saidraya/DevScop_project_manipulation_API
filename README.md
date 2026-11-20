# DevScop

Application web pour les recruteurs tech : analyser le profil GitHub d'un développeur, consulter ses dépôts publics et gérer une shortlist de candidats enregistrée sur MockAPI.

## Aperçu

| Accueil | Profil et dépôts | Shortlist |
|---|---|---|
| ![Accueil](screenshots/accueil.png) | ![Profil](screenshots/profil.png) | ![Shortlist](screenshots/shortlist.png) |

## Fonctionnalités

### Recherche
- Recherche d'un utilisateur GitHub depuis l'accueil ou la page Recherche
- Validation du nom d'utilisateur (regex) et message d'erreur
- Message « aucun développeur trouvé » si le profil n'existe pas

### Profil
- Carte du profil : avatar, login, bio, localisation, date d'inscription, dépôts, abonnés, abonnements
- Valeur par défaut quand une information est absente
- Chargement du profil et des dépôts en parallèle (`Promise.all`)
- Cache `localStorage` avec expiration après 10 minutes
- Bouton « Ajouter à la shortlist » sans doublon

### Dépôts
- Liste des dépôts : nom, description, langage, étoiles, forks, dernière mise à jour
- Filtre par langage (Tous, JavaScript, C++, Python, HTML)
- Recherche d'un dépôt par nom (combinable avec le filtre de langage)

### Shortlist
- Liste des candidats chargée depuis MockAPI
- Modification du statut, de la note (1 à 5) et de la note interne
- Suppression avec confirmation
- Filtre par statut et recherche par login
- Nombre de candidats affiché dans le titre

## Technologies

- HTML5, Tailwind CSS (CDN), Font Awesome
- JavaScript (modules ES, async / await, fetch, `Promise.all`)
- `localStorage` et `sessionStorage`
- API GitHub et MockAPI
- Git, GitHub et Jira

## Structure

```
├── index.html       # accueil et recherche
├── recherche.html   # profil et dépôts
├── shortlist.html   # liste des candidats
├── main.js          # logique de l'accueil
├── recherche.js     # affichage du profil, des dépôts et des filtres
├── shortlist.js     # affichage, modification, suppression et filtre
├── api.js           # appels MockAPI (GET, POST, PUT, DELETE)
├── cache.js         # appels GitHub en parallèle (Promise.all)
├── config.js        # helpers localStorage
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
Tableau Jira : https://saidrayaprintvip19.atlassian.net/jira/software/projects/DVLPRSV2/boards/40

## Auteur

**Said Raya**