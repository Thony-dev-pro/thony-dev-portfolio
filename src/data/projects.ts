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
    id: "ecommerce-api",
    title: "API e-commerce scalable",
    short: "Architecture microservices traitant 50k req/jour avec intégration Stripe et gestion de stock temps réel.",
    long: "Plateforme back-end pour une marketplace française. Architecture découpée en 6 microservices (catalog, orders, payments, inventory, notifications, auth) communicant via RabbitMQ. Cache Redis multi-niveaux, base PostgreSQL répliquée, déploiement Docker Swarm.",
    challenge: "Le monolithe initial ne tenait plus la charge des soldes (timeout au-delà de 200 req/s) et chaque déploiement bloquait l'ensemble du service. Il fallait isoler les domaines critiques et garantir une cohérence transactionnelle entre paiement et stock.",
    solution: "Découpage progressif en microservices avec un pattern saga pour les transactions distribuées. Mise en place d'un cache Redis avec invalidation par event, d'une queue RabbitMQ pour les événements asynchrones (mail, facturation), et d'un API Gateway Express centralisant l'auth JWT.",
    results: [
      { label: "Requêtes / jour", value: "50k+" },
      { label: "Latence p95", value: "120ms" },
      { label: "Uptime", value: "99.97%" },
    ],
    tags: ["Node.js", "PostgreSQL", "Redis", "Docker"],
    featured: true,
    github: "https://github.com/alexmartin/ecommerce-api",
    demo: "https://demo.alex.dev/ecommerce",
    code: `// orders.service.js
const { publish } = require('./broker');

async function createOrder(userId, cart) {
  const order = await db.tx(async (t) => {
    const o = await t.orders.insert({ userId, total: cart.total });
    await t.items.bulkInsert(o.id, cart.items);
    return o;
  });

  await publish('order.created', { id: order.id });
  return order;
}`,
  },
  {
    id: "notification-platform",
    title: "Plateforme de notification",
    short: "Système push multi-canal (email, SMS, in-app) avec routage intelligent via RabbitMQ.",
    long: "Service centralisé de notifications utilisé par 4 produits internes. Routage par préférences utilisateur, retry exponentiel, observabilité complète via OpenTelemetry.",
    challenge: "Chaque produit envoyait ses notifications de manière fragmentée, sans rate-limiting ni traçabilité. Le risque de spam et l'absence de métriques rendaient l'opération difficile.",
    solution: "Service unique exposant une API REST simple, alimenté par une queue RabbitMQ avec dead-letter queue. Templates Handlebars versionnés en base, providers (SendGrid, Twilio, FCM) pluggables.",
    results: [
      { label: "Messages / mois", value: "2M+" },
      { label: "Taux de livraison", value: "99.4%" },
      { label: "Canaux supportés", value: "5" },
    ],
    tags: ["Express", "RabbitMQ", "MongoDB"],
    github: "https://github.com/alexmartin/notify",
    code: `// dispatcher.js
channel.consume('notify.queue', async (msg) => {
  const job = JSON.parse(msg.content);
  const provider = providers[job.channel];
  await provider.send(job.payload);
  channel.ack(msg);
});`,
  },
  {
    id: "auth-oauth2",
    title: "Auth service OAuth2",
    short: "Service d'authentification central avec JWT, refresh tokens et providers Google / GitHub.",
    long: "Brique d'auth réutilisée sur 7 applications internes. Implémente OAuth2 Authorization Code flow, rotation de refresh tokens, audit log complet et 2FA TOTP.",
    challenge: "Multiplication des systèmes d'auth maison entre les apps, fuites de mots de passe sur un projet legacy.",
    solution: "Service Node.js dédié, base PostgreSQL chiffrée au repos, jetons JWT signés ES256, refresh tokens hashés et stockés avec rotation à chaque usage. Conformité OWASP ASVS niveau 2.",
    results: [
      { label: "Apps connectées", value: "7" },
      { label: "Sessions actives", value: "18k" },
      { label: "Audit OWASP", value: "ASVS L2" },
    ],
    tags: ["Node.js", "JWT", "OAuth2"],
    featured: true,
    github: "https://github.com/alexmartin/auth-svc",
    code: `// token.js
function sign(payload) {
  return jwt.sign(payload, privateKey, {
    algorithm: 'ES256',
    expiresIn: '15m'
  });
}`,
  },
  {
    id: "realtime-analytics",
    title: "Dashboard analytics temps réel",
    short: "Pipeline d'événements WebSocket vers ClickHouse avec API GraphQL pour le dashboard.",
    long: "Outil interne de pilotage produit. Ingest de 10k événements / minute, agrégations à la seconde, visualisation live.",
    challenge: "Les requêtes analytics sur PostgreSQL prenaient plus de 30s sur les vues mensuelles, bloquant le dashboard.",
    solution: "Migration vers ClickHouse pour le stockage colonne, ingestion via Kafka, exposition GraphQL avec subscriptions WebSocket pour le live.",
    results: [
      { label: "Événements / min", value: "10k" },
      { label: "Latence requête", value: "<200ms" },
      { label: "Réduction coût", value: "-60%" },
    ],
    tags: ["Socket.io", "ClickHouse", "GraphQL"],
    github: "https://github.com/alexmartin/rt-analytics",
    code: `// subscription.js
pubsub.subscribe('events', (event) => {
  io.to(event.tenantId).emit('event', event);
});`,
  },
  {
    id: "payment-gateway",
    title: "Passerelle de paiement unifiée",
    short: "Abstraction multi-provider (Stripe, Adyen, Mollie) avec idempotence et reconciliation comptable.",
    long: "Couche d'abstraction utilisée par les équipes produit pour éviter le couplage à un provider unique.",
    challenge: "Migration progressive de Stripe vers Adyen sans interrompre le service, tout en gardant la compta carrée.",
    solution: "API interne uniforme, idempotency keys persistées, webhooks normalisés et job nocturne de reconciliation avec le ledger comptable.",
    results: [
      { label: "Volume traité", value: "12M€/an" },
      { label: "Taux d'échec", value: "0.3%" },
      { label: "Providers", value: "3" },
    ],
    tags: ["Node.js", "PostgreSQL", "Stripe"],
    github: "https://github.com/alexmartin/pay-gateway",
    code: `// charge.js
async function charge({ amount, currency, idemKey }) {
  const existing = await store.findByKey(idemKey);
  if (existing) return existing;
  return provider.charge({ amount, currency });
}`,
  },
  {
    id: "graphql-federation",
    title: "Federation GraphQL multi-équipes",
    short: "Schéma GraphQL fédéré reliant 5 services owners distincts avec Apollo Gateway.",
    long: "Mise en place d'une fédération Apollo pour unifier les APIs internes sans monorepo.",
    challenge: "Les équipes voulaient garder leur autonomie mais le client mobile devait taper 5 endpoints différents.",
    solution: "Apollo Gateway en frontal, schémas distribués versionnés, CI bloquante sur les breaking changes.",
    results: [
      { label: "Sous-graphes", value: "5" },
      { label: "Réduction latence client", value: "-45%" },
      { label: "Équipes contributrices", value: "8" },
    ],
    tags: ["GraphQL", "Node.js", "Docker"],
    github: "https://github.com/alexmartin/gql-federation",
    code: `// gateway.js
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: services
  })
});`,
  },
  {
    id: "cron-scheduler",
    title: "Scheduler distribué",
    short: "Orchestrateur de jobs cron distribué multi-tenant avec dashboard et retry policies.",
    long: "Remplace une vingtaine de cron Linux disséminés sur des VMs. Lock distribué Redis, jobs versionnés, UI de monitoring.",
    challenge: "Visibilité nulle sur les jobs en échec, drift entre environnements, jobs lancés deux fois lors des failovers.",
    solution: "API REST pour déclarer les jobs, Redlock pour l'exclusion mutuelle, persistance des runs en PostgreSQL, dashboard React.",
    results: [
      { label: "Jobs gérés", value: "320+" },
      { label: "Doubles exécutions", value: "0" },
      { label: "MTTR incident", value: "-70%" },
    ],
    tags: ["Node.js", "Redis", "Docker"],
    github: "https://github.com/alexmartin/scheduler",
    code: `// runner.js
const lock = await redlock.acquire([job.id], 30000);
try { await job.run(); }
finally { await lock.release(); }`,
  },
  {
    id: "search-service",
    title: "Service de recherche full-text",
    short: "Indexation Elasticsearch synchronisée via CDC PostgreSQL pour catalogue de 2M de produits.",
    long: "API de recherche avec autocomplete, facettes et tri pertinence métier. Synchro temps réel avec la base produit via Debezium.",
    challenge: "Recherche LIKE en PostgreSQL trop lente (>2s), pertinence médiocre, pas de facettes.",
    solution: "Pipeline CDC Debezium → Kafka → consumer Node.js → Elasticsearch. Scoring custom, suggesters, A/B testing intégré.",
    results: [
      { label: "Documents indexés", value: "2M" },
      { label: "Latence p95", value: "45ms" },
      { label: "CTR amélioré", value: "+18%" },
    ],
    tags: ["Node.js", "GraphQL"],
    github: "https://github.com/alexmartin/search-svc",
    code: `// indexer.js
consumer.on('change', async (evt) => {
  await es.index({
    index: 'products',
    id: evt.id,
    body: transform(evt.after)
  });
});`,
  },
];

export const allTags = ["Tous", "Node.js", "PostgreSQL", "Docker", "GraphQL", "Redis", "JWT"];
