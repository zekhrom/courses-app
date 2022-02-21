import { Input } from '../../../../common/Input/Input';
import './SearchBar.css';

export const SearchBar = (props) => (
	<Input
		placeholder='Enter course name...'
		handleOnChange={props.handleOnChange}
		fullWidth={true}
	/>
);
