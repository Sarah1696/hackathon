# 💡 Boîte à Idées - Plateforme d'Accessibilité

Une plateforme collaborative pour partager et développer des idées d'amélioration de l'accessibilité.

## 🎯 Description

**Boîte à Idées** est une application web qui permet aux utilisateurs de :
- 💡 Partager des idées pour améliorer l'accessibilité
- 🗳️ Voter pour les meilleures propositions
- 💬 Commenter et enrichir les idées
- 🏷️ Organiser les idées par catégories
- 👥 Collaborer pour un monde plus accessible

## 🛠️ Technologies Utilisées

### Frontend
- **React** avec Vite
- **React Router** pour la navigation
- **Bootstrap** 5 pour le design
- **JavaScript ES6+**

### Backend
- **Node.js** avec Express
- **MySQL** pour la base de données
- **JWT** pour l'authentification
- **Argon2** pour le hachage des mots de passe
- **Nodemailer** pour les emails

### Dépendances principales
```bash
# Backend
npm i express cors body-parser nodemon dotenv jsonwebtoken mysql2 express-rate-limit argon2 nodemailer

# Frontend
npm i react react-router-dom bootstrap
```

## 📁 Structure du Projet

```
hackathon/
├── frontend/                 # Application React
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   │   ├── Home/       # Composants page d'accueil
│   │   │   ├── Ideas/      # Composants gestion des idées
│   │   │   ├── header.jsx  # Navigation principale
│   │   │   └── footer.jsx  # Pied de page
│   │   ├── vues/           # Pages principales
│   │   │   ├── home.jsx    # Page d'accueil
│   │   │   ├── ideas.jsx   # Page des idées
│   │   │   ├── login.jsx   # Connexion
│   │   │   └── register.jsx # Inscription
│   │   └── App.jsx         # Composant racine
│   └── package.json
├── backend/                 # API Node.js
│   ├── modules/
│   │   ├── users/          # Gestion utilisateurs
│   │   ├── ideas/          # Gestion des idées
│   │   ├── categories/     # Gestion des catégories
│   │   ├── votes/          # Système de votes
│   │   └── comments/       # Système de commentaires
│   ├── middlewares/        # Middlewares Express
│   ├── utils/              # Utilitaires
│   └── server.js           # Point d'entrée
└── README.md
```

## 🚀 Installation et Démarrage

### Prérequis
- **Node.js** 18+
- **MySQL** 8+
- **npm** ou **yarn**

### 1. Cloner le projet
```bash
git clone [URL_DU_REPO]
cd hackathon
```

### 2. Configuration Backend
```bash
cd backend
npm install

# Créer le fichier .env
cp .env.example .env
# Configurer les variables d'environnement
```

### 3. Configuration Frontend
```bash
cd frontend
npm install
```

### 4. Base de données
```sql
-- Créer la base de données MySQL
CREATE DATABASE boite_a_idees;


### 5. Démarrage
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🌐 URLs d'accès

- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:3000
- **Documentation API** : http://localhost:3000/api

## 📋 Fonctionnalités

### ✅ Implémentées
- 🔐 **Authentification complète** (inscription, connexion, déconnexion)
- 📧 **Vérification email** avec tokens JWT
- 💡 **Gestion des idées** (création, affichage, catégorisation)
- 🏠 **Page d'accueil** avec Top 3 des idées et compteur
- 👤 **Profil utilisateur** dans le header
- 🛡️ **Sécurité** avec rate limiting et validation

### 🚧 En développement
- 🗳️ **Système de votes** sur les idées
- 💬 **Commentaires** sous les idées
- 🔍 **Filtres** par catégorie
- 📱 **Version mobile** responsive

## 🔧 API Endpoints

### Authentification
- `POST /api/users/register` - Inscription
- `POST /api/users/login` - Connexion
- `GET /api/users/logout` - Déconnexion
- `GET /api/users/verify/:token` - Vérification email

### Idées
- `GET /api/ideas/getIdeas` - Liste des idées
- `GET /api/ideas/getIdea?id=:id` - Détail d'une idée
- `POST /api/ideas/postIdea` - Créer une idée

### Catégories
- `GET /api/categories/getCategories` - Liste des catégories

### Votes (à venir)
- `POST /api/votes` - Voter pour une idée
- `DELETE /api/votes` - Retirer un vote
- `GET /api/votes/count/:ideaId` - Nombre de votes

### Commentaires (à venir)
- `GET /api/comments/getComments` - Liste des commentaires
- `POST /api/comments/postComments` - Ajouter un commentaire

## 🎨 Design et UX

### Palette de couleurs
- **Primaire** : Dégradé bleu-vert (#4a90e2 → #50c878)
- **Secondaire** : Blanc et gris
- **Accent** : Emojis pour la convivialité

### Principes UX
- 🎯 **Simplicité** : Interface intuitive
- ♿ **Accessibilité** : Conforme aux standards WCAG
- 📱 **Responsive** : Adapté mobile et desktop
- 🚀 **Performance** : Chargement rapide

## 👥 Équipe

Projet développé lors d'un hackathon sur l'accessibilité.by: Sarah , Nihad, Isabel, Hamza

## 📄 Licence

Ce projet est sous licence MIT.

## 🤝 Contribution

Les contributions sont les bienvenues ! Merci de :
1. Fork le projet
2. Créer une branche feature
3. Commit vos changements
4. Push vers la branche
5. Ouvrir une Pull Request



