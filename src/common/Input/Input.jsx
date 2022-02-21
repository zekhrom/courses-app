import { TextField } from '@mui/material';

export const Input = (props) => (
	<TextField
		fullWidth
		placeholder={props.placeholder}
		variant='outlined'
		onChange={props.handleOnChange}
		label={props.label}
		multiline={props.multiline}
	></TextField>
);
