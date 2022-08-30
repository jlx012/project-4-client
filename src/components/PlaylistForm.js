import { 
    Form,
    Button,
    Container 
} from 'react-bootstrap'

const PlaylistForm = (props) => {

    const { playlist, handleChange, heading, handleSubmit } = props

    return (
        <>
        <h3 className='text-center text-light py-5'>{heading}</h3>
        <Container className="justify-content-center py-5 bg-dark" style={
            { opacity: '90%',}
         } >
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="title"  className='mt-3 text-light'>Name</Form.Label>
                <Form.Control
                    placeholder="What is this playlists name?"
                    name="name"
                    id="name"
                    value={ playlist.name }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="description" className='mt-3 text-light'>Description</Form.Label>
                <Form.Control
                    placeholder="Give a brief description of the playlist?"
                    type="text"
                    name="description"
                    id="description"
                    value={ playlist.description }
                    onChange={ handleChange }
                />
                <Button className='mt-3' variant={'light'} type="submit">Submit</Button>
            </Form>
        </Container>
        </>
    )
}

export default PlaylistForm