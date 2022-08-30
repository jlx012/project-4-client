import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup';

import LoadingScreen from '../shared/LoadingScreen'
import { getOnePlaylist, updatePlaylist, removePlaylist, removeSongToPlaylist } from '../../api/myoosic'
import messages from '../shared/AutoDismissAlert/messages'
import EditPlaylistModal from './EditPlaylistModal'


// style for our card container
const cardContainerStyle = {
    maxWidth: '80vw',
    maxHieght: '30vh',
    overflowX: 'scroll',
    display: 'flex',
    margin: 'auto',
    border: '3px solid white',
    marginTop: '20px',
}

const ShowPlaylist = (props) => {
    const [playlist, setPlaylist] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert } = props
    console.log('user in props', user)
    
    // destructuring to get the id value from our route parameters

    useEffect(() => {
        getOnePlaylist(id)
        // .then(res => console.log(res.data))

            .then(res => setPlaylist(res.data.playlist))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting playlist',
                    message: messages.getPlaylistsFailure,
                    variant: 'danger'
                })
                navigate('/playlists')
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])
        console.log(playlist)
    // here we'll declare a function that runs which will remove the playlist
    // this function's promise chain should send a message, and then go somewhere
    const removeThePlaylist = () => {
        removePlaylist(user, playlist._id)
            // on success send a success message
            .then(() => {
                console.log('this is the user\n', user)
                console.log('this is the playlistId\n', playlist._id)

                msgAlert({
                    heading: 'Success',
                    message: messages.removePlaylistSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/playlists')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing playlist',
                    message: messages.removePlaylistFailure,
                    variant: 'danger'
                })
            })
    }

    const removeSong = (song) => {
        removeSongToPlaylist(playlist._id, song)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removePlaylistSuccess,
                    variant: 'success'
                })

            })
            .catch(err => {
                msgAlert({
                    heading: 'Error removing Song',
                    message: messages.removePlaylistFailure,
                    variant: 'danger'
                })
            })
    }
    

    if (!playlist) {
        return <LoadingScreen />
    }

    const songCards = playlist.playlistData.map((song) => {

        return (
            <Card style={{ width: '300px', margin: '15px', display: 'inline-block', minWidth: '250px' }} key={song._id}>
                <Card.Header>
                    <h3 className='text-center'>{song.name}</h3>
                </Card.Header>
                <Card.Body>
                    <Card.Title className='text-center'>
                        {song.artist.name}
                    </Card.Title>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item className='text-center'>Duration: {song.duration}</ListGroup.Item>
                        <ListGroup.Item className='text-center'>Playcount: {song.playcount}</ListGroup.Item>
                        <ListGroup.Item className='text-center'>Listeners: {song.listeners}</ListGroup.Item>
                    </ListGroup>
                    <Button onClick={() => removeSong(song)} >Remove Song From Playlist</Button>
                </Card.Body>
            </Card>)
    })

    return (
        <>
            <Container className="fluid mt-5 ">
                <Card style={
                    { opacity: '90%',}
                }>
                    <Card.Header>{ playlist.name }</Card.Header>
                    <Card.Body>
                            <div>Description: { playlist.description }</div> 
                    </Card.Body>
                    <Card.Footer>
                        {
                            playlist.owner && user && playlist.owner._id === user._id 
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="dark"
                                >
                                    Edit Playlist
                                </Button>
                                <Button onClick={() => removeThePlaylist()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Delete Playlist
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
                <div style={cardContainerStyle}>
                    {songCards}
                </div>
            </Container>

            <EditPlaylistModal 
                user={user}
                playlist={playlist} 
                show={editModalShow} 
                updatePlaylist={updatePlaylist}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
        </>
    )
}

export default ShowPlaylist