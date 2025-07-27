import { create } from 'zustand'
import { GameMatchtype,UserDataType } from '../types/types'

interface mystate {
    gameData : GameMatchtype | null
    userData:UserDataType | null
    setGameData : (gameData: GameMatchtype | null) => void
    setUserData : (userData:UserDataType | null) => void
    clearGameData : () => void
    clearUserData: () => void
}

const useDataStore = create<mystate>((set) => ({
    gameData: null,
    userData: null,
    setGameData: (gameData) => set({gameData:gameData}),
    setUserData:(userData) => set({userData:userData}),
    clearGameData: () => set({gameData:null}),
    clearUserData: () => set({userData:null})
}))

export {
    useDataStore
}
