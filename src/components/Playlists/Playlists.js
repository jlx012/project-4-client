import { 
    useState, 
    useEffect 
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllPlaylists } from '../../api/myoosic'
import messages from '../shared/AutoDismissAlert/messages'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const PlaylistsIndex = (props) => {
    const [playlists, setPlaylists] = useState(null)
    // const [localBooks, setLocalBooks] = useState([])
    const [error, setError] = useState(false)
    // const [img, setImg] = useState();
    const { msgAlert, triggerRefresh } = props
    const { user } = props

    useEffect(() => {
        getAllPlaylists()
            .then(res => {
                setPlaylists(res.data.playlists)})
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Playlists',
                    message: messages.getPlaylistsFailure,
                    variant: 'danger',
                })
                setError(true)
            })

    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If playlists haven't been loaded yet, show a loading message
    if (!playlists) {
        return <LoadingScreen />
    } else if (playlists.length === 0) {
        return <p>No playlists yet. Better add some.</p>
    }


    const playlistsCards = playlists.map((playlist) => {
        // if (playlist.userId === user._id) {
            return (
            <Card style={{ width: '80%', height: '150px', margin: 5, opacity: '90%'}} key={ playlist._id }>
                <Card.Body className='text-center'>
                    <Card.Title >
                        <Link to={`/playlists/${playlist._id}`}>{ playlist.name }</Link>
                    </Card.Title>
                    <Card.Text display="flex-right">{ playlist.description }</Card.Text>              
                </Card.Body>
            </Card>)
        // }
})

    return (
        <div style={ cardContainerStyle }>
            {  playlistsCards }
        </div>
    )
}

export default PlaylistsIndex
