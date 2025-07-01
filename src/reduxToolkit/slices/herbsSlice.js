import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    herbsList: [],
    newHerbs: {},
    herbs: {},
    herbsUrl: {}
}
const herbsSlice = createSlice({
    name: 'herbs',
    initialState: initialState,
    reducers: {
        addHerbs: (state, { payload }) => {
            state.newHerbs = payload
        },
        getHerbsList: (state, { payload }) => {
            state.herbsList = payload
        },
        getHerbs: (state, { payload }) => {
            state.herbs = payload
        },
        getHerbsUrl: (state, { payload }) => {
            state.herbsUrl = payload
        }
    }
})

export const { addHerbs, getHerbsList, getHerbs, getHerbsUrl } = herbsSlice.actions
export default herbsSlice.reducer