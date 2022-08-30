import {
    useState,
    useEffect
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';

import LoadingScreen from '../shared/LoadingScreen'
import { getAllMusic } from '../../api/myoosic'
import messages from '../shared/AutoDismissAlert/messages'
import AddFavorite from '../favorites/AddFavorite'
import RemoveFavorite from '../favorites/RemoveFavorite'


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

const MyoosicIndex = (props) => {
    const [tracks, setTracks] = useState(null)
    const [artists, setArtists] = useState(null)
    const [error, setError] = useState(false)
    const { msgAlert, triggerRefresh } = props
    const { favorites } = props
    const { user } = props


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


    const addRemoveFavorite = (song) => {
        // console.log('book',  book)
        for (let i = 0; i < favorites.length; i++) {
            // console.log('list id', favorites[i]._id)
            // console.log('book id', book._id)
            // console.log('user id', user._id)
            // console.log('book user id', favorites[i].userId)
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
        </>

    )
}

export default MyoosicIndex