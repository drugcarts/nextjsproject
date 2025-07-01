import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { getTotalCount } from '../reduxToolkit/slices/countSlice'

const GetMedicineListService = () => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/totalcount`, { headers: await Authorization() })
        dispatch(getTotalCount(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}


export { GetMedicineListService }