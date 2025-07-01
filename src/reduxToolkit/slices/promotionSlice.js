import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    promotionList: [],
    newPromotion: {},
    promotion: {},
    promotionUrl: {}
}

const promotionSlice = createSlice({
    name: 'promotion',
    initialState: initialState,
    reducers: {
        addPromotion: (state, { payload }) => {
            state.newPromotion = payload
        },
        getPromotionList: (state, { payload }) => {
            state.promotionList = payload
        },
        getPromotion: (state, { payload }) => {
            state.promotion = payload
        },
        getPromotionUrl: (state, { payload }) => {
            state.promotionUrl = payload
        },
    }
})

export const { addPromotion, getPromotionList, getPromotion, getPromotionUrl } = promotionSlice.actions
export default promotionSlice.reducer