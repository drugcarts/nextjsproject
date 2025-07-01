import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    questionFormList: [],
    newQuestion: {},
    question: {},
    emailQuestion: {}
}
const questionSlice = createSlice({
    name: 'question',
    initialState: initialState,
    reducers: {
        addQuestion: (state, { payload }) => {
            state.newQuestion = payload
        },
        getQuestions: (state, { payload }) => {
            state.questionFormList = payload
        },
        getQuestion: (state, { payload }) => {
            state.question = payload
        },
        sendQuestion: (state, { payload }) => {
            state.emailQuestion = payload
        }
    }
})

export const { addQuestion, getQuestions, getQuestion, sendQuestion } = questionSlice.actions
export default questionSlice.reducer