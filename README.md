# 🎯 Dataflow Testing Project

Démonstration complète des méthodologies de couverture de flux de données dans le test logiciel.

## 📋 Objectif

Ce projet illustre les trois critères fondamentaux de couverture de flux de données :

1. **All-Defs Coverage** - Toutes les définitions utilisées
2. **All-Uses Coverage** - Tous les couples (DEF, USE) couverts  
3. **All-DU-Paths Coverage** - Tous les chemins DEF→USE testés

## 🏗️ Structure du Projet
├── src/
│   ├── account-manager.js              # Code source propre
│   └── account-manager-with-issues.js  # Code avec problèmes intentionnels
├── tests/
│   ├── complete-dataflow-coverage.test.js  # Tests complets (méthodologie correcte)
│   └── incomplete-coverage.test.js          # Tests incomplets (problèmes démontrés)
├── docs/
│   └── rapport-dataflow-coverage.docx    # Rapport technique détaillé
└── README.md



## 🚀 Installation et Utilisation

```bash
# Cloner le projet
git clone https://github.com/Zgit-hub237/dataflow-testing-project.git
cd dataflow-testing-project

# Installer les dépendances
npm install

# Exécuter les tests complets
npm run test:complete

# Exécuter les tests incomplets avec couverture
npm run test:incomplete

# Comparaison directe
npm run test:coverage
📊 Résultats Attendus
Avec Tests Complets (Méthodologie Correcte)
Statements: 100%
Branches: 100%
Functions: 100%
All-Defs: 23/23 (100%)
All-Uses: 38/38 (100%)
All-DU-Paths: 15/15 (100%)
Avec Tests Incomplets (Approche Défaillante)
Statements: ~65%
Branches: ~50%
Functions: ~83%
All-Defs: 15/23 (65%)
All-Uses: 22/38 (58%)
All-DU-Paths: 8/15 (53%)
🎓 Valeur Pédagogique
Ce projet démontre concrètement :

L'importance des critères de couverture de flux de données
L'impact des méthodologies de test sur la qualité
La détection d'anomalies (code mort, flux incorrects)
Les bonnes pratiques de test en boîte blanche
📚 Documentation
Consultez le rapport technique complet pour :

Fondements théoriques
Méthodologie d'implémentation
Analyse comparative des résultats
Recommandations pratiques
🤝 Contribution
Fork le repository
Créez une branche feature
Commitez vos changements
Pushez vers la branche
Ouvrez une Pull Request
