import React, { useState } from 'react'
import { createPlaylist } from '../../api/myoosic'
import { useNavigate } from 'react-router-dom'

import PlaylistForm from '../PlaylistForm'

const CreatePlaylist = (props) => {
    console.log('these are the props in CreatePlaylist\n', props)
    const {user, msgAlert } = props
    const [playlist, setPlaylist] = useState({
        name: '',
        description: '',
    })

    console.log('this is playlist in createPlaylist', playlist)
    const handleChange = (e) => {
        setPlaylist(prevPlaylist => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            console.log('this is the input type', e.target.type)

            const updatedPlaylist = {
                [updatedName]: updatedValue
            }

            return {
                ...prevPlaylist,
                ...updatedPlaylist
            }
        })
    }

    const handleSubmit = (e) => {
        //e equals the event
        e.preventDefault()   

        createPlaylist(user, playlist)
            .then(() => {
                console.log('success')
            })
            .catch((err) => console.log(err))
    }

    return (
        <PlaylistForm 
            playlist={ playlist } 
            handleChange={ handleChange } 
            handleSubmit={ handleSubmit }
            heading="Create a new playlist!"
        />
    )
}

export default CreatePlaylist