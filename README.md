# Task Manager

Une application moderne de gestion de tâches construite avec React, offrant une interface intuitive pour organiser et suivre vos tâches quotidiennes.

## ✨ Fonctionnalités

### 🎯 Gestion des Tâches
- **Création de tâches** avec titre, description, priorité et date d'échéance
- **Modification et suppression** de tâches existantes
- **Marquage des tâches** comme terminées/non terminées
- **Système de priorités** (Faible, Moyenne, Élevée) avec codes couleur

### 📊 Tableau de Bord
- **Vue d'ensemble** avec statistiques des tâches
- **Barre de progression** du taux d'achèvement
- **Tâches récentes** et **tâches prioritaires**
- **Échéances à venir** pour une meilleure planification

### 🎨 Interface Utilisateur
- **Design moderne** avec Tailwind CSS
- **Mode sombre/clair** avec basculement automatique
- **Interface responsive** adaptée à tous les écrans
- **Animations fluides** et transitions élégantes

### 💾 Persistance des Données
- **Sauvegarde automatique** dans le localStorage
- **Récupération des données** au redémarrage de l'application
- **Aucune configuration** de base de données requise

## 🛠️ Technologies Utilisées

- **React 18** - Framework JavaScript moderne
- **React Router DOM** - Navigation côté client
- **Tailwind CSS** - Framework CSS utilitaire
- **Vite** - Outil de build rapide
- **Jest & Testing Library** - Tests unitaires
- **ESLint** - Linting du code

## 📦 Installation

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**
   ```bash
   git clone <url-du-repository>
   cd PFinal
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer l'application en mode développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir votre navigateur**
   ```
   http://localhost:5173
   ```

## 🚀 Scripts Disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run preview` - Prévisualise la build de production
- `npm run test` - Lance les tests unitaires
- `npm run test:watch` - Lance les tests en mode watch
- `npm run lint` - Vérifie la qualité du code

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Layout.jsx      # Layout principal de l'application
│   ├── Navbar.jsx      # Barre de navigation
│   ├── Sidebar.jsx     # Barre latérale
│   └── TaskCard.jsx    # Carte d'affichage des tâches
├── contexts/           # Contextes React
│   ├── TaskContext.jsx # Gestion d'état des tâches
│   └── ThemeContext.jsx# Gestion du thème
├── pages/              # Pages de l'application
│   ├── Dashboard.jsx   # Tableau de bord principal
│   ├── AddTask.jsx     # Formulaire d'ajout de tâche
│   ├── TaskDetail.jsx  # Détails d'une tâche
│   └── Tasks.jsx       # Liste des tâches
├── __tests__/          # Tests unitaires
└── App.jsx             # Composant racine
```

## 🎮 Utilisation

### Créer une Nouvelle Tâche
1. Cliquez sur le bouton **"Add Task"** depuis le tableau de bord
2. Remplissez le formulaire avec :
   - **Titre** (obligatoire)
   - **Description** (optionnelle)
   - **Priorité** (Faible/Moyenne/Élevée)
   - **Date d'échéance** (optionnelle)
3. Cliquez sur **"Create Task"**

### Gérer les Tâches
- **Marquer comme terminée** : Cliquez sur la case à cocher
- **Modifier une tâche** : Cliquez sur l'icône d'édition
- **Supprimer une tâche** : Cliquez sur l'icône de suppression
- **Voir les détails** : Cliquez sur le titre de la tâche

### Filtrer les Tâches
- **Toutes** : Affiche toutes les tâches
- **Actives** : Affiche uniquement les tâches non terminées
- **Terminées** : Affiche uniquement les tâches terminées

### Changer de Thème
Cliquez sur l'icône de thème dans la barre de navigation pour basculer entre le mode clair et sombre.

## 🧪 Tests

L'application inclut des tests unitaires pour les composants principaux :

```bash
# Lancer tous les tests
npm run test

# Lancer les tests en mode watch
npm run test:watch
```

Les tests couvrent :
- Composants React (TaskCard, Layout, etc.)
- Contextes (TaskContext, ThemeContext)
- Fonctionnalités principales

## 🎨 Personnalisation

### Couleurs et Thème
Les couleurs sont définies dans `tailwind.config.js` et peuvent être personnalisées :

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Personnalisez vos couleurs primaires
      }
    }
  }
}
```

### Styles CSS
Les styles globaux sont dans `src/index.css` avec des classes utilitaires Tailwind.

## 📱 Responsive Design

L'application est entièrement responsive et s'adapte à :
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🔒 Sécurité et Données

- Les données sont stockées localement dans le navigateur
- Aucune donnée n'est envoyée vers des serveurs externes
- Les données persistent entre les sessions

## 🚀 Déploiement

### Build de Production
```bash
npm run build
```

### Déploiement sur Netlify/Vercel
1. Connectez votre repository GitHub
2. Configurez les paramètres de build :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🐛 Signaler des Bugs

Si vous trouvez un bug, veuillez ouvrir une issue avec :
- Description détaillée du problème
- Étapes pour reproduire
- Captures d'écran si applicable
- Informations sur votre environnement (OS, navigateur, etc.)

## 💡 Fonctionnalités Futures

- [ ] Synchronisation cloud
- [ ] Notifications de rappel
- [ ] Catégories de tâches
- [ ] Collaboration en équipe
- [ ] Export/Import des données
- [ ] Mode hors ligne
- [ ] Intégration calendrier

## 📞 Support

Pour toute question ou assistance, n'hésitez pas à :
- Ouvrir une issue sur GitHub
- Consulter la documentation
- Contacter l'équipe de développement

---

**Développé avec ❤️ en utilisant React et Tailwind CSS**
