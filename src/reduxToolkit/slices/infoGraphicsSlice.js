import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    infoGraphicsList: [],
    newInfoGraphics: {},
    infoGraphics: {},
    infoGraphicsUrl: {}
}
const infoGraphicsSlice = createSlice({
    name: 'infoGraphics',
    initialState: initialState,
    reducers: {
        addInfoGraphics: (state, { payload }) => {
            state.newInfoGraphics = payload
        },
        getInfoGraphicsList: (state, { payload }) => {
            state.infoGraphicsList = payload
        },
        getInfoGraphics: (state, { payload }) => {
            state.infoGraphics = payload
        },
        getInfoGraphicsUrl: (state, { payload }) => {
            state.infoGraphicsUrl = payload
        }
    }
})

export const { addInfoGraphics, getInfoGraphicsList, getInfoGraphics, getInfoGraphicsUrl } = infoGraphicsSlice.actions
export default infoGraphicsSlice.reducer