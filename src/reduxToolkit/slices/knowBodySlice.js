import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    knowBodyList: [],
    newKnowBody: {},
    knowbody: {},
}
const knowBodySlice = createSlice({
    name: 'knowbody',
    initialState: initialState,
    reducers: {
        addKnowBody: (state, { payload }) => {
            state.newKnowBody = payload
        },
        getKnowBodies: (state, { payload }) => {
            state.knowBodyList = payload
        },
        getKnowBody: (state, { payload }) => {
            state.knowbody = payload
        }
    }
})

export const { addKnowBody, getKnowBodies, getKnowBody } = knowBodySlice.actions
export default knowBodySlice.reducer