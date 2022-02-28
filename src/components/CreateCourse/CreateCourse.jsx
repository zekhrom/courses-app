import { Card, CardContent, Grid } from '@mui/material';
import { useState } from 'react';
import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { pipeDuration } from '../../helpers/pipeDuration';
import { v4 as uuidv4 } from 'uuid';
import './CreateCourse.css';
import { useNavigate } from 'react-router-dom';

export const CreateCourse = (props) => {
	const [authorField, setAuthorField] = useState('');
	const [newCourse, setNewCourse] = useState({});
	const navigate = useNavigate();

	const getDuration = () => {
		return newCourse.duration ? newCourse.duration : 0;
	};
	const getAuthorName = () => {
		if (!newCourse.authors) {
			return '';
		}

		const found = props.authorList
			? props.authorList.filter((i) => newCourse.authors.includes(i.id))
			: [];
		return found ? found.map((i) => i.name).join(', ') : '';
	};

	const CreateCourse = () => {
		if (!newCourse.title) {
			alert('You must enter a title');
			return;
		}
		if (!newCourse.description) {
			alert('You must enter a description');
			return;
		}
		if (!newCourse.duration) {
			alert('You must enter a duration');
			return;
		}
		if (!newCourse.authors) {
			alert('You must enter at least one author');
			return;
		}
		const tempCourse = {
			...newCourse,
			id: uuidv4(),
			creationDate: new Date().toLocaleString().split(',')[0],
		};
		props.return(tempCourse);

		navigate('/courses');
	};

	const onDurationChange = (e) =>
		setNewCourse({ ...newCourse, duration: e.target.value });

	const onTitleChange = (e) =>
		setNewCourse({ ...newCourse, title: e.target.value });

	const onDescriptionChange = (e) =>
		setNewCourse({ ...newCourse, description: e.target.value });

	const createAuthor = () => {
		if (!authorField) {
			return;
		}
		const newAuthor = { name: authorField, id: uuidv4() };
		props.addAuthor(newAuthor);
	};

	const addAuthor = (selected) => {
		const currentAuthors = new Set(newCourse.authors);
		currentAuthors.add(selected);
		setNewCourse({ ...newCourse, authors: [...currentAuthors] });
	};

	const onAuthorFieldChange = (e) => setAuthorField(e.target.value);

	return (
		<Grid container spacing={2} className='create-course'>
			<Grid item md={9}>
				<Input
					label='Title'
					placeholder='Enter title...'
					handleOnChange={onTitleChange}
				/>
			</Grid>
			<Grid item md={3}>
				<Button text='Create course' handleClick={CreateCourse} />
			</Grid>
			<Grid item md={12}>
				<Input
					label='Description'
					placeholder='Enter description'
					multiline={true}
					handleOnChange={onDescriptionChange}
				/>
			</Grid>
			<Card variant='outlined' sx={{ width: '100%' }}>
				<CardContent>
					<Grid container>
						<Grid container item md={6}>
							Add Author
							<Grid item md={12}>
								<Input
									label='Author name'
									placeholder='Enter author name...'
									handleOnChange={onAuthorFieldChange}
								/>
							</Grid>
							<Grid item md={12}>
								<Button text='Create author' handleClick={createAuthor} />
							</Grid>
							<Grid item md={12}>
								<Input
									label='Duration'
									placeholder='Enter duration in minutes...'
									handleOnChange={onDurationChange}
								/>
							</Grid>
							<Grid item md={12}>
								<span>Duration: {pipeDuration(getDuration())} hours</span>
							</Grid>
						</Grid>
						<Grid container item md={6} className='leftGrid'>
							{props.authorList.map((el) => (
								<Grid container item md={12} key={el.id}>
									<Grid item md={6}>
										{el.name}
									</Grid>
									<Grid item md={6}>
										<Button
											text='Add author'
											handleClick={() => addAuthor(el.id)}
										/>
									</Grid>
								</Grid>
							))}
							<Grid item md={12}>
								<strong>Course Authors:</strong> {getAuthorName()}
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	);
};
