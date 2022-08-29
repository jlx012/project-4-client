import { 
    Form,
    Button,
    Container 
} from 'react-bootstrap'

const PlaylistForm = (props) => {

    const { playlist, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="title">Name</Form.Label>
                <Form.Control
                    placeholder="What is this playlists name?"
                    name="name"
                    id="name"
                    value={ playlist.name }
                    onChange={ handleChange }
                />
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                    placeholder="Give a brief description of the playlist?"
                    type="text"
                    name="description"
                    id="description"
                    value={ playlist.description }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default PlaylistForm