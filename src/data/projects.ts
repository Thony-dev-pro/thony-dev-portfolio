export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  short: string;
  long: string;
  context?: string;
  keyPoints?: string[];
  gallery?: { placeholder: string; caption: string }[];
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  tags: string[];
  featured?: boolean;
  github?: string;
  githubLinks?: { label: string; url: string }[];
  demo?: string;
  image?: string;
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
    image: "/assets/images/monitoringImage.png",
    githubLinks: [
      { label: "Backend", url: "https://github.com/Thony-dev-pro/mini-monitoring" },
      { label: "Frontend", url: "https://github.com/Thony-dev-pro/mini-monitoring-front" },
    ],
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
  {
    id: "infrastructure-node-production",
    title: "Infrastructure Node.js Production",
    short: "Déploiement d'une API Node.js/Express sur VPS avec Docker Compose, reverse proxy Nginx, supervision Prometheus/Grafana, centralisation des logs Loki/Promtail et pipeline CI/CD GitHub Actions.",
    long: "Projet d'apprentissage du déploiement et de l'administration d'une application backend en production. L'objectif était de concevoir une infrastructure complète, depuis le développement local jusqu'à l'automatisation des mises à jour, en reproduisant les pratiques utilisées en entreprise.",
    challenge: "Déployer et administrer une application Node.js en production avec conteneurisation, reverse proxy, supervision, centralisation des logs et automatisation CI/CD sur un serveur VPS distant.",
    solution: "API REST Node.js/Express avec PostgreSQL, conteneurisation Docker Compose de l'application, de la base de données, de Nginx, Prometheus, Grafana, Loki et Promtail. Configuration d'un VPS OVH sous Ubuntu avec SSH, UFW et déploiement automatisé via GitHub Actions.",
    results: [
      { label: "Services orchestrés", value: "7" },
      { label: "Supervision", value: "Temps réel" },
      { label: "Déploiement", value: "CI/CD" },
    ],
    tags: ["Node.js", "Express.js", "PostgreSQL", "Docker", "Nginx", "Prometheus", "Grafana", "GitHub Actions"],
    featured: true,
    image: undefined,
    code: `// docker-compose.yml
services:
  app:
    build: ./backend
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/app
  db:
    image: postgres:15
  nginx:
    image: nginx:alpine
    ports: ["80:80"]`,
  },
];

export const allTags = ["Tous", "MongoDB", "Express.js", "Angular", "Node.js", "PostgreSQL", "Docker", "Nginx", "Prometheus", "Grafana", "GitHub Actions", "Linux", "SSH", "GitHub"];
