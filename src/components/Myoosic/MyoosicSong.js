// import { useState, useEffect } from 'react'

// import { useParams, useNavigate } from 'react-router-dom'
// // useParams will allow us to see our parameters
// // useNavigate will allow us to navigate to a specific page

// import { Container, Card, Button } from 'react-bootstrap'

// import LoadingScreen from '../shared/LoadingScreen'
// import { getOneSong } from '../../api/myoosic'
// import messages from '../shared/AutoDismissAlert/messages'

// const cardContainerLayout = {
//     display: 'flex',
//     justifyContent: 'center',
//     flexFlow: 'row wrap'
// }

// const ShowSong = (props) => {
//     const [song, setSong] = useState(null)
//     const [updated, setUpdated] = useState(false)

//     const { id } = useParams()
//     const navigate = useNavigate()
//     // useNavigate returns a function
//     // we can call that function to redirect the user wherever we want to

//     const { user, msgAlert } = props
//     console.log('user in props', user)
    
//     // destructuring to get the id value from our route parameters

//     useEffect(() => {
//         getOneSong(id)
//         // .then(res => console.log(res.data))

//             .then(res => setSong(res.data.track))
//             .catch(err => {                   
//                 msgAlert({
//                     heading: 'Error getting song',
//                     message: messages.getSongFailure,
//                     variant: 'danger'
//                 })
//                 navigate('/myoosic')
//                 //navigate back to the home page if there's an error fetching
//             })
//     }, [updated])
//         console.log(song)
//     // here we'll declare a function that runs which will remove the playlist
//     // this function's promise chain should send a message, and then go somewhere
//     const removeThePlaylist = () => {
//         removePlaylist(user, playlist._id)
//             // on success send a success message
//             .then(() => {
//                 console.log('this is the user\n', user)
//                 console.log('this is the playlistId\n', playlist._id)

//                 msgAlert({
//                     heading: 'Success',
//                     message: messages.removePlaylistSuccess,
//                     variant: 'success'
//                 })
//             })
//             // then navigate to index
//             .then(() => {navigate('/playlists')})
//             // on failure send a failure message
//             .catch(err => {                   
//                 msgAlert({
//                     heading: 'Error removing playlist',
//                     message: messages.removePlaylistFailure,
//                     variant: 'danger'
//                 })
//             })
//     }
    

//     if (!playlist) {
//         return <LoadingScreen />
//     }

//     return (
//         <>
//             <Container className="fluid">
//                 <Card>
//                     <Card.Header>{ playlist.name }</Card.Header>
//                     <Card.Body>
//                             <div>Description: { playlist.description }</div> 
//                     </Card.Body>
//                     <Card.Footer>
//                         {
//                             playlist.owner && user && playlist.owner._id === user._id 
//                             ?
//                             <>
//                                 <Button onClick={() => setEditModalShow(true)} 
//                                     className="m-2" 
//                                     variant="warning"
//                                 >
//                                     Edit Playlist
//                                 </Button>
//                                 <Button onClick={() => removeThePlaylist()}
//                                     className="m-2"
//                                     variant="danger"
//                                 >
//                                     Delete Playlist
//                                 </Button>
//                             </>
//                             :
//                             null
//                         }
//                     </Card.Footer>
//                 </Card>
//             </Container>
//             <EditPlaylistModal 
//                 user={user}
//                 playlist={playlist} 
//                 show={editModalShow} 
//                 updatePlaylist={updatePlaylist}
//                 msgAlert={msgAlert}
//                 triggerRefresh={() => setUpdated(prev => !prev)}
//                 handleClose={() => setEditModalShow(false)} 
//             />
//         </>
//     )
// }

// export default ShowSong