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
    console.log('createplaylist in api was hit')

    console.log('this is user', user)
    console.log('this is newPlaylist', newPlaylist)
    return axios({
        url: apiUrl + '/create-playlist',
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { playlist: newPlaylist }
    })
}

export const removeBook = (user, bookId) => {
    return axios({
        url: `${apiUrl}/books/${bookId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}

export const removePlaylist = (user, playlistId) => {
    return axios({
        url: `${apiUrl}/playlists/${playlistId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}

