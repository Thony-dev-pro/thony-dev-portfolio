export type Project = {
  id: string;
  title: string;
  short: string;
  long: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  tags: string[];
  featured?: boolean;
  github?: string;
  demo?: string;
  code: string;
};

export const projects: Project[] = [
  {
    id: "mall-management",
    title: "Plateforme de gestion de centre commercial",
    short: "Architecture multi-rôles (Admin, Boutique, Acheteur) avec dashboard analytique, gestion de stock et tunnel de commande complet.",
    long: "Plateforme web académique permettant à un admin de superviser l'ensemble du centre, aux boutiques de gérer leur stock et aux acheteurs de passer commande. Authentification sécurisée par rôle, visualisations graphiques du CA et des ventes, et tunnel de commande complet.",
    challenge: "Concevoir une architecture multi-rôles cohérente avec des permissions distinctes, tout en offrant un dashboard analytique riche et un parcours d'achat fluide de bout en bout.",
    solution: "Backend MEAN Stack avec séparation des routes par rôle, modélisation MongoDB optimisée, dashboard Angular avec charts dynamiques et pipeline de commande : panier → validation → paiement. Déploiement continu sur Vercel.",
    results: [
      { label: "Rôles gérés", value: "3" },
      { label: "Déploiement", value: "Vercel" },
      { label: "Stack", value: "MEAN" },
    ],
    tags: ["MongoDB", "Express.js", "Angular", "Node.js"],
    featured: true,
    code: `// auth.middleware.js
function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}`,
  },
];

export const allTags = ["Tous", "MongoDB", "Express.js", "Angular", "Node.js"];
