// packages/shared/src/types/auth.ts
export enum UserRole {
    ADMIN = 'ADMIN',
    EDITOR = 'EDITOR',
    VIEWER = 'VIEWER'
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    organizationId?: string; // Наприклад, для бюджетних установ
}