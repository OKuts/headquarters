import {create} from 'zustand'

interface SearchState {
    searchValue: string
    setSearch: (searchValue: string) => void
}

export const useSearchStore = create<SearchState>((set) => ({
    searchValue: '',

    setSearch: (searchValue: string) => set({searchValue}),
}))