import {ObjectId} from 'mongodb'

export enum ETaskType {
    'ONCE' = 'once', 'MONTHLY' = 'monthly', 'WEEKLY' = 'weekly'
}

export enum EWeek {
    'Оберіть день' = '0',
    'Понеділок' = '1',
    'Вівторок' = '2',
    'Середа' = '3',
    'Четвер' = '4',
    'П\'ятниця' = '5',
    'Субота' = '6',
    'Неділя' = '7',
}

export interface ITask {
    _id: string | ObjectId // MongoDB ID
    title: string
    description: string
    doc?: string
    deadline?: Date
    type: ETaskType
    createdAt: Date
    creator: string | ObjectId
    assignee: string | ObjectId
    doneAt?: Date
    closeAt?: Date
    closeWho?: string | ObjectId
}

export interface ITaskForm {
    title: string;       // Назва завдання
    description: string; // Короткий опис
    type: 'date' | 'monthly' | 'weekly'; // Тип виконання
    deadline?: string;       // Конкретна дата (необов'язкове, якщо тип зміниться)
    assignee: string    // Виконавець
}

export interface IAssignee {
    _id: string,
    name: string,
}

export type ActionType = 'data' | 'all' | 'sub' | 'my'

export interface IAssigneeRequest {
    _id: string,
    method: string,
    action: ActionType
    data?: ITaskForm
}