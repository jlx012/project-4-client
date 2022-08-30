import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllMusic = () => {
    return axios(`${apiUrl}/myoosic`)
}

export const getOneSong = (id) => {
    return axios(`${apiUrl}/myoosic/song/${id}`)
}

export const getOneArtist = (id) => {
    return axios(`${apiUrl}/myoosic/artist/${id}`)
}

export const getAllPlaylists = () => {
    return axios(`${apiUrl}/playlists`)
}

export const getOnePlaylist = (id) => {
    console.log("here is the ID", id)
    return axios(`${apiUrl}/playlists/${id}`)
}

// Create
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

// Delete
export const removePlaylist = (user, playlistId) => {
    return axios({
        url: `${apiUrl}/playlists/${playlistId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}

// UPDATE
export const updatePlaylist = (user, updatedPlaylist) => {
    // console.log('createPlaylist in api was hit')
    // in our createPlaylist form, we're building an object
    // when we pass that object into the api createPlaylist function,
    // it's going to look like the playlists in our database
    // we're going to refer to this as newPlaylist
    // console.log('this is user', user)
    console.log('this is updatedPlaylist', updatedPlaylist)
	return axios({
		url: `${apiUrl}/playlists/${updatedPlaylist._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { playlist: updatedPlaylist }
	})
}
