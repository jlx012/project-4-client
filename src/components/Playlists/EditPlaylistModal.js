import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PlaylistForm from '../PlaylistForm'
import { updatePlaylistSuccess, updatePlaylistFailure } from '../shared/AutoDismissAlert/messages'

const EditPlaylistModal = (props) => {
    const { 
        user, show, handleClose, 
        updatePlaylist, msgAlert, triggerRefresh
    } = props

    const [playlist, setPlaylist] = useState(props.playlist)

    console.log('playlist in edit modal', playlist)

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
        // e equals the event
        e.preventDefault()

        updatePlaylist(user, playlist)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updatePlaylistSuccess,
                    variant: 'success'
                })
            })
            // if everything is successful, we need to trigger our refresh for the show page
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updatePlaylistFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <PlaylistForm 
                    playlist={playlist}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Playlist"
                    className='text-dark'
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditPlaylistModal