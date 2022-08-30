import React, {
    useState,
    useEffect
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';

import LoadingScreen from '../shared/LoadingScreen'
import { getAllMusic, getAllPlaylists, addSongToPlaylist } from '../../api/myoosic'
import messages from '../shared/AutoDismissAlert/messages'
import AddFavorite from '../favorites/AddFavorite'
import RemoveFavorite from '../favorites/RemoveFavorite'

import { Button, CircularProgress } from "@mui/material"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IoIosAddCircle } from "react-icons/io"
import { TiTick } from "react-icons/ti"

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

// Modal Style:
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const MyoosicIndex = (props) => {
    const [tracks, setTracks] = useState(null)
    const [artists, setArtists] = useState(null)
    const [error, setError] = useState(false)
    const { msgAlert, triggerRefresh } = props
    const { favorites } = props
    const { user } = props

    const [open, setOpen] = React.useState(false);
    const [selectedSong, setSelectedSong] = useState(null)
    const [playlist, setPlaylist] = useState(null)

    const handleOpen = (song) => {
        setSelectedSong(song)
        setOpen(true);

    }
    const handleClose = () => {
        setOpen(false);
        setSelectedSong(null)
    }

    useEffect(() => {
        getAllMusic()
            .then(res => {
                // console.table(res.data.songs)
                console.log('hello')
                setTracks(res.data.songs.track)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Songs',
                    message: messages.getSongsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    useEffect(() => {
        getAllMusic()
            .then(res => {
                setArtists(res.data.artists.artist)
                console.log(res.data.artists.artist)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Artists',
                    message: messages.getArtistsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    const fetchingPlaylists = () => {
        getAllPlaylists()
            .then(res => {
                setPlaylist(res.data.playlists)
                console.log(res.data.playlists)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Playlist',
                    message: messages.getPlaylistFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }

    useEffect(() => {
        if (open) {
            fetchingPlaylists()
        } else {
            setPlaylist(null)
        }
    }, [open])

    if (error) {
        return <p>Error!</p>
    }

    // If songs haven't been loaded yet, show a loading message
    if (!tracks) {
        return <LoadingScreen />
    } else if (tracks.length === 0) {
        return <p>No songs yet. Better add some.</p>
    }

    // If artists haven't been loaded yet, show a loading message
    if (!artists) {
        return <LoadingScreen />
    } else if (artists.length === 0) {
        return <p>No Artists yet. Better add some.</p>
    }

    const addToPlay = (play) => {
        addSongToPlaylist(play._id, selectedSong)
            .then(succ => {
                fetchingPlaylists()
            }).catch(err => {
                msgAlert({
                    heading: 'Error Adding Song To Playlist',
                    message: messages.getPlaylistFailure,
                    variant: 'danger',
                })
            })
    }

    const addRemoveFavorite = (song) => {

        for (let i = 0; i < favorites.length; i++) {

            if (favorites[i]._id === song._id && user._id === favorites[i].userId) {
                return true
            }
        }
        return false
    }


    const songCards = tracks.map((song) => {

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
                    {addRemoveFavorite(song)
                        ?
                        <div onClick={() => props.handleRemoveClick(song)} className='controls text-center mx-auto'>
                            <RemoveFavorite />
                        </div>
                        :
                        <div onClick={() => props.handleFavoriteClick(song)} className='controls text-center mx-auto'>
                            <AddFavorite />
                        </div>
                    }
                    <Button className='j_btn' onClick={() => handleOpen(song)}> Add to Playlist </Button>
                </Card.Body>
            </Card>)
    })


    const artistCards = artists.map((artist) => {

        return (<Card style={{ width: '300px', margin: '15px', display: 'inline-block', minWidth: '250px' }} key={artist._id}>
            <Card.Header>
                <h3 className='text-center'>{artist.name}</h3>
            </Card.Header>
            <Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item className='text-center'>Playcount: {artist.playcount}</ListGroup.Item>
                    <ListGroup.Item className='text-center'>Listeners: {artist.listeners}</ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>)
    })

    return (
        <>

            <div className="container p-8 mt-5 mb-5">
                <div className="d-flex">
                    <input class="form-control" type="text" placeholder="Enter Song, Artist name" aria-label="default input example" />
                    <button className="btn bg-dark text-light">Search</button>
                </div>
            </div>

            <h1 className='text-center text-light mt-3'>Top Songs Chart</h1>
            <div style={cardContainerStyle}>
                {songCards}
            </div>
            <h1 className='text-center text-light mt-3' marginTop="50px">Top Artists Chart</h1>
            <div style={cardContainerStyle}>
                {artistCards}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        PlayLists List
                    </Typography>
                    <div className='modal_container'>
                        {
                            playlist ?
                                playlist.length >= 1 ?
                                    playlist.map((play, index) => {
                                        return (
                                            <>
                                                <div className='playlist_box'>
                                                    <div className='name_box'>
                                                        <div className='num'> No. {index + 1} </div>
                                                        <div className='name'> {play?.name} </div>
                                                    </div>
                                                    <div className='action_box'>
                                                        {
                                                            play.playlistData.find((e) => e.name == selectedSong?.name) ?
                                                                <>
                                                                   <Button> <span style={{ color: "green" , fontSize:"1rem" }}> <TiTick /> </span> </Button> 
                                                                </>
                                                                :
                                                                <>
                                                                    <Button onClick={() => addToPlay(play)}> <IoIosAddCircle fontSize="1rem" /> </Button>
                                                                </>
                                                        }
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                    :
                                    <>
                                        <div className='progress_box'>
                                            <Typography id="modal-modal-title" color="red" variant="h6" component="h2">
                                                No Playlist Found
                                            </Typography>
                                        </div>
                                    </>
                                :
                                <>
                                    <div className='progress_box'>
                                        <CircularProgress />
                                    </div>
                                </>
                        }
                    </div>
                </Box>
            </Modal>
        </>

    )
}

export default MyoosicIndex