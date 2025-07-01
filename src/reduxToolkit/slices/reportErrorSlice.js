import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    reportErrorList: [],
    newReportError: {},
    reportError: {},
}
const reportErrorSlice = createSlice({
    name: 'report_error',
    initialState: initialState,
    reducers: {
        addReportError: (state, { payload }) => {
            state.newReportError = payload
        },
        getReportErrors: (state, { payload }) => {
            state.reportErrorList = payload
        },
        getReportError: (state, { payload }) => {
            state.reportError = payload
        }
    }
})

export const { addReportError, getReportErrors, getReportError } = reportErrorSlice.actions
export default reportErrorSlice.reducer