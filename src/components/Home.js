import { Link } from 'react-router-dom'
import { Container, Card, Button, Header } from 'react-bootstrap'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
	<div className='headerR'></div>
		<div className="container d-flex justify-content-center">
			<img src={window.location.origin + '/images/musicpicture.svg'} alt={"logo"} height='500px' width='500px'/>
			</div>
			<div className='row m-auto d-flex'>
				<div className='col-sm-10 col-md-8 mx-auto d-flex justify-content-center mt-5'>
					{/* <Button variant='btn btn-outline-secondary' type='submit'> */}
						<Link className='px-10 btn btn-outline-secondary w-50 mx-auto' to='/sign-in'>
							Sign In
						</Link>
					{/* </Button> */}
				</div>
			</div>
			<div className='row m-auto d-flex'>
				<div className='col-sm-10 col-md-8 mx-auto d-flex justify-content-center mt-5'>
					{/* <Button variant='primary' type='submit'>  */}
						<Link className='px-10 btn btn-outline-secondary w-50 mx-auto'  to='/sign-up'>
							Sign Up
						</Link>
					{/* </Button> */}
				</div>
			</div>
			<div className='row m-auto d-flex'>
				<div className='col-sm-10 col-md-8 mx-auto d-flex justify-content-center mt-5'>
					{/* <Button variant='primary' type='submit'> */}
						<Link  className='px-5 btn btn-outline-secondary w-50 mx-auto' to='/myoosic'>
							Continue as Guest
						</Link>
					{/* </Button> */}
				</div>
			</div>
		</>
	)
}

export default Home
