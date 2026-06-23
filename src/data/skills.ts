import { Server, Database, Container, Network, FlaskConical } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Skill = { name: string; level: string; icon: LucideIcon };

export const skills: Skill[] = [
  { name: "Node.js", level: "Expert", icon: Server },
  { name: "PostgreSQL", level: "Expert", icon: Database },
  { name: "Docker", level: "Avancé", icon: Container },
  { name: "REST / API", level: "Expert", icon: Network },
  { name: "Jest / Tests", level: "Avancé", icon: FlaskConical },
];
