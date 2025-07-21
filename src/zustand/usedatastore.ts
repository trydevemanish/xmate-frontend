import { create } from 'zustand'
import { GameMatchtype,UserDataType } from '../types/types'

interface mystate {
    gameData : GameMatchtype | {}
    userData:UserDataType | {}
    setGameData : (gameData: GameMatchtype | {}) => void
    setUserData : (userData:UserDataType | {}) => void
    clearGameData : () => void
    clearUserData: () => void
}

const useDataStore = create<mystate>((set) => ({
    gameData: {},
    userData: {},
    setGameData: (gameData: GameMatchtype | {}) => set({gameData:gameData}),
    setUserData:(userData:UserDataType | {}) => set({userData:userData}),
    clearGameData: () => set({gameData:{}}),
    clearUserData: () => set({userData:{}})
}))

export {
    useDataStore
}
