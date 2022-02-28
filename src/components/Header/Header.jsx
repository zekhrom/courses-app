import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../common/Button/Button';
import { buttonText } from '../../constants';
import { Logo } from './components/Logo/Logo';

export const Header = (props) => {
	const token = localStorage.getItem('token');
	const navigate = useNavigate();

	const handleClick = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		props.onUserChange('');
		navigate('/login');
	};
	return (
		<Box className='header'>
			<Grid container spacing={2} style={{ margin: 10 }}>
				<Grid item md={9}>
					<Logo />
				</Grid>
				<Grid item container md={3}>
					<Grid item md={12}>
						{props.user && props.user.name}
					</Grid>
					<Grid item>
						{token && (
							<Button
								text={buttonText}
								handleClick={handleClick}
								classes={['LinkButton']}
							/>
						)}
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};
