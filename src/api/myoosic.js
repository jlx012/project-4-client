import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllMusic = () => {
    return axios(`${apiUrl}/myoosic`)
}

export const getAllPlaylists = () => {
    return axios(`${apiUrl}/playlists`)
}

export const createPlaylist = (user, newPlaylist) => {
    return axios({
        url: apiUrl + 'create-playist',
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: {playlist: newPlaylist}
    })
}