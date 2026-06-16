import React from 'react'

export type ActionDepartmentType = 'EDIT' | 'DELETE' | 'ADD_MAIN' | 'DELETE_MAIN';
export type ActionUserType = 'EDIT_ROLE' | 'CHANGE_DEPARTMENT'

export interface MenuOption {
    label: string;
    value: ActionDepartmentType | ActionUserType
    icon: React.ReactNode;
    color?: string;
}