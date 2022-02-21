import { Grid } from '@mui/material';
import './App.css';
import { CourseCard } from './components/Courses/components/CourseCard/CourseCard';
import { SearchBar } from './components/Courses/components/SearchBar/SearchBar';
import { Header } from './components/Header/Header';
import { Button } from './common/Button/Button';
import { mockedAuthorsList, mockedCourseList } from './constants';
import { useState } from 'react';
import { CreateCourse } from './components/CreateCourse/CreateCourse';

function App() {
	const getAllCards = () =>
		courseList.map((element) => (
			<div key={element.id}>
				<CourseCard
					title={element.title}
					description={element.description}
					autors={element.authors}
					duration={element.duration}
					creationDate={element.creationDate}
					authorList={authorList}
				/>
			</div>
		));

	const [searchText, setSearchText] = useState('');
	const [courseList, setCourseList] = useState(mockedCourseList);
	const [authorList, setAuthorList] = useState(mockedAuthorsList);
	const [cardItems, setCardItems] = useState(getAllCards());

	const [isCreateMode, setIsCreateMode] = useState(false);

	const handleSearch = () => {
		setCardItems(
			courseList
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
							authorList={authorList}
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

	const changeToCreateMode = () => setIsCreateMode(!isCreateMode);

	const addAuthor = (author) => {
		setAuthorList([...authorList, author]);
	};

	const addCourse = (course) => {
		setCourseList([...courseList, course]);
		changeToCreateMode();
		setCardItems(getAllCards());
	};

	return (
		<div className='App'>
			{isCreateMode ? (
				<CreateCourse
					return={addCourse}
					addAuthor={addAuthor}
					authorList={authorList}
				/>
			) : (
				<Grid container spacing={2}>
					<Grid item md={12}>
						<Header />
					</Grid>
					<Grid container item md={12}>
						<Grid item md={6}>
							<SearchBar handleOnChange={handleOnChange} />
						</Grid>
						<Grid item md={3}>
							<Button text='Search' handleClick={handleSearch} />
						</Grid>
						<Grid item md={3}>
							<Button text='Add new course' handleClick={changeToCreateMode} />
						</Grid>
					</Grid>
					<Grid item>
						{cardItems.length > 0
							? courseList
									.filter(
										(i) =>
											i.title
												.toLocaleLowerCase()
												.includes(searchText.toLocaleLowerCase()) ||
											i.id
												.toLocaleLowerCase()
												.includes(searchText.toLocaleLowerCase())
									)
									.map((element) => (
										<div key={element.id}>
											<CourseCard
												title={element.title}
												description={element.description}
												autors={element.authors}
												duration={element.duration}
												creationDate={element.creationDate}
												authorList={authorList}
											/>
										</div>
									))
							: 'No Results Found'}
					</Grid>
				</Grid>
			)}
		</div>
	);
}

export default App;
