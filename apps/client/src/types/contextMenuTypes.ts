import React from 'react'

export type ActionType = 'EDIT' | 'DELETE' | 'COPY' | 'ADD_MAIN' | 'SELECT_SUB';

export interface MenuOption {
    label: string;
    value: ActionType;
    icon: React.ReactNode;
    color?: string;
}