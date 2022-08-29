import { 
    useState, 
    useEffect 
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllMusic } from '../../api/myoosic'
import messages from '../shared/AutoDismissAlert/messages'
import AddFavorite from '../favorites/AddFavorite'
import RemoveFavorite from '../favorites/RemoveFavorite'

import './myoosic.css'


// style for our card container
const cardContainerStyle = {
    maxWidth: '80vw',
    maxHieght: '30vh',
    overflowX: 'scroll',
display: 'flex',
margin: 'auto',
border: '2px solid black',
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
        for (let i = 0; i<favorites.length; i++) {
            // console.log('list id', favorites[i]._id)
            // console.log('book id', book._id)
            // console.log('user id', user._id)
            // console.log('book user id', favorites[i].userId)
            if(favorites[i].mbid === song.mbid && user._id === favorites[i].userId) {
                return true
            }
        }
        return false
    }


    const songCards = tracks.map((song) => {
    
        return (
        <Card style={{ width: '300px', margin: '15px',display: 'inline-block' , minWidth: '250px'}} key={ song._id }>
            <Card.Header>
                <h1>{ song.name }</h1>
            </Card.Header>
            <Card.Body>

                { addRemoveFavorite(song)
                    ?  
                    <div onClick={() => props.handleRemoveClick(song)} className='controls'>
                        <RemoveFavorite /> 
                    </div>  
                    :     
                    <div onClick={() => props.handleFavoriteClick(song)} className='controls'>
                        <AddFavorite />
                    </div>        
                }
            </Card.Body>
        </Card>)
    })


    const artistCards = artists.map((artist) => {
        
        return (<Card style={{ width: '300px', margin: '15px',display: 'inline-block' , minWidth: '250px'}} key={ artist._id }>
            <Card.Header>
                <h1>{ artist.name }</h1>
            </Card.Header>
            <Card.Body>

            </Card.Body>
        </Card>)
    })

    return (
        <>
            <h1 className='text-center'>Top Songs Chart</h1>
            <div style={cardContainerStyle}>
                {songCards}
            </div>
            <h1 className='text-center'>Top Artists Chart</h1>
            <div style={cardContainerStyle}>
                {artistCards}
            </div>
        </>
        
    )
}

export default MyoosicIndex