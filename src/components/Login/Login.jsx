import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Login.css';
import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import axios from 'axios';
import env from 'react-dotenv';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

const theme = createTheme();

export const Login = (props) => {
	const [password, setPassword] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [errors, setErrors] = React.useState([]);
	//useNavigate replaced useHistory
	const navigate = useNavigate();

	const signin = (e) => {
		e.preventDefault();
		axios
			.post(`${env.API_URL}/login`, {
				email,
				password,
			})
			.then((response) => {
				localStorage.setItem('token', response.data.result);
				localStorage.setItem('user', JSON.stringify(response.data.user));
				props.onUserChange(response.data.user);
				navigate('/courses');
			})
			.catch((error) => {
				setErrors(<Alert severity='error'>{error.response.data.result}</Alert>);
			});
	};

	return (
		<div className='login'>
			<ThemeProvider theme={theme}>
				<Container component='main' maxWidth='xs'>
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						{errors}
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Sign in
						</Typography>
						<Box
							component='form'
							onSubmit={signin}
							noValidate
							sx={{ mt: 1 }}
							className='login-form'
						>
							<Input
								label='Email'
								placeholder='Enter email'
								handleOnChange={(e) => setEmail(e.target.value)}
								//handleOnChange={onAuthorFieldChange}
							/>
							<Input
								label='Password'
								placeholder='Enter password'
								type='password'
								handleOnChange={(e) => setPassword(e.target.value)}
								//handleOnChange={onAuthorFieldChange}
							/>
							<Button text='Sign in' type='submit' classes={['login-button']} />
							<Grid container>
								<Grid item>
									<span> If you don't have an account you can </span>
									<Link href='/register' variant='body2'>
										{'Sign up'}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		</div>
	);
};
