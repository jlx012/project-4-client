import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllMusic = () => {
    return axios(`${apiUrl}/myoosic`)
}