// packages/shared/index.ts

export interface HealthStatus {
    status: string;
    uptime: number;
    timestamp: string;
}

// Якщо у тебе є тестова змінна для перевірки:
export const SHARED_VERSION = '1.0.0';