import { Box, Grid } from '@mui/material';
import { Button } from '../../common/Button/Button';
import { buttonText, userName } from '../../constants';
import { Logo } from './components/Logo/Logo';

const handleClick = () => console.log('button clicked');

export const Header = () => {
	return (
		<Box>
			<Grid container spacing={2}>
				<Grid item md={9}>
					<Logo />
				</Grid>
				<Grid item container md={3}>
					<Grid item md={12}>
						{userName}
					</Grid>
					<Grid item>
						<Button
							text={buttonText}
							handleClick={handleClick}
							classes={['LinkButton']}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};
