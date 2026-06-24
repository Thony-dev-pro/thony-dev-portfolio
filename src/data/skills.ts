import { Server, Database, Container, Network, FlaskConical } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Skill = { name: string; level: string; icon: LucideIcon };

export const skills: Skill[] = [
  { name: "Node.js", level: "Avancé", icon: Server },
  { name: "PostgreSQL", level: "Avancé", icon: Database },
  { name: "Docker", level: "Intermédiaire", icon: Container },
  { name: "REST / API", level: "Avancé", icon: Network },
  { name: "Jest / Tests", level: "Intermédiaire", icon: FlaskConical },
];
