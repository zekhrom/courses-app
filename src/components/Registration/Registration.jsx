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
import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import env from 'react-dotenv';

const theme = createTheme();

export const Registration = () => {
	const [name, setName] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [errors, setErrors] = React.useState([]);
	//useNavigate replaced useHistory
	const navigate = useNavigate();

	const signup = (e) => {
		e.preventDefault();
		axios
			.post(`${env.API_URL}/register`, {
				name,
				password,
				email,
			})
			.then((response) => {
				navigate('/login');
			})
			.catch((error) => {
				setErrors(
					error.response.data.errors.map((e, i) => (
						<Alert key={i} severity='error'>
							{e}
						</Alert>
					))
				);
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
						{errors.length > 0 && errors}
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Sign up
						</Typography>
						<Box
							component='form'
							onSubmit={signup}
							noValidate
							sx={{ mt: 1 }}
							className='login-form'
						>
							<Input
								label='Name'
								placeholder='Enter name'
								handleOnChange={(e) => setName(e.target.value)}
							/>
							<Input
								label='Email'
								placeholder='Enter email'
								handleOnChange={(e) => setEmail(e.target.value)}
							/>
							<Input
								label='Password'
								placeholder='Enter password'
								handleOnChange={(e) => setPassword(e.target.value)}
								type='password'
							/>

							<Button text='Sign up' type='submit' classes={['login-button']} />
							<Grid container>
								<Grid item>
									<span>If you have an account you can </span>
									<Link href='/login' variant='body2'>
										{'Sign in'}
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
