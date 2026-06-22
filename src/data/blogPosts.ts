export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
  body: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "nodejs-perf-event-loop",
    title: "Comprendre l'event loop Node.js pour optimiser ses APIs",
    excerpt:
      "Plongée dans les phases de l'event loop, les pièges du blocking I/O et les outils pour profiler une API en production.",
    category: "Node.js",
    date: "12 mai 2026",
    readTime: "8 min",
    featured: true,
    body: `## L'event loop, en bref

L'event loop Node.js orchestre l'exécution non bloquante de votre code. Comprendre ses phases (timers, pending callbacks, poll, check, close) est la base pour diagnostiquer une API lente.

## Les pièges classiques

Une boucle synchrone de quelques dizaines de milliers d'éléments suffit à geler tout le serveur. Le coupable : du CPU-bound dans un thread unique.

\`\`\`js
// À éviter
function hashAll(items) {
  return items.map(i => bcrypt.hashSync(i, 12));
}
\`\`\`

## Profiler en production

\`clinic.js\` et \`0x\` permettent de générer des flamegraphs très lisibles. Couplé à un APM (Datadog, New Relic), on identifie en quelques minutes les fonctions à déporter en worker thread.

## Conclusion

Maîtriser l'event loop, c'est gagner un ordre de grandeur sur la latence p95.`,
  },
  {
    slug: "postgres-indexation-pratique",
    title: "Indexation PostgreSQL : guide pratique pour développeurs back-end",
    excerpt:
      "Quand poser un index B-tree, GIN ou BRIN ? Comment lire un EXPLAIN ANALYZE ? Réponses avec des cas concrets.",
    category: "PostgreSQL",
    date: "28 avril 2026",
    readTime: "11 min",
    body: `## EXPLAIN, votre meilleur ami

Avant tout index, il faut savoir lire un plan d'exécution. \`EXPLAIN (ANALYZE, BUFFERS)\` donne le coût réel et les pages lues.

## B-tree, GIN, BRIN

- B-tree : par défaut, parfait pour égalité et range.
- GIN : recherches full-text et tableaux.
- BRIN : très grandes tables triées chronologiquement.

## Exemple

\`\`\`sql
CREATE INDEX idx_orders_user_created
  ON orders (user_id, created_at DESC);
\`\`\`

## À retenir

Un index mal posé coûte aussi cher en écriture qu'il rapporte en lecture.`,
  },
  {
    slug: "docker-multistage",
    title: "Builds Docker multi-stage pour Node.js : -70% de taille d'image",
    excerpt:
      "Passer d'une image de 1.2 Go à 280 Mo sans rien sacrifier en suivant 4 étapes simples.",
    category: "Docker",
    date: "15 avril 2026",
    readTime: "6 min",
    body: `## Pourquoi multi-stage

Vous n'avez pas besoin de \`devDependencies\` ni du compilateur TypeScript dans votre image finale.

## Recette

\`\`\`dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
CMD ["node", "server.js"]
\`\`\`

## Résultat

Image finale ~280 Mo au lieu de ~1.2 Go.`,
  },
  {
    slug: "rest-vs-graphql",
    title: "REST ou GraphQL ? Le choix dépend de vos consommateurs",
    excerpt:
      "Analyse pragmatique : quand REST est suffisant, quand GraphQL fait gagner du temps, et quand les deux cohabitent.",
    category: "API",
    date: "2 avril 2026",
    readTime: "9 min",
    body: `## Pas de religion

Les deux ont leurs forces. REST pour les ressources stables, GraphQL pour les UIs riches qui agrègent plusieurs sources.

## Critères de choix

- Nombre de consommateurs hétérogènes ? GraphQL.
- API publique versionnée ? REST.
- Mobile + web + B2B ? Souvent GraphQL en frontal, REST derrière.

## Conclusion

Le pire choix est celui qu'on défend par dogmatisme.`,
  },
  {
    slug: "auth-jwt-pieges",
    title: "JWT en production : 5 pièges qui m'ont coûté cher",
    excerpt:
      "Algorithmes faibles, expiration mal pensée, refresh tokens non révocables : retour d'expérience honnête.",
    category: "Auth",
    date: "20 mars 2026",
    readTime: "10 min",
    body: `## 1. \`alg: none\`

Toujours valider explicitement l'algorithme côté serveur.

## 2. Expiration trop longue

15 minutes pour l'access token, jamais plus.

## 3. Refresh non révocables

Stockez-les hashés, avec rotation à chaque usage.

## 4. Stockage côté client

\`localStorage\` est vulnérable au XSS. Préférez un cookie httpOnly.

## 5. Pas d'audit log

Sans journalisation, impossible d'investiguer une compromission.`,
  },
  {
    slug: "microservices-quand-decouper",
    title: "Microservices : quand découper, quand surtout pas",
    excerpt:
      "Les microservices ne sont pas un objectif, c'est une réponse à un problème. Voici lesquels.",
    category: "Architecture",
    date: "8 mars 2026",
    readTime: "7 min",
    body: `## Le bon timing

Découper trop tôt = surcoût opérationnel énorme pour zéro bénéfice.

## Les bons signaux

- Équipes >20 personnes qui se marchent sur les pieds.
- Domaines métier avec scaling très différents.
- Cycle de release qui devient le bottleneck.

## Conclusion

Commencez par un monolithe modulaire bien découpé. Le jour où vous étoufferez vraiment, le découpage sera évident.`,
  },
];
