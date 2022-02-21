import { ButtonBase } from '@mui/material';
import './Button.css';

const getClasses = (classes) => (classes ? classes.join(' ') : '');

export const Button = (props) => (
	<ButtonBase
		sx={{ color: 'primary.main' }}
		className={getClasses(props.classes)}
		onClick={props.handleClick}
	>
		{props.text}
	</ButtonBase>
);
