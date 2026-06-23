export type Experience = {
  period: string;
  role: string;
  company: string;
  description: string;
  tasks: string[];
  stack?: string;
};

export const experience: Experience[] = [
  {
    period: "Depuis février 2025",
    role: "Développeur Full Stack",
    company: "Vanilla Pay International",
    description: "Développement de nouvelles fonctionnalités pour le Back Office Client et Administrateur.",
    tasks: [
      "Développement de nouvelles fonctionnalités pour le Back Office Client et Administrateur",
      "Intégration des solutions de paiement mobile money : MVola, Orange Money et Airtel Money",
      "Conception et développement d'API de paiement USSD pour Airtel Money et Orange Money, destinées aux offres de YAS Madagascar",
      "Amélioration et maintenance des modules PrestaShop et WordPress",
      "Support et assistance technique aux clients",
      "Analyse et correction des bugs signalés par les utilisateurs",
    ],
    stack: "Node.js · Express.js",
  },
  {
    period: "Octobre 2024 — Février 2025",
    role: "Stage Développeur Full Stack",
    company: "Vanilla Pay International",
    description: "Contribution au développement et à la maintenance de la plateforme de paiement.",
    tasks: [
      "Développement d'une fonctionnalité de gestion des litiges pour les transactions Stripe",
      "Intégration de la passerelle de paiement Mollie au sein de la plateforme",
      "Automatisation des demandes de reversement à la suite des paiements reçus",
      "Création d'un module de gestion des offres commerciales et des offres promotionnelles",
      "Maintenance corrective et évolutive de l'application",
      "Rédaction et mise à jour de la documentation technique",
    ],
    stack: "Node.js · Express.js",
  },
];
