import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../common/Button/Button';
import { dateGenerator } from '../../helpers/dateGeneratop';
import { pipeDuration } from '../../helpers/pipeDuration';
import './CourseInfo.css';

export const CourseInfo = (props) => {
	const [course, setCourse] = useState();
	const navigate = useNavigate();

	const { id } = useParams();
	useEffect(() => {
		const c = props.courseList.find((item) => item.id === id);
		if (c) {
			setCourse(c);
		} else {
			navigate('/courses');
		}
	}, [course]);

	const getAuthorName = (authorId) => {
		const found = props.authorList
			? props.authorList.find((i) => i.id === authorId)
			: [];
		return found ? found.name : '';
	};

	return (
		<div>
			<Button
				text='< Back to courses'
				handleClick={() => navigate('/courses')}
				classes={['LinkButton', 'backButton']}
			/>
			<Card variant='outlined' sx={{ margin: 5 }}>
				<CardContent>
					<Grid container spacing={1}>
						<Grid
							item
							md={12}
							sx={{
								marginTop: 8,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Typography variant='h4'> {course && course.title}</Typography>
						</Grid>
						<Grid item container md={8}>
							<Grid item>
								<Typography paragraph>
									{course && course.description}
								</Typography>
							</Grid>
						</Grid>
						<Grid item container md={4}>
							<Grid item md={12}>
								<strong>ID: </strong>
								{course && course.id}
							</Grid>
							<Grid item md={12}>
								<span>
									<strong>Duration: </strong>
								</span>{' '}
								{course && pipeDuration(course.duration)} hours
							</Grid>
							<Grid item md={12}>
								<span>
									<strong>Created: </strong>
								</span>
								{dateGenerator(course && course.creationDate)}
							</Grid>
							<Grid item md={12}>
								<strong>Autors: </strong>
							</Grid>
							{course &&
								course.authors.map((authorId) => (
									<Grid key={authorId} item md={12}>
										{getAuthorName(authorId)}
									</Grid>
								))}
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</div>
	);
};
