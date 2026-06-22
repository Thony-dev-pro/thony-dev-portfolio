export type Experience = {
  period: string;
  role: string;
  company: string;
  description: string;
};

export const experience: Experience[] = [
  {
    period: "2022 — présent",
    role: "Lead Back-end Engineer",
    company: "TechFlow SAS, Paris",
    description:
      "Conception d'APIs REST haute disponibilité, pilotage de la migration vers une architecture microservices, mentoring d'une équipe de 3 développeurs.",
  },
  {
    period: "2020 — 2022",
    role: "Développeur Node.js",
    company: "StartupXYZ, Remote",
    description:
      "Conception du back-end SaaS from scratch, intégration des passerelles de paiement, mise en place de la facturation automatique et des webhooks Stripe.",
  },
  {
    period: "2019 — 2020",
    role: "Développeur Full-stack junior",
    company: "Agence Numérique, Lyon",
    description:
      "Développement de sites et APIs pour clients PME, premiers pas en production avec Node.js, Express et MongoDB.",
  },
];
