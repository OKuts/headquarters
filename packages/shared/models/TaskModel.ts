// packages/shared/src/models/Task.ts
export type TTaskType = 'once' | 'monthly' | 'weekly'

export interface ITask {
    _id?: any // MongoDB ID
    title: string
    deadline: string
    type: TTaskType
    createdAt?: Date
    closedAt?: Date
    description: string
    doc?: string
}
