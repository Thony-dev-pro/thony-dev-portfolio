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
    id: "mini-monitoring",
    title: "MiniMonitoring — Dashboard de monitoring système en temps réel",
    short: "Application web full-stack de monitoring système visualisant en temps réel les métriques d'un serveur (CPU, RAM, disque, uptime) avec rafraîchissement automatique toutes les 5 secondes.",
    long: "Application web de monitoring système full-stack permettant de visualiser en temps réel les métriques d'un serveur (CPU, RAM, disque, uptime). Les données sont collectées côté serveur, persistées en base de données et exposées via une API REST consommée par un frontend réactif avec rafraîchissement automatique toutes les 5 secondes.",
    challenge: "Mettre en place une architecture découplée frontend/backend permettant la collecte, la persistance et la visualisation en temps réel de métriques système, tout en gérant correctement le CORS et la conteneurisation multi-services.",
    solution: "API REST Node.js pour la collecte et l'exposition des métriques, persistance des snapshots en PostgreSQL, frontend Angular 19 avec polling HTTP toutes les 5 secondes et jauges SVG animées. Ensemble des services conteneurisés via Docker avec proxy Angular pour la gestion du CORS.",
    results: [
      { label: "Rafraîchissement", value: "5s" },
      { label: "Services Docker", value: "3" },
      { label: "Métriques suivies", value: "4" },
    ],
    tags: ["Angular", "Node.js", "PostgreSQL", "Docker"],
    featured: true,
    code: `// metrics.controller.js
router.get('/metrics', async (req, res) => {
  const snapshot = await collectMetrics(); // CPU, RAM, disk, uptime
  await db.query(
    'INSERT INTO snapshots (cpu, ram, disk, uptime) VALUES ($1,$2,$3,$4)',
    [snapshot.cpu, snapshot.ram, snapshot.disk, snapshot.uptime]
  );
  res.json(snapshot);
});`,
  },
  {
    id: "mall-management",
    title: "Plateforme de gestion de centre commercial",
    short: "Architecture multi-rôles (Admin, Boutique, Acheteur) avec dashboard analytique, gestion de stock et tunnel de commande complet.",
    long: "Plateforme web académique permettant à un admin de superviser l'ensemble du centre, aux boutiques de gérer leur stock et aux acheteurs de passer commande. Authentification sécurisée par rôle, visualisations graphiques du CA et des ventes, et tunnel de commande complet.",
    challenge: "Concevoir une architecture multi-rôles cohérente avec des permissions distinctes, tout en offrant un dashboard analytique riche et un parcours d'achat fluide de bout en bout.",
    solution: "Backend MEAN Stack avec séparation des routes par rôle, modélisation MongoDB optimisée, dashboard Angular avec charts dynamiques et pipeline de commande : panier → validation → paiement. Backend déployé sur Railway, frontend sur Vercel.",
    results: [
      { label: "Rôles gérés", value: "3" },
      { label: "Backend", value: "Railway" },
      { label: "Frontend", value: "Vercel" },
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

export const allTags = ["Tous", "MongoDB", "Express.js", "Angular", "Node.js", "PostgreSQL", "Docker"];
