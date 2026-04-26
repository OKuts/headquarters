// packages/shared/src/types/auth.ts
export enum EUserRole {
    ADMIN = 'ADMIN',
    EDITOR = 'EDITOR',
    VIEWER = 'VIEWER'
}

export interface User {
    login: string;
    role?: EUserRole
}