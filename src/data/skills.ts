import { Server, Database, Container, Network, Layers, Cloud, GitBranch, FlaskConical } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Skill = { name: string; level: string; icon: LucideIcon };

export const skills: Skill[] = [
  { name: "Node.js", level: "Expert", icon: Server },
  { name: "PostgreSQL", level: "Expert", icon: Database },
  { name: "Docker", level: "Avancé", icon: Container },
  { name: "REST / GraphQL", level: "Expert", icon: Network },
  { name: "Redis", level: "Avancé", icon: Layers },
  { name: "AWS / GCP", level: "Interméd.", icon: Cloud },
  { name: "Git / CI-CD", level: "Avancé", icon: GitBranch },
  { name: "Jest / Tests", level: "Avancé", icon: FlaskConical },
];
