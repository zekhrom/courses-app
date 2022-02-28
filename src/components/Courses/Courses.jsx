import { Grid } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../common/Button/Button';
import { mockedAuthorsList } from '../../constants';
import { CourseCard } from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';

export const Courses = (props) => {
	const getAllCards = () =>
		props.courseList.map((element) => (
			<div key={element.id}>
				<CourseCard
					title={element.title}
					description={element.description}
					autors={element.authors}
					duration={element.duration}
					creationDate={element.creationDate}
					authorList={props.authorList}
					id={element.id}
				/>
			</div>
		));

	const [searchText, setSearchText] = useState('');
	const [cardItems, setCardItems] = useState(getAllCards());
	const navigate = useNavigate();

	const handleSearch = () => {
		setCardItems(
			props.courseList
				.filter(
					(i) =>
						i.title
							.toLocaleLowerCase()
							.includes(searchText.toLocaleLowerCase()) ||
						i.id.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
				)
				.map((element) => (
					<div key={element.id}>
						<CourseCard
							title={element.title}
							description={element.description}
							autors={element.authors}
							duration={element.duration}
							creationDate={element.creationDate}
							authorList={props.authorList}
							id={element.id}
						/>
					</div>
				))
		);
	};

	const handleOnChange = (e) => {
		setSearchText(e.target.value);
		if (e.target.value.length === 0) {
			setCardItems(getAllCards());
		}
	};

	return (
		<div>
			<Grid container spacing={2}>
				<Grid container item md={12} style={{ margin: 30 }}>
					<Grid item md={6}>
						<SearchBar handleOnChange={handleOnChange} />
					</Grid>
					<Grid item md={3}>
						<Button text='Search' handleClick={handleSearch} />
					</Grid>
					<Grid item md={3}>
						<Button
							text='Add new course'
							handleClick={() => navigate('/courses/add')}
						/>
					</Grid>
				</Grid>
				<Grid item>
					{cardItems.length > 0 ? cardItems : 'No Results Found'}
				</Grid>
			</Grid>
		</div>
	);
};
