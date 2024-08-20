import { Flag, Project } from '@prisma/client';

export type ProjectWithFlags = Project & { flags: Flag[] };
