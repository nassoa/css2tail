# CSS2Tail

CSS2Tail est un outil interactif qui convertit du CSS brut en classes Tailwind CSS. Il est conçu pour simplifier la migration de projets CSS existants vers Tailwind CSS en fournissant une interface utilisateur intuitive et une conversion en temps réel.

---

## 🚀 Fonctionnalités

- **Éditeur interactif** : Deux éditeurs côte à côte pour saisir le CSS brut et voir les classes Tailwind générées en temps réel.
- **Conversion locale** : La conversion est effectuée directement côté client sans dépendre d'un backend.
- **Support des propriétés CSS courantes** : Conversion des propriétés comme `margin`, `padding`, `font-size`, `line-height`, `color`, etc.
- **Classes personnalisées** : Gestion des valeurs non standard avec des classes arbitraires (ex. : `w-[137px]`).
- **Bouton de copie** : Copiez facilement les classes générées avec un bouton dédié.
- **Interface responsive** : Interface utilisateur adaptée à tous les écrans.

---

## 🛠️ Technologies utilisées

- **Next.js** : Framework React pour le rendu côté client.
- **PostCSS** : Utilisé pour analyser et transformer le CSS.
- **Tailwind CSS** : Framework CSS utilitaire pour générer les classes.
- **React** : Bibliothèque pour construire l'interface utilisateur.
- **TypeScript** : Typage statique pour un code robuste et maintenable.

---

## Fonctionnement

1. **Saisie du CSS brut** : L'utilisateur saisit le CSS brut dans l'éditeur de gauche.
2. **Analyse du CSS** : Le CSS est analysé et les propriétés sont extraites.
3. **Conversion en classes Tailwind** : Les propriétés CSS sont converties en classes Tailwind CSS correspondantes.
4. **Affichage des classes** : Les classes générées sont affichées dans l'éditeur de droite.
5. **Copie des classes** : L'utilisateur peut copier les classes générées en un clic.

## Exemples de conversion

**CSS d'entrée :**

```CSS
.box {
  width: 137px;
  height: 50%;
}
```

**Classes Tailwind générées :**

```html
className="m-4 p-2 text-xl"
```

## Auteur

## Auteur

- **nassoa** - [GitHub](https://github.com/nassoa/)
