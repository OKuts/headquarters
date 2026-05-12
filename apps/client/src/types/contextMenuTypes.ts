import React from 'react'

export type ActionType = 'EDIT' | 'DELETE' | 'ADD_MAIN' | 'DELETE_MAIN';

export interface MenuOption {
    label: string;
    value: ActionType;
    icon: React.ReactNode;
    color?: string;
}