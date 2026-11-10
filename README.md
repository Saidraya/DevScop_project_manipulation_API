# DevScop

Petit site pour analyser le profil GitHub d'un développeur à partir de son nom d'utilisateur.

## Fonctionnalités

- Recherche d'un utilisateur GitHub depuis la page d'accueil (avec validation du nom)
- Affichage de la carte du profil : avatar, nom d'utilisateur, bio, localisation, date d'inscription, nombre de dépôts, abonnés et abonnements
- Nouvelle recherche directement depuis la page Recherche
- Message d'erreur si l'utilisateur est introuvable

## Technologies

- HTML
- Tailwind CSS (CDN)
- Font Awesome
- JavaScript (modules ES)
- API GitHub : `https://api.github.com/users/{username}`

## Structure du projet

- `main.html` / `main.js` : page d'accueil et champ de recherche
- `recherche.html` / `recherche.js` : résultat de la recherche (appel à l'API et affichage de la carte)
- `shortlist.html` : page de la shortlist (en cours)
- `dom.js` : sélecteurs DOM et regex de validation partagés

## Lancer le projet

1. Cloner le dépôt
2. Ouvrir le dossier dans VS Code
3. Lancer `main.html` avec l'extension **Live Server**

## Fonctionnement

1. L'utilisateur saisit un nom dans `main.html`
2. Le nom est validé, puis enregistré dans `sessionStorage`
3. `recherche.html` lit ce nom, appelle l'API GitHub et affiche la carte du profil

## À faire

- [ ] Afficher les vrais dépôts de l'utilisateur (la liste est encore statique)
- [ ] Bouton « Ajouter à la shortlist » (sauvegarde avec `localStorage`)
- [ ] Page shortlist : affichage et suppression des candidats
- [ ] Liens de navigation entre les pages
