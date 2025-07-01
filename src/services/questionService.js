import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addQuestion, getQuestions, getQuestion, sendQuestion } from '../reduxToolkit/slices/questionFormSlice'

const PostQuestionService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/question_form', data, { headers: await Authorization() })
        dispatch(addQuestion(postData.data))
        if (postData.status === 200) {
            dispatch(EmailQuestionService({ to: postData.data?.email, subject: "User Question", message: JSON.stringify(postData.data) }))
        }
        // dispatch(GetQuestionIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Question sent Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetQuestionsService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/question_form?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getQuestions(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetQuestionIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/question_form/${id}`, { headers: await Authorization() })
        dispatch(getQuestion(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const DeleteQuestionService = (id) => async (dispatch) => {
    await axios.delete(`/api/question_form/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getQuestion(id))
        dispatch(GetQuestionsService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const EmailQuestionService = (data) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/question_form/send-mail', data, { headers: await Authorization() })
        dispatch(sendQuestion(postData.data))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Your Question sent Successfully!!!", severity: "success" }))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

export { PostQuestionService, GetQuestionsService, GetQuestionIdService, DeleteQuestionService }