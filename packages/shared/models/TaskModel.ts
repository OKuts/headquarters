// packages/shared/src/models/Task.ts
export enum ETaskType {
    'ONCE'='once', 'MONTHLY'='monthly' , 'WEEKLY' = 'weekly'}

export enum EWeek {
    'Оберіть день'='0',
    'Понеділок'='1' ,
    'Вівторок'='2',
    'Середа'='3',
    'Четвер'='4',
    'П\'ятниця'='5',
    'Субота'='6',
    'Неділя'='7',
 }

export interface ITask {
    _id?: any // MongoDB ID
    title: string
    deadline: string
    type: ETaskType
    createdAt?: Date
    closedAt?: Date
    description: string
    doc?: string
}


